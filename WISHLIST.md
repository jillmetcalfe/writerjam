# writerjam Wishlist

Ideas for later. Nothing here is scheduled.

## Open sign-up with logins (e.g. to post the jam on Twitter)
**Estimate: about 1 day.**

**Goal:** strangers can join safely. No Notion accounts. Nobody can edit or post as
anyone else. People check in with a button on the site.

**Shape (discussed 2026-10-11):**
- **Login:** Clerk (email code or Google), dropped into `index.html`. The free tier
  covers thousands of users a month.
  - Cloudflare Access would need no code, but its free plan caps at 50 people.
  - Building magic links in the Worker means the most code to maintain.
- **Check-in:** a form on the site replaces the public Notion Form. The Worker gets a
  new POST route that checks the Clerk login and writes to Notion. That needs a Notion
  integration with insert and update access, not read-only.
- **Ownership:** each row stores the user's Clerk ID in a property the Worker never
  returns. Edits and deletes only work on your own rows. Handles are reserved by the
  first user who claims them.
- **Spam:** limit check-ins per user per day. Jill still moderates by deleting rows.
- **Unchanged:** the tracker stays public and shows handles only. The grid, leaderboard,
  feed and writer pages stay as they are.

**Decide first:** keep Notion as the store (fine for hundreds of rows), or move to
Cloudflare D1 if many strangers join. Also how late joiners are shown when the jam is
public.

## Remove `nofollow` from writing links
**Estimate: 5 minutes.** One line in `index.html`. See `DECISIONS.md`.
