# Daily Journal Publishing Skill

Use this file as the operating guide for adding and maintaining Basanta's daily journal on basantasaru.com.

## Purpose

The journal documents Basanta's daily life, lessons, habits, progress, and self-improvement journey from age 20 onward.

Each day should feel like part of one continuous series:

- Day 1
- Day 2
- Day 3
- and so on

The goal is not to make every day look perfect. The goal is to document the day clearly, protect private information, and show real progress over time.

## Journal files

Journal pages live inside:

```text
journal/
```

Daily entries use this naming pattern:

```text
journal/day-1.html
journal/day-2.html
journal/day-3.html
```

The journal archive is:

```text
journal/journal.html
```

Published entries are registered in:

```text
journal/entries.js
```

Shared journal styling is mainly handled by:

```text
journal/journal.css
design-system.css
```

## Thumbnail images

Every published journal day should have its own cover image.

Use JPG files with this naming convention:

```text
assets/journal/day-1.jpg
assets/journal/day-2.jpg
assets/journal/day-3.jpg
```

Recommended image ratio:

```text
16:9
```

Recommended size:

```text
1280 x 720 px
```

The image should be simple and journal-focused, not designed like a loud YouTube thumbnail.

Preferred visual direction:

- warm beige / cream background
- soft natural light
- minimal desk or journal scene
- large Day number
- short theme for that day
- consistent visual identity across all days
- no unnecessary clutter

Example themes:

```text
Day 1 — A New Beginning
Day 2 — Small Progress Still Counts
Day 3 — Keep Showing Up
```

## Privacy rules

Before publishing any journal entry, remove or generalize private information.

Do not publicly include:

- legal disputes or court details
- family conflicts with identifiable details
- private conversations
- names of people unless sharing them is clearly appropriate
- phone numbers
- addresses
- exact private locations
- bank details
- citizenship/passport information
- money borrowed by another person
- exact personal financial balances or withdrawals unless intentionally public
- signatures or identity-document images
- information that belongs primarily to another person's private life

When needed, rewrite sensitive parts as:

```text
An unexpected family situation changed my plans.
```

or:

```text
I witnessed a meaningful family moment, but I want to keep the details private.
```

Focus the public journal on Basanta's own experience, emotions, lessons, habits, and progress.

## Writing style

The journal should sound personal, simple, honest, and reflective.

Avoid making the writing sound like a corporate article.

Preferred structure:

1. What happened today
2. Important moments
3. Work or learning
4. Health / habits / routines
5. What went wrong
6. Small wins
7. Lesson of the day
8. Closing reflection

Keep paragraphs easy to read on mobile.

Use clear section headings.

Good tone:

```text
Today didn't go exactly as planned, but I still made progress.
```

Avoid exaggerated claims such as:

```text
Today completely transformed my entire life forever.
```

## Creating a new day

When adding a new journal day, follow this workflow.

### 1. Read the source journal

Use the user's handwritten text, transcription, or supplied notes as the source of truth.

Do not invent events.

Fix grammar and readability when preparing the public version, but preserve the real meaning of the day.

### 2. Remove private details

Apply the privacy rules above before writing the public page.

### 3. Create the daily HTML file

Use the previous day's page as the structural reference.

For example, when making Day 3:

```text
copy the structure of journal/day-2.html
create journal/day-3.html
```

Update:

- page title
- meta description
- Day number
- date
- hero heading
- summary
- timeline/story sections
- lessons
- small wins
- closing reflection
- YouTube video if available
- `data-day` on `.entry-navigation`

Do not remove the shared navbar, footer, journal JavaScript, entries JavaScript, or shared styles.

## YouTube video

If the user provides a YouTube link for that day, embed the video near the end of the journal page.

Convert a normal YouTube link such as:

```text
https://youtu.be/VIDEO_ID
```

into:

```text
https://www.youtube.com/embed/VIDEO_ID
```

Use a responsive 16:9 embed.

Suggested section heading:

```text
WATCH DAY THREE
The video version of this day.
```

If there is no video, do not add an empty video section.

## Updating entries.js

Every published journal day must be added to `journal/entries.js`.

Use this shape:

```js
{
  day: 3,
  date: "2026-09-13",
  title: "Keep showing up.",
  description: "A short description of what made this day meaningful.",
  file: "day-3.html",
  image: "../assets/journal/day-3.jpg",
  minutes: 6
}
```

Important rules:

- keep entries in chronological order
- do not add unpublished days
- use JPG image paths
- use the correct day number
- use the actual date
- keep descriptions short
- estimate read time reasonably

The archive automatically displays entries in reverse order so the newest day appears first.

## Journal archive cards

Each card should show:

- 16:9 thumbnail
- `Personal journal · Day X`
- title
- short description
- date
- estimated reading time
- Read article button

The thumbnail should link to the journal entry.

Do not return to the old blue number-only card design.

## Previous / next navigation

Each daily page should include:

```html
<nav class="entry-navigation" aria-label="Journal entries" data-day="X"></nav>
```

`entries.js` automatically creates:

- Previous Day
- All journal entries
- Next Day

Always set `data-day` to the correct day number.

## Design rules

Keep the current visual system consistent.

Do not redesign the entire journal for every new day.

Preserve:

- current typography
- current spacing system
- current card styling
- responsive behavior
- desktop/tablet/mobile support
- shared header and footer
- warm personal journal identity

New pages should feel like part of the same journal series.

## Mobile requirements

Always check that:

- headings do not overflow
- images remain 16:9
- cards fit the screen
- text has enough side padding
- navigation stacks correctly
- YouTube embeds remain responsive
- buttons are easy to tap

## Content quality checklist

Before publishing a day, verify:

- [ ] Correct day number
- [ ] Correct date
- [ ] No invented events
- [ ] Private details removed
- [ ] Grammar cleaned up
- [ ] Story still sounds personal
- [ ] Clear lesson or reflection
- [ ] JPG thumbnail path added
- [ ] YouTube video embedded if supplied
- [ ] Entry added to `entries.js`
- [ ] Previous/next navigation uses correct `data-day`
- [ ] Desktop layout works
- [ ] Mobile layout works

## Preferred journal philosophy

The journal should reinforce this idea:

> Better, not perfect. One day at a time.

The story should show real life, including tired days, mistakes, changed plans, small wins, learning, work, relationships, health, and personal growth.

Do not hide normal imperfections just to make the journal look impressive.

The value of the journal is that it is real.
