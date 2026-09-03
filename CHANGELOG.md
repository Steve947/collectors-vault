# Changelog

All notable changes to Hoardr are recorded here. Versioning is `MAJOR.MINOR.PATCH`
with the release date; the same list drives the in-app **What's New** panel
(Profile → "What's new"). Newest first.

## [1.4.0] — 2026-09-03

> The AI features below are in **limited (owner-only) testing** — not yet enabled for all users, so no public in-app "What's New" was fired for this build.

### Added — AI (owner-only alpha; `aiAssist` Cloud Function, gated to AI_ALPHA_EMAILS)
- **AI Tidy Up** — a "✨ AI Tidy Up" button on an item's Full Notes rewrites rough notes into clean, factual text without inventing facts. Preview before it's applied; never auto-saves.
- **AI fill from photo (photo-first)** — "New Item" now offers "📷 Photo first": snap or choose a photo and AI picks the category and fills the fields it can read, leaving the rest blank to confirm. Also a "✨ AI fill from photo" button on the Photos tab. Pure vision (grounding off).
- **AI Smart Import — "import from anything"** — a launcher that reads Excel, CSV, Word (.docx), PDF, a photo of a list, or pasted text; AI detects the category and maps columns/lines to Hoardr's fields; you review an editable mapping + live preview, then it imports into an isolated "Imported: …" collection you can delete in one tap. Shows a progress spinner while analysing and won't lose the result to a stray click.
- **Backend:** `aiAssist` Firebase Cloud Function (Functions v2, Node 22, App Check + Auth enforced, per-user monthly quota + a global daily spend circuit-breaker, model `gemini-3.6-flash`). Costs are cents/month at alpha scale.

### Changed
- **Toolbar consolidated** — the seven bottom-row buttons are grouped into **Export ▾ · Import · Backup ▾ · Share** on desktop, and the mobile "More" menu is reorganised into labelled sections (Create / Export / Import / Backup / Account).
- **Import is now AI Smart Import** (reads any spreadsheet plus Word/PDF/image/paste). The old format-specific "Import Excel" (Hoardr/diecast layout only) was removed as redundant — full restores remain under **Backup → Load backup**.

### Investigated
- **Grounding (live web research) for photo identification** was benchmarked and shelved — it lowered accuracy on niche items that can't be uniquely identified from a single photo. The Interactions-API grounding plumbing works and is retained for the planned **AI value estimate** feature, where a completed item's known details give the research strong anchors.

## [1.3.1] — 2026-09-02

### Changed
- The global **Share** button (`shareCollection()`, in the ⋯/More menu and header) now opens the public-page
  share modal for the whole collection (`kind:'all'` → `buildAllSnapshot()`, grouped by collection + an
  "Other items" section for ungrouped) instead of a native `navigator.share` text summary. Same whitelist
  sanitiser, value/price toggles, and Update/Revoke as the rest of sharing.

## [1.3.0] — 2026-09-01

### Added
- **Single- and multi-item sharing.** Besides whole collections, you can now share one item (🔗 Share in
  the item view) or a hand-picked set (Select → pick items → 🔗 Share in the bulk toolbar). Builds a
  `type:'items'` snapshot; `share.html` renders it as a flat gallery. Same whitelist sanitiser and
  value/price toggles; `sourceItemIds` stored so the link's **Update** re-snapshots the current items.
  Shares are keyed by `subjectKey` (`col:<id>` or `items:<sortedIds>`) so each subject lists its own links.
  No security-rule change — item shares live in the same owner-scoped `shares/{id}` collection.

## [1.2.0] — 2026-09-01

### Added
- **Public collection share pages.** A 🔗 button on each collection publishes a sanitised,
  read-only snapshot to `shares/{id}`, viewable by anyone with the link at `share.html?id=...`
  — no login required. The page carries a "Start your own free collection" call-to-action (growth loop).
- **Per-share privacy toggles.** Estimated value and purchase price are OFF by default, each
  independently toggleable. Sensitive fields (seller, provenance, insurance, notes, history,
  certificate numbers, purchase source) are never written to the public snapshot — the sanitiser
  is a whitelist, so new item fields can't accidentally leak.
- **Full-image zoom.** Tap any photo — in the item detail view or on a public share page — to
  open a full-screen viewer with smooth pinch / scroll-wheel zoom, drag-to-pan, double-tap to reset,
  and swipe / arrow-key navigation between an item's photos. Shared one engine across `index.html`
  and `share.html`.
- **Link control.** Links never expire by default (optional 7/30/90-day expiry); owner can
  **Update** (re-snapshot) or **Revoke** (delete) any link anytime. Expiry + revoke enforced in
  Firestore security rules, not just the UI.

### Fixed
- App updates now appear on a normal reload — the service worker revalidates the page against
  the server instead of serving a stale cached copy (cache bumped to `hoardr-v3`). Previously a
  hard-refresh was needed to see a new deploy.

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
