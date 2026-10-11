# writerjam.xyz Notes

## What it is
A simple shared tracker for a **30-day writing challenge** run by Jill and a group of old
Half Day Build friends.

## Background
- Half Day Build was run by Louis Pereira (an online friend). Every couple of months he set up
  a temporary Discord with resources, and people signed up to build something over a weekend.
  It had a good community, and Jill is still in touch with friends from it.
- Louis stopped running it. Jill has his blessing to run something similar.
- Jill bought buildjam.xyz, makerjam.xyz and writerjam.xyz for that idea, back when the
  Twitter creator community was active.

## Domain
- **writerjam.xyz** at Porkbun. Auto-renew was turned off on 2026-10-10 and then turned
  back on when the challenge came up.
- **buildjam.xyz:** decision deferred. Keep it if the group wants a build jam after this
  challenge. Otherwise let it lapse at renewal.
- **makerjam.xyz:** auto-renew off, being dropped.

## How it works (live since 2026-10-11)
- **Challenge:** 12 Oct – 10 Nov 2026. Dates are in `index.html` (`START`, `DAYS`).
- **Check-in:** a public Notion Form (link shared only in the group chat):
  https://jillmetcalfe.notion.site/3f56227653ba8063b820d34e2ef2271f
  It writes to the "writerjam check-ins" database in Jill's personal workspace:
  https://app.notion.com/p/10d17d2f28db4063989ae1adb525a2b2
  - Fields: Your name (title), Date, Link, Note. Words was dropped on purpose.
  - A Notion automation fills Date with today **only when Date is empty**. Without
    that condition it overwrote catch-up dates (tested and fixed 2026-10-11).
- **Worker:** `worker/`, deployed as `writerjam-api` at https://writerjam-api.jillmetcalfe.workers.dev
  It reads Notion with the `NOTION_TOKEN` secret (the "writerjam" integration) and caches for 60s.
  Deploy with `cd worker && npx wrangler deploy`.
- **Page:** `index.html` on GitHub Pages (`jillmetcalfe/writerjam`), served at writerjam.xyz.
  HTTPS is enforced. DNS is at Porkbun: 4 GitHub A records plus a `www` CNAME.
- **Day 0:** 11 Oct is a warm-up day that counts toward scores, so the top score is 31/30 (`FIRST` in `index.html`).
- **Writer pages:** `#/w/<name>` in the same `index.html`. Click any name to get there.
- **Suggestions:** a second Notion form, embedded behind the "Make a suggestion" button. Submissions go to Jill's Notion and are never shown on the site. Tested 2026-10-11.
- **Moderation:** delete a row in Notion and it's gone from the site within about a minute.
- **Decisions:** `docs/decision-log.md`.

## Open
- Nothing. The intro and rules were drafted by Claude and approved by Jill on 2026-10-11.
