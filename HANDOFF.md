# Handoff: writerjam.xyz (2026-10-10)

Read `NOTES.md` first for the background and domain status.

## Where things stand
- Jill and a group of old Half Day Build friends want to do a 30-day writing challenge.
- writerjam.xyz will host a simple tracker for it. Nothing is built yet.
- A rough estimate given to Jill: **2–4 hours** to build a page where each person logs
  their daily words or a ✅.

## Open questions (ask Jill, one at a time)
1. **When does the challenge start?** This sets how fast the build needs to happen.
2. **How many people are in the group, and how techy are they?** This decides where the
   shared data lives (Google Sheet, a small database, a Notion database, or a claude.ai
   Artifact with a shared database) and whether people need to log in.
3. **What gets tracked?** Word count, a daily done/not done, or a link to the writing.
4. **Where does the group talk?** A tracker might not need its own chat if they already
   use Discord, WhatsApp or something else.
5. **Hosting:** GitHub Pages like jill.net (`~/Developer/jill-net`) is the obvious default,
   but it needs some backend for shared data. Repos belong in `~/Developer`, so ask whether
   the code should live here or in `~/Developer/writerjam`.

## Constraints
- Keep it small. It's a 30-day event, and the smallest thing that works is enough.
- **Copy:** writerjam isn't jillmetcalfe.com, so the strict "100% human-written" site rule
  doesn't apply automatically. Still ask Jill before writing any public-facing copy.

## Suggested skills
- `grilling`: work through the open questions quickly before building.
- `prd`: a short statement of what the tracker is and isn't.
- `prototype`: try out the tracker UI or data model before building it properly.
- `artifact-capabilities`: if a claude.ai Artifact with a shared database is chosen.
- `compound`: at the end of the session, to update NOTES.md.
