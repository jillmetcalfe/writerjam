# Handoff: writerjam (2026-10-11)

## Where things stand
**Live and running. Nothing is pending.** The 30-day writing challenge started on
11 Oct (warm-up day 0). Days 1–30 run 12 Oct – 10 Nov 2026. Jill has posted the launch
message in the group chat. Everything was tested end to end on 2026-10-11.

Read these instead of anything repeated here:
- `NOTES.md`: how the pieces fit together, with links to the form, database, Worker and site
- `DECISIONS.md`: why it's built this way, and what was rejected
- `CHANGELOG.md`: what happened, including the gotchas (key upload, date automation, HTTPS)

## What a next session is likely to be about
1. **Something broke during the challenge.** Check in this order:
   - `curl -s https://writerjam-api.jillmetcalfe.workers.dev/` should return JSON with
     `checkins`. If it returns `{"error":"Couldn't reach Notion"}`, run
     `cd worker && npx wrangler tail` while you hit the URL, and read the Notion status
     code. A 401 means a bad or expired key (fix: `wrangler secret put NOTION_TOKEN`).
     A 404 means the integration lost access to the database (••• → Connections).
   - Check-ins missing or on the wrong day: check the row's Date in Notion and the Date
     automation. It must only fire when Date is empty.
   - Field renamed in Notion: the name field is safe. Date, Link and Note are read by
     name in `worker/src/index.js`.
2. **A small feature request,** like the writer pages, the suggestion button or day 0
   earlier. Edit `index.html`, test locally (see below), push to `main`, and it's live in
   about a minute.
3. **After 10 Nov:** nothing has been decided about what happens to the site. Ask Jill
   whether to freeze it as a record, add a "final results" banner, or set up a second
   round (change `START`, `DAYS`, `FIRST` and clear the database). Also ask about
   `buildjam.xyz` (see `NOTES.md` → Domain).

## How to test page changes without touching live data
Copy `index.html` into a temp folder with `const API` changed to `/data.json`, add a
hand-made `data.json`, serve it with `python3 -m http.server`, and render with headless
Chrome (`--headless=new --virtual-time-budget=5000 --dump-dom` or `--screenshot`).
- Headless Chrome on macOS makes the window at least 500px wide. To check phone layout,
  measure `document.documentElement.scrollWidth` instead of trusting a 390px screenshot.
- The Worker caches for 60s per Cloudflare server, so live tests straight after a Notion
  edit can show old data. Wait for it with
  `until curl … | grep -q <value>; do sleep 5; done`.
- Notion's Date automation overwrites dates on rows created through the API too, so
  set the test rows' dates with a second update after creating them.

## Things not to do
- Don't put the Notion key anywhere in the repo or the chat.
- Don't re-suggest the rejected backends in `DECISIONS.md` without new information.
- Don't move this folder to `~/Developer/writerjam`. Memory is tied to the
  `Claude Code/Jill` folder. See the memory note `repos-belong-in-developer`.
- Don't use Claude in Chrome from a background job without reading the memory note
  `chrome-needs-foreground-session` first.

## Suggested skills
- `diagnose`: if the site, the Worker or the check-ins break.
- `prototype`: for trying a larger UI change (e.g. a final-results view) before building it.
- `explain-this`: Jill asked how the hash routing works. Use it for similar "how does
  this work" questions.
- `compound`: at the end of a session, to update NOTES, CHANGELOG and DECISIONS.
