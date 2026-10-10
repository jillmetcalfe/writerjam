// writerjam check-ins API.
//
// The tracker page can't talk to Notion itself: Notion's API refuses browser
// requests, and the token would be visible to anyone. So the page asks this
// Worker, and the Worker asks Notion with a token it keeps as a secret.
//
// It only reads. Check-ins arrive through the Notion Form; nothing here writes.

const NOTION_VERSION = "2022-06-28";
const CACHE_SECONDS = 60;

// One copy per Worker instance. With a few dozen visitors an hour this keeps
// Notion to about one query a minute, well under its 3-requests-a-second limit.
let cached = null; // { at: ms, body: string }

export default {
	async fetch(request, env) {
		if (request.method === "OPTIONS") return new Response(null, { headers: cors() });
		if (request.method !== "GET") return new Response("GET only", { status: 405, headers: cors() });

		if (!cached || Date.now() - cached.at > CACHE_SECONDS * 1000) {
			try {
				const checkins = await readCheckins(env);
				cached = { at: Date.now(), body: JSON.stringify({ updated: new Date().toISOString(), checkins }) };
			} catch (err) {
				console.error(err);
				// Notion hiccup: serve the last good copy if we have one, so the page stays up.
				if (!cached) return json(JSON.stringify({ error: "Couldn't reach Notion" }), 502);
			}
		}
		return json(cached.body, 200);
	},
};

async function readCheckins(env) {
	const rows = [];
	let cursor;
	do {
		const res = await fetch(`https://api.notion.com/v1/databases/${env.NOTION_DATABASE_ID}/query`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${env.NOTION_TOKEN}`,
				"Notion-Version": NOTION_VERSION,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ page_size: 100, ...(cursor && { start_cursor: cursor }) }),
		});
		if (!res.ok) throw new Error(`Notion ${res.status}: ${await res.text()}`);
		const page = await res.json();
		rows.push(...page.results);
		cursor = page.has_more ? page.next_cursor : undefined;
	} while (cursor);

	// Hand the page only what it shows: no Notion IDs, no editor names.
	return rows
		.map((r) => {
			const p = r.properties;
			// Find the name by type, not label, so renaming the form question
			// ("Handle", "Your name", ...) doesn't break the page.
			const title = Object.values(p).find((v) => v.type === "title");
			return {
				handle: plain(title?.title),
				// Date is required on the form, but rows added by hand in Notion might
				// skip it. Fall back to the day it was submitted (UTC).
				date: (p.Date?.date?.start ?? r.created_time).slice(0, 10),
				link: p.Link?.url ?? null,
				note: plain(p.Note?.rich_text),
				at: r.created_time,
			};
		})
		.filter((c) => c.handle && c.date);
}

const plain = (richText) => (richText ?? []).map((t) => t.plain_text).join("").trim();

const cors = () => ({
	// The data is already public on writerjam.xyz, so any origin may read it.
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Methods": "GET, OPTIONS",
});

const json = (body, status) =>
	new Response(body, {
		status,
		headers: { ...cors(), "Content-Type": "application/json", "Cache-Control": `public, max-age=${CACHE_SECONDS}` },
	});
