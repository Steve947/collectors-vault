# Changelog

All notable changes to Hoardr are recorded here. Versioning is `MAJOR.MINOR.PATCH`
with the release date; the same list drives the in-app **What's New** panel
(Profile → "What's new"). Newest first.

## [1.2.0] — 2026-09-01

### Added
- **Public collection share pages.** A 🔗 button on each collection publishes a sanitised,
  read-only snapshot to `shares/{id}`, viewable by anyone with the link at `share.html?id=...`
  — no login required. The page carries a "Start your own free collection" call-to-action (growth loop).
- **Per-share privacy toggles.** Estimated value and purchase price are OFF by default, each
  independently toggleable. Sensitive fields (seller, provenance, insurance, notes, history,
  certificate numbers, purchase source) are never written to the public snapshot — the sanitiser
  is a whitelist, so new item fields can't accidentally leak.
- **Link control.** Links never expire by default (optional 7/30/90-day expiry); owner can
  **Update** (re-snapshot) or **Revoke** (delete) any link anytime. Expiry + revoke enforced in
  Firestore security rules, not just the UI.

### Notes
- Requires the Firestore rules to be deployed (`shares/{id}` public-read block) — deployed 1 Sep 2026.

## [1.1.0] — 2026-09-01

### Added
- **"Toby Jug" category** as a built-in, with its own 🏺 icon.
- **Persistent custom categories.** Categories you create are now saved to your
  profile and appear in every category dropdown — no more retyping them on each item.
  Any custom category already in use is absorbed automatically.
- **Per-category emojis.** Every category can carry its own icon, chosen from the
  shared icon picker or typed in. Icons show on cards, the detail view, filter chips
  and dropdowns.
- **Edit categories in place.** A ✏ pencil on each category filter chip opens an
  editor to rename a category, change its icon, or delete it — no need to create an
  item first. Built-in categories allow an icon change only (name fixed).
- **Choose where items go on delete.** Deleting a category now asks which category to
  move its items, groups and collections to, instead of forcing "Other".
- **What's New panel** and a date + version scheme shown in Profile.

### Notes
- Custom-category storage moved from plain names to `{name, emoji}` records; existing
  data migrates automatically on load.

<!-- Template for the next release:
## [1.2.0] — YYYY-MM-DD
### Added
### Changed
### Fixed
-->
