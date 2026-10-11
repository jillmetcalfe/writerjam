# writerjam Changelog

## 2026-10-11

### Launched
**writerjam.xyz is live, and the launch message is in the group chat.**
The challenge starts with a warm-up day 0 today. Days 1–30 run 12 Oct – 10 Nov.

### Day 0 warm-up
The grid has a "0" column, and day 0 counts toward scores (a perfect run is 31/30).

### Suggestion button
"💡 Make a suggestion" opens Jill's second Notion form, embedded on the page. The form
only loads when someone clicks the button. A test submission worked. Jill's embed code
had a self-closing `<iframe … />`, which was fixed to a proper closing tag.

### Writer pages
Clicking any name (grid, leaderboard or feed) opens `#/w/<name>`. It shows every check-in
in day order, with the date, the note and a "Read it →" button where there's a link.

### Word counts removed
Jill dropped the Words field from the form. It was removed from the stats, the rules text
and the Worker.

### Catch-up dates fixed (Notion automation)
Jill's automation set Date to today on every new row, which overwrote backdated entries.
A form entry dated 9 Oct was saved as 11 Oct. The automation now only fires when Date is
empty. Retested with 10 Oct, and the date was kept.

### Worker live, end-to-end test passed
- **Worker:** `writerjam-api` deployed at https://writerjam-api.jillmetcalfe.workers.dev.
- **Key:** the first `NOTION_TOKEN` upload stored the command text instead of the key
  (Notion answered 401: "Authorization header must use the format Bearer <token>").
  Re-uploading from the clipboard fixed it.
- **Test:** test rows confirmed that names merge, same-day check-ins count once, and
  out-of-range dates are ignored. The page renders correctly at desktop and phone widths.
  The test rows were deleted.

### DNS and HTTPS
Porkbun now has the 4 GitHub A records and the `www` CNAME. The parking records are gone,
and the domain had no MX or TXT records to keep. The DNS change was made from the Claude
sidebar in Chrome.
**The certificate didn't appear until the custom domain was re-saved** through the Pages
API. That made GitHub commit "Delete CNAME" and "Create CNAME" to `main`, so pull before
pushing after doing it. HTTPS is now enforced.

### Browser control from Claude Code timed out
Claude in Chrome connected but every tab-creating call timed out, in both Arc and Chrome.
The debug log showed calls going to the "last-picked" extension, almost certainly Arc,
which answered status checks but never ran a tool call. This wasn't fully resolved. Jill
did the DNS through the Chrome sidebar instead. See the memory note
`chrome-needs-foreground-session`.

## 2026-10-10

### Built
- **Planning:** a grilling session settled the product (see `DECISIONS.md`).
- **Repo:** `jillmetcalfe/writerjam` created and public, with Pages on.
- **Notion:** the database and form view were created in Jill's personal workspace.
- **Code:** the page and Worker were written.
- **Notes:** the idea-stage notes moved in from `Claude Code/Jill/writerjam`.
