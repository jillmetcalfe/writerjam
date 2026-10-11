# writerjam Decisions

The decisions that hold now, newest first within each section. Rejected options are at
the bottom so nobody proposes them again without knowing why they lost.

## Architecture

### 2026-10-10: Notion → Cloudflare Worker → static page
A public Notion Form writes check-ins to a Notion database. The page asks a Cloudflare
Worker (`worker/`, `writerjam-api`) for the data. The Worker queries the Notion API with
the `NOTION_TOKEN` secret and caches the result for 60 seconds. Check-ins show within
about a minute.
**Why:** Notion's API can't be called from a browser (it blocks cross-site requests, and
the token would be exposed), so something server-side has to read it. A read proxy has
2 moving parts. The alternatives (below) needed 4–5 and redeployed the site on every
check-in. If the Worker fails, the page shows the last good copy from the viewer's browser.

### 2026-10-10: One static `index.html` on GitHub Pages
Plain HTML/JS, no build step, served at writerjam.xyz. DNS stays at Porkbun: 4 GitHub A
records plus a `www` CNAME, the same setup as jill.net. The repo is public, which Pages
on the free plan requires. Nothing private is stored in it.

### 2026-10-11: Writer pages are hash routes in the same file
`#/w/<name>` shows one writer's check-ins. There are no extra files, links can be shared,
and the back button works.
**Trade-off:** search engines see one page, not one per writer. That doesn't matter here.

### 2026-10-11: The Worker finds the name field by type, not label
It uses the database's title property, whatever it's called. Jill renamed "Handle" to
"Your name", and renaming it again won't break anything. Date, Link and Note are still
looked up **by name**: renaming them needs a Worker change and a redeploy.

## Product

### 2026-10-11: Day 0 warm-up counts toward scores
11 Oct is day 0. Days 1–30 run 12 Oct – 10 Nov. A perfect run is 31/30. Set by `START`,
`DAYS` and `FIRST` in `index.html`. Check-ins dated outside day 0–30 are ignored.

### 2026-10-10: A check-in counts for the date the person picks
Each person's day ends at their own midnight, and catching up on a missed day is
allowed. Two check-ins on the same day count once.
**Notion side:** an automation fills Date with today **only when Date is empty**. Without
that condition, it overwrote every backdated entry (tested 2026-10-11).

### 2026-10-10: Open sign-up, names are free text
Anyone with the form link can check in under any name. The page treats names as the same
person after trimming spaces, ignoring capitals and dropping a leading `@`, so "@JillM "
and "jillm" are one writer. It shows the first spelling used.
**Trade-off:** someone could tick for someone else. It runs on trust.

### 2026-10-10: Leaderboard ranks by days written
Ties share a place (1, 1, 3). No streaks and no "streak broken" messages.

### 2026-10-11: No word counts
Jill removed the Words field from the form. It was gone from the page and the Worker
on the same day.

### 2026-10-10: Form link only in the group chat
It's not on the site, which keeps strangers and spam bots out without logins. Bad rows
are moderated by deleting them in Notion. The **suggestion** form *is* on the site
(embedded behind a button), because its answers are never displayed.

### 2026-10-11: Links keep `rel="nofollow"`
This protects against spam through the form. Removing it is one line (search
`index.html` for `nofollow`). The search benefit would be small anyway: links are drawn
by JavaScript and the domain is new. Revisit if Jill asks.

### 2026-10-10: One round only
There's no multi-round support. A second jam means changing the config lines and
clearing or replacing the database.

## Rejected

- **Google Form + Sheet backend** (2026-10-10). It was simplest, but Jill wanted Notion
  as the backend.
- **Scheduled GitHub Action syncing Notion to `data.json`** (2026-10-10). Scheduled runs
  are delayed by 10–30 minutes.
- **Notion webhook straight to GitHub `repository_dispatch`** (2026-10-10). GitHub
  rejects the request because Notion's webhook doesn't send the `event_type` field it
  requires. One failed webhook pauses the automation until someone turns it back on.
- **Copying the jillmetcalfe.com relay** (`ntn/website-publish`: automation → Notion
  Worker → GitHub job → redeploy, 2026-10-10). It works, but it's built for "publish
  now". Writerjam only needs to read fresh data.
- **Two related Notion databases (Writers + Check-ins)** (2026-10-11). The form would
  need a "pick your name" list, so writers would have to be added before they could
  check in (against open sign-up). It's unclear whether an anonymous public form can
  show such a list. Writer pages on the site already cover the need.
