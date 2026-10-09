# Mystique Tao — Design Brief, Edition 1

> **Correction note, added after this analysis was written.** This document was produced from the teaser poster alone. Later the owner confirmed facts that override some inferences below:
> - The practice was founded in Italy and is now based in **Dahab, Egypt**, serving an international audience.
> - Tezpha publishes on YouTube ([@MystiqueTao](https://www.youtube.com/@MystiqueTao)) with breathwork, somatic movement and sound-based practices. See `source-youtube.md`.
> - Nothing establishes that Tezpha built this website, and Tezpha's pronouns are not stated. Where the text guesses either, disregard it.
> - The site's voice follows the poster. Tezpha's photographs appear in a section lower on the page, not in the hero.


**Site type:** a single-page editorial manifesto scroll that unfolds the teaser poster in its own reading order, with one opt-in breath, six context rows that route to a conversation, two printable "door" pages for the institutional buyers, and a colophon that versions the text. Static HTML, CSS and vanilla JS. No build step. GitHub Pages.

**One line:** The poster, unfolded on the phone it was designed for, with the words at the centre, the enso drawn by reading, and every door ending in a message to Tezpha.

**Date:** 2026-10-09. **Sources:** `/tmp/claude-0/-home-user-tezfa/7be221ff-c4bc-5b4c-bf6a-f3b555ea418d/scratchpad/input/teaser.jpg` (1024x1536) and `teaser-transcript.md` in the same folder; the repo at `/home/user/tezfa`. "Observed" means it is on the poster or in the repo. "Inferred" means it is a reading of the evidence.

---

## 0. Decision record

| Concept | Brand judge | Business judge | Craft judge | Total |
|---|---|---|---|---|
| The Principles Remain (timeless editorial) | 29 | 30 | **31** | **90** |
| Six Doors (enquiry site) | 27 | **32** | 30 | 89 |
| Rings (living platform) | **31** | 29 | 29 | 89 |
| The Page as a Practice (one breath, one scroll) | 30 | 28 | 28 | 86 |

**Winner by total score: The Principles Remain.** Rings and Six Doors tie for second; the brand-alignment judge (tiebreaker) prefers Rings, so Rings is the first graft source, then Six Doors, then The Page as a Practice.

**Kept from the winner:** the poster's reading order as the page order; the words as the centre; canon/offer split; editions and a colophon; native `<details>` for everything that expands; exactly four motions, none on scroll-reveal; self-hosted subset fonts; zero third-party requests by default; link destinations printed as visible text; a print stylesheet that is the PDF; a dependency-free site (here: no build at all); the margin enso drawn by reading; URL policy, estate note, CC BY-ND on the canonical text; git tags per edition and Internet Archive submission.

**Grafted (two or three judges agreed):** the warm photographs restored in enso masks, including a masked hero image (brand and business judges rejected the type-only page); the opt-in enso breath with the bridge line "That was thirty seconds of the practice." (all three); "How a session moves" (brand, business); context deep links `#hotels` etc. with prefilled messages (all three); "You provide / Tezpha brings" per context (brand, craft); a "Just the facts." link that is a plain anchor, not a dialog (brand and business wanted instant facts; craft rejected duplicate DOM); two institutional door pages `/for/hotels-resorts/` and `/for/workplaces/`, not six (craft, business); "Questions." with FAQPage JSON-LD and the three procurement questions (all three); a "This season" block with a designed empty state and a hand-maintained `.ics` (craft, business); cookieless click counting as a founder-enabled option plus prefilled messages whose first sentence names the door, so enquiries are countable by reading the chat (brand, business, craft each in their own way); the verified contrast rule set (craft, brand); the three repo fixes (craft); redirect aliases `/for/hotels` and `/for/teams` for the next poster print run (craft, business); structured data as Organization + Person + Service + FAQPage, never LocalBusiness with a placeholder address (craft).

**Rejected (do not build):** Roman numerals, newspaper dateline, contents line, drop cap, pull quote; the invented 400-word essay shipped in the founder's name; duotoning any photograph; a photograph-free hero; the sticky bottom contact bar; tab rows and cross-fades for contexts; the auto-rotating quote carousel; page-dimming rest or breath states, or any breath that gates reading; time-of-day palette; parallax anywhere; scripted scrolls; any form backend in phase 1 (mailto plus visible address instead; the form markup is ready for an endpoint later); Playwright PDF export; Eleventy or any build; Google Fonts loaded from the CDN; `localStorage` persistence of the chosen context (hash wins, session only); the pillar-to-body-word hover link and any rule built on the inferred yang-word-in-orange reading; a newsletter field before a first letter exists; any visible scaffolding for Library, Training, Facilitators; a synthesised bowl presented as a bowl; LocalBusiness JSON-LD without an address; renaming the NATURE context to "Outdoors" (keep the poster's word; disambiguate in ids and aria only).

---

## 1. What Mystique Tao is

**Observed.** A facilitated embodied practice called Mystique Tao, "Created & Facilitated by Tezpha", described as "An immersive fusion of movement, breath, deep relaxation, meditation, sound, awareness and nature." It is built from seven elements, each with exactly three descriptors (Movement, Breath, Awareness, Deep Rest / Yoga Nidra, Sound, Nature, Experience), and offered in six settings, each with exactly three descriptors (Workplaces, Hotels & Resorts, Retreats, Nature, Private Groups, One-to-One). Its method is stated in five sentences on a parchment panel: "Mystique Tao meets you where you are. Each experience is shaped by the moment, the space and the people present. The environment changes. The principles remain." Its model of the person is seven words: "Body. Breath. Mind. Heart. Connection. Nature. Whole." Its ethos is three "&" pairs: "SERIOUSNESS & PLAYFULNESS. STILLNESS & MOVEMENT. EFFORT & RELEASE." Its invitation is "TASTE. EXPERIENCE. SEE." and its creed "ROOTED IN NATURE. GUIDED BY EXPERIENCE. OPEN TO LIFE." Contact is Instagram MystiqueTao, WhatsApp +39 3662969582 and mystic.tao.life@gmail.com. There is no date, price, place, booking link, URL, biography, credential or testimonial anywhere. Yoga Nidra is the only named technique. The only script is the signature. The only exclamation mark is none.

**Inferred.** One person sells one portable session arc (move, breathe, rest, integrate; the tagline is pillars 1, 2, 4 and 7, and the three photographs follow the same arc: backbend, people resting among bowls, bare feet on leaves) into other people's places; there is no studio among the six settings. The base is Italy (the +39 366 mobile) and the visible audience is international (all copy in English), which points to hotel guests, expats, retreat organisers and foreign or international companies in Italy, with Italian HR leads, hotel managers and group hosts as the paying side. Workplaces and Hotels & Resorts sit first and speak the buyer's language ("Productivity", "Culture", "Differentiation"); the founder wants institutional revenue first and keeps the individual as the heart ("meets you where you are"). The photographs read as generated or stock (studio-clean backbend on a featureless haze; no venue, no attendees' faces); they are atmosphere, not documentation. The poster is a capability brochure meant to be forwarded by chat, not an event flyer.

---

## 2. Reverse-engineering the founder

The poster is a specification, not an advert. Everything is counted: 7x3, 6x3, three pairs, seven one-word sentences, three contact lines, three verbs, three clauses. Only five full sentences exist. The brand is separated from the person (a byline, not a studio name), the verb is "Facilitated" (holding a room, not teaching a syllabus), and the one sentence at the centre is simultaneously a philosophy, a business model and a content strategy: the invariant (principles) is instantiated at runtime by three variables the founder names themselves ("the moment, the space and the people present"). Someone who writes a practice this way thinks like a systems designer, which the repo confirms (observed: the founder is a developer; `tokens.css` is already "the single source of truth"). They withhold every perishable fact (date, price, place) because they are positioning before selling, and because perishable facts would date a document they want to last. They claim knowledge only through direct experience ("TASTE. EXPERIENCE. SEE.", "GUIDED BY EXPERIENCE"; "experience" printed seven times) and borrows one word each from three traditions (Tao, the Zen enso, Yoga Nidra) while claiming no lineage, which keeps the umbrella wide enough to absorb new environments later.

**Ideas for the founder, in the order they pay back.**
1. Settle the name: "Mystique Tao" (poster, Instagram) or "Mystic Tao" (email). Register the domain and an address on it. The Gmail address is the weakest B2B signal on the poster.
2. Record one real bowl strike and one twelve-minute guided Yoga Nidra before any further design. The Nidra is the free "Taste", the first scalable product and the only technique the poster names.
3. Put a QR code on the next poster print: `/for/hotels` and `/for/teams` for the two institutional contexts, `/` for everyone else. The poster finally gets a URL without changing its design.
4. Shoot real session photographs to the poster's recipe (golden hour, backlit, warm, olive shadows) within ninety days: a portrait, a group resting with bowls in a hotel garden, an office room, feet on ground, hands on a bowl, one landscape at dusk. Drop them into the slots; the layout does not change.
5. Write the principles down once, as a short canonical text structured by the three pairs, and version it. It is the only thing that can outlive the facilitator.
6. Give hotels a printable `/breathe` room card (year 1): the breath enso and three lines, a QR back to the hotel page. Zero marginal cost, in front of every guest.
7. Treat "The environment changes. The principles remain." as the content model: canon (tagline, pillars, pairs, method, seven words, creed) edited rarely; offer (contexts, formats, prices, dates, voices, channels) edited freely.
8. Keep the Italian as a sibling, not a translation, and get a native copywriter's pass before Italian HR or hotel buyers read it.

---

## 3. Trajectory: 10, 20, 50 years

**Now to year 3.** A solo facilitator in Italy selling one hour into six channels. Early cash from one-to-one, private groups and occasional hotel sessions; the growth engine is hotel residencies (hotels plan summer in winter, so the site must read as a proposal in January) and co-hosted retreats; workplace wellness is the one shrinking sector, so it is sold as culture and offsite experience, through Italian welfare-aziendale rules where applicable. Success is enquiries by context.

**Ten years (inferred from the life cycles of comparable practitioners: Sara Auster, Breathpod, The Breath Guy, the Yoga Nidra Network, Ally Boothroyd, the Six Senses visiting-practitioner model).** A productised practice: a recorded library (Nidra, sound, breath), a hotel residency circuit, partner retreat venues, a first facilitator training. The 7x3 / 6x3 / 3-pair / 7-layer schema is already a syllabus. The site gains `/listen`, `/places`, `/training` as plain pages typeset in the same two faces; the byline block becomes a list.

**Twenty years.** The fork every syncretic practice reaches: a named method with a short canonical text and other facilitators (the Yoga Nidra Network / Wim Hof path, needing `/facilitators` and a licence on the text), or a place (an own venue, the Boothroyd path, needing `/places/ours`). Either way "Where it happens" gains rows (Online, In-room, Clinics, biometric breath feedback, AI soundscapes, synthetic nature are environments, not principles) while the pillars stay byte-identical. The counter-trend is the business case: as environments turn synthetic, "Body. Breath. Mind. Heart. Connection. Nature." is exactly what cannot be automated, so an in-person, in-nature practice rises in value.

**Fifty years.** What survives a founder is a text, a mark, a community and a place, plus a domain that keeps resolving. The page is built to still be readable then: plain HTML and JSON in a public repository, the mark as SVG, no framework, no CMS, no CDN fonts, no trackers, an edition number on every version, an estate note naming who owns the domain, the repository, the text and the signature. A Didone masthead over a humanist sans, ink, ivory and one ember, hairlines and a hand-drawn circle were right in 1926 and will be right in 2076.

---

## 4. The webpage

**Thesis.** The poster's only durable asset is its text and its type system; its photographs will be replaced. So the page puts the words at the centre, set exactly as the poster sets them, in the poster's order, with the photographs warm and small inside enso masks as on the poster's left column. It gives one taste (an opt-in breath) before any ask, because the poster's first verb is TASTE. It routes rather than sells, because the poster already chose the channels: WhatsApp for people, email for organisations. It converts by answering, calmly, the five things the poster withholds: what happens, who Tezpha is, where, how much, how to write. It lasts because the text is versioned, the HTML is plain, and nothing on it belongs to 2026.

**Device.** Mobile first, portrait first (observed: the poster is 2:3 and its channels are Instagram and WhatsApp). The first screen is the masthead and must carry name, mantra, sentence, one fact line, one image and two quiet links. Desktop (≥1100px) reproduces the poster's 32/68 split: a left rail of enso-masked photographs beside centred text.

---

## 5. Page map — `index.html`

Every section is a `<section>` with the given `id`, an `aria-labelledby` heading (or `aria-label` where noted), and a 16px side gutter on phones. Headings never skip a level. Draft copy is in the poster's voice; **[brackets]** are facts only Tezpha can supply and must never be invented or shipped bracketed.

### 5.0 `header` — Header (persistent, minimal)
- **Purpose.** Hold the mark and four single-word anchors. No menu, no button, no "Book now".
- **Copy.** Left: enso mark (SVG). Centre or right: `Practice · Where · Tezpha · Write` in tracked small caps (Nunito Sans 12px, 0.2em, ivory at 80%). Later: `EN | IT`.
- **Interaction.** Transparent over the masthead; after 24px of scroll becomes a 52px bar on `--ink` at 94% opacity with a 1px `--copper` hairline at 40%, no blur, no shadow (replaces the current backdrop-filter nav). Current section's word gets a 1px gold underline. Skip link ("Skip to facts" → `#practical`) is the first focusable element.
- **Visual.** The header enso is the reading-progress enso on phones (see §7.1); on desktop it sits in the left margin instead.

### 5.1 `masthead` — Masthead (frontispiece)
- **Purpose.** The poster's title block as the first phone screen; set the reading contract.
- **Copy (verbatim where quoted).**
  - Enso mark, ember-light.
  - `MYSTIQUE` (ivory, Playfair Display 400, uppercase, tracking 0.2em, `--size-mystique`).
  - `TAO` (ember, Playfair Display 500, tracking 0.04em, `--size-tao`, about 1.8x the cap height of MYSTIQUE).
  - Two 1px copper hairlines split by the double outline-triangle ornament (12px SVG).
  - `MOVE. BREATHE. REST. EXPERIENCE.` (`.mantra`: Nunito Sans 600, 12–13px, uppercase, tracking 0.32em, ivory).
  - `An immersive fusion of movement, breath, deep relaxation, meditation, sound, awareness and nature.` (paper-text, 17px, max 62ch, centred).
  - Fact line (small, muted ivory): `Facilitated sessions, in person. Based in [town, region], Italy. [In English and Italian.]`
  - Two text links, hairline-underlined, side by side: `Taste.` (ember, → `#taste`) and `Just the facts.` (gold, → `#practical`, plain anchor, **no smooth scroll**).
- **Interaction.** On first paint the enso draws itself once over 4s (one inhale) then holds. Nothing else moves. With JS off the enso is simply there.
- **Visual.** Ground `--ink` with the poster's forest bokeh (crop of the poster, x 400–1000, y 0–260, blurred 24px, darkened 40%, static, `background-size: cover`, ≤ 18 KB WebP) and a warm vignette. **PHOTO SLOT A** sits under the sentence on phones and in the left rail on desktop: the people-resting-among-bowls crop (`assets/img/photo-bowls.jpg`, the participant's view, inferred as the right first image) inside the brush enso mask at ≤ 320px wide. Alt: "People resting at dusk among singing bowls and a lantern." Caption (tiny, muted): "Atmosphere." until real session photographs exist.

### 5.2 `practice` — Seven elements. One practice.
- **Purpose.** The poster's 7-up pillar row as a table the eye can read on a phone: icon, name, triad; 6 + 1 because the seventh pillar's icon is the enso and its descriptors are outcomes (observed).
- **Copy.** Eyebrow `Practice.` H2 `Seven elements. One practice.` Seven rows, each a `<details>` whose `<summary>` is: line icon (24px, 1.5px stroke, per-pillar colour) · `MOVEMENT` (tracked caps, ivory) · `Strength. Mobility. Function.` (gold, full stops). Expansions, exactly three sentences, practice → mechanism → outcome:
  - Movement — `Movement to wake the body. Joints through their range, muscles asked to work. You leave stronger than you arrived.`
  - Breath — `Breath, paced and noticed. Slower out than in; the body follows. Energy back where it was spent.`
  - Awareness — `Attention, placed. On the breath, the ground, the room. Clarity is what is left when the noise settles.`
  - Deep Rest — `Yoga Nidra, guided. Forty minutes lying down, awake. You leave lighter.`
  - Sound — `Bowls, struck by hand. A vibration the body hears before the ears do. The room settles.`
  - Nature — `Outside, whenever the sky allows. Bare feet, open air, weather as it is. Something in you remembers.`
  - Experience — `Not a technique. What the six become when they are lived together. Embodied, integrated, changed.`
  - Beginner line under the table: `No experience needed. No flexibility. Come as you are.`
- **Interaction.** Native `<details>`; several may be open; content fades in 250ms; print opens all. Summary is the whole row, ≥ 48px tall.
- **Visual.** Rows separated by 1px copper hairlines at 60%; the seventh row under a double hairline. Icon colours exactly as the poster: Movement and Sound ember, Breath, Awareness and Experience gold, Deep Rest rest-blue, Nature sage. Desktop ≥ 1200px may show the seven as a 7-up grid with 1px tan dividers (`border-left`), the triad under each name, the expansion opening beneath the whole row; phones use the table.

### 5.3 `session` — A session.
- **Purpose.** Close the biggest gap for beginners and buyers at once: what actually happens, how long, how many.
- **Copy.** Eyebrow `A session.` One line in tracked caps: `Arrive. Move. Breathe. Rest. Listen. Return.` Then five lines: `Movement to wake the body.` `Breath to settle it.` `Deep rest to let it recover.` `Sound to hold the space.` `Nature, whenever the sky allows.` Fact triad in gold small caps: `Sixty to ninety minutes · [Four to twenty] people · No experience needed.` Closing: `Come as you are.`
- **Interaction.** None.
- **Visual.** Ink ground. **PHOTO SLOT B** on desktop left rail: the bare-feet-on-leaves crop in its enso mask. Alt: "Bare feet walking through green leaves, backlit by low sun."

### 5.4 `taste` — Taste. One breath.
- **Purpose.** The poster's first verb made felt, opt-in, before any ask. The second of the page's four motions.
- **Copy.** Eyebrow `Taste.` (ember). H2 `One breath.` Line: `In for four. Hold for two. Out for four. Nothing else to do.` Control: a text link `Begin.` Phase word under the enso: `Breathe in` / `Hold` / `Breathe out`. After three cycles the phase word becomes `Nothing to do here. Notice.` for one cycle, then the bridge line appears: `That was thirty seconds of the practice. A session is sixty to ninety minutes.` with two links: `Where it happens.` (→ `#where`) and `Write.` (→ `#write`). Control text becomes `Once more.`
- **Interaction.** `Begin.` runs three 10s cycles (4 in, 2 hold, 4 out, the existing `--mt-breath` logic in `site.js`): the enso scales 1 → 1.06 on the inhale, the halo brightens, the phase word crossfades at each boundary inside an `aria-live="polite"` region. Space pauses, Escape ends, focus returns to the control. **Nothing dims; the rest of the page keeps full reading contrast.** No sound in Edition 1 (the synthesised tone stays in the code behind `data-sound="off"` and is enabled only when a real bowl recording from Tezpha replaces it). Reduced motion: the enso is static, phases change as text, a ring of 1px gold dots marks progress.
- **Visual.** Ember enso at `min(72vw, 400px)` on ink with a faint `--candle` halo (radial gradient, opacity ≤ 0.2). The enso is the baked brush path (see §11.3), not the live filter.

### 5.5 `where` — The environment changes.
- **Purpose.** The poster's six-context brush panel as a listings column where every row is already the right door for its reader.
- **Copy.** Eyebrow `Where it happens.` H2 `The environment changes.` Lead: `One practice. Your space. Your people. Your moment.` Six rows in poster order, each a `<details id="…">` with summary = cream line icon · name in tracked caps · triad in gold. Expanded content = two lines in voice, a `You provide / Tezpha brings` pair as a two-item `<dl>`, one link. The link's destination is printed as visible text beside it.
  - `#workplaces` **WORKPLACES** — `Well-being. Productivity. Culture.` — `A pause in the day that changes the day. In your office, your offsite, your rooftop.` You provide: `A quiet room. Two square metres a person.` Tezpha brings: `Bowls, voice, mats on request.` Links: `Request a proposal` (mailto, see §10) · `For your team, on one page` (→ `/for/workplaces/`).
  - `#hotels` **HOTELS & RESORTS** — `Guest Experience. Wellness. Differentiation.` — `A practice your guests remember the place by. On the lawn, the terrace, in the olive grove.` You provide: `A quiet space, inside or out.` Tezpha brings: `Bowls, lantern, voice. Words and images for your guests.` Links: `Request a proposal` (mailto) · `For your guests, on one page` (→ `/for/hotels-resorts/`).
  - `#retreats` **RETREATS** — `Depth. Transformation. Connection.` — `One facilitator who can hold the whole arc. Movement, breath, deep rest and sound, in one pair of hands.` You provide: `The place, the people, the days.` Tezpha brings: `The arc, the bowls, the room held.` Link: `Co-create a programme` (WhatsApp).
  - `#nature` **NATURE** — `Outdoor. Elemental. Immersive.` — `Sessions that move with the sky. Forest floor, riverbank, a ridge at dawn.` `Rain moves us inside, or moves the date.` You provide: `Shoes you can take off.` Tezpha brings: `Bowls, a blanket each, the hour.` Link: `Write on WhatsApp`. (Keep the poster's word NATURE; the `id` and `aria-label="Nature, as a setting"` disambiguate it from the pillar.)
  - `#private-groups` **PRIVATE GROUPS** — `Community. Intention. Shared Experience.` — `Your people, your place, your occasion. A villa weekend, a birthday, a team of eight.` You provide: `A room or a garden. Four to twenty people.` Tezpha brings: `Bowls, mats on request, the arc.` Link: `Write on WhatsApp` (four-field prefill: date, place, how many, occasion).
  - `#one-to-one` **ONE-TO-ONE** — `Personal. Tailored. Transformational.` — `A conversation first. Then a practice shaped to you. In person[, or online].` You provide: `An hour.` Tezpha brings: `The rest.` Link: `Write to Tezpha` (WhatsApp).
  - Under the column: `Based in [town, region], Italy. Within [X] km by arrangement. Further, by invitation.` and `Prices depend on format, place and group. Ask.`
- **Interaction.** Native `<details>`, all openable, all open in print. A URL hash matching a row id opens that row, scrolls to it, and sets `data-context` on `<html>` so the prefilled messages in `#write` use that register (session only, never `localStorage`; the hash always wins). Without JS the anchor still scrolls to the row and the row's own link already carries its prefill.
- **Visual.** Full-bleed panel on `--ink-panel` with brush-torn top and bottom edges (one SVG mask, see §8.5). Rows divided by 1px tan hairlines at 35%. Icons cream, 1.5px stroke, from the existing symbols (`i-workplaces`, `i-hotels`, `i-retreats`, `i-mountains`, `i-groups`, `i-one`).

### 5.6 `ethos` — Ethos band (no heading)
- **Purpose.** The poster's one line of pure philosophy, where the poster puts it.
- **Copy.** `SERIOUSNESS & PLAYFULNESS.   STILLNESS & MOVEMENT.   EFFORT & RELEASE.` as a single `<p>` with `aria-label="Ethos"` on the section; SERIOUSNESS and EFFORT in ember, the rest ivory, exactly as printed. Ampersands kept. Beneath: a 1px gold hairline with the four-point star ornament.
- **Interaction.** None. This is the one place a designer will want a breathing animation and the one place to refuse it.
- **Visual.** Playfair Display 400 uppercase, tracking 0.12em, ≥ 24px, centred; three pairs on one line at desktop, one pair per line on phones. Space-7 above and below.

### 5.7 `principles` — Meets you where you are. (parchment)
- **Purpose.** The poster's single light panel: the kernel of the method and the model of the person; the canonical text's first home; stable URL fragment.
- **Copy.** Left column, verbatim, line-broken as on the poster: `Mystique Tao meets you where you are.` / `Each experience is shaped by the moment,` / `the space and the people present.` / `The environment changes.` / `The principles remain.` (Playfair Display 500, ~1.5rem, `--parchment-ink`). The H2 is visually the first sentence. A 1px tan vertical rule with the clover ornament. Right column: the bronze line-art lotus (existing `i-lotus`, 1.5px stroke) above `Body.` `Breath.` `Mind.` `Heart.` `Connection.` `Nature.` `Whole.` as an `<ol>` with one word per line, full stops kept, Nunito Sans 400, `--parchment-ink`. Below, small caps in `--parchment-ink` at 70%: `Edition 1 · 2026` and a text link `Print the principles.` (set in `--parchment-ink` with a bronze underline; never bronze text).
- **Interaction.** `Print the principles.` calls `window.print()` with a `body.print-principles` class that prints only this section as one parchment sheet (print CSS). No reveal animation; the list is simply there.
- **Visual.** Surface `--parchment` with the misty-mountain strip (`assets/img/atmos-mountains.jpg`) fading in along the bottom under a `--haze` gradient, brush-torn top edge. Ember never appears on this panel (2.04:1).

### 5.8 `tezpha` — Tezpha
- **Purpose.** Close the credibility gap in the poster's own structure, not as a CV.
- **Copy.** Eyebrow `Created & Facilitated by`. H2 is the signature: an SVG path traced from the poster's footer, `role="img"` `aria-label="Tezpha"`, stroked in ember. Three blocks headed by the creed's clauses, third person, fragments:
  - `Rooted in nature.` — `[Where the practice and the person come from. Two or three fragments. Example of register: Mountains first. Then rooms. Then rooms with no windows, and the way back out.]`
  - `Guided by experience.` — `[N] years across movement, breath and deep rest. Trained in [Yoga Nidra lineage], [breathwork], [movement], [sound]. Works in [English and Italian]. [Insured for group facilitation.]`
  - `Open to life.` — `For anyone with a body. No belief asked. No flexibility. Mystique Tao is a practice, not a treatment.`
- **Interaction.** The signature stroke-draws once over 1.5s when 50% in view (the third of the four motions). Static under reduced motion or without JS.
- **Visual.** **PHOTO SLOT C**: the backbend crop (`assets/img/photo-pose.jpg`) in an enso mask at ≤ 300px, warm, full colour (no duotone). Caption describes the image, not the person, until Tezpha confirms it shows them and the image is licensed: `A deep backbend at golden hour.` Alt: "A man in a deep backbend, one arm reaching upward, soft daylight." When a real portrait exists it replaces this file; the layout does not change.

### 5.9 `practical` — Practical. (with Questions.)
- **Purpose.** State logistics as calm facts; give the safety and inclusion note breath and deep-rest work need; answer procurement; the target of "Just the facts." and the skip link.
- **Copy.** H2 `Practical.` A definition list in two columns on desktop:
  - `Where.` `Based in [town, region], Italy. Within [X] km by arrangement. Further, by invitation.`
  - `Languages.` `[English. Italian.]`
  - `Length.` `Sixty to ninety minutes. Half days. Residencies.`
  - `How many.` `One to [twenty]. More for workplaces, on request.`
  - `How much.` `By format, place and group. Ask.`
  - `What Tezpha brings.` `Bowls, lantern, voice. Mats on request.`
  - `What the venue provides.` `A quiet room, or a quiet outdoor space.`
  - `Invoicing.` `[Invoiced with P.IVA. Liability insured for group facilitation.]`
  - `On one page.` `For your guests` (→ `/for/hotels-resorts/`) · `For your team` (→ `/for/workplaces/`).
  - Paragraph headed `Everyone is welcome.`: `No experience needed. Sit, lie down or move; every part has an option. Tell Tezpha before the session if you are pregnant, or have a heart, blood-pressure or respiratory condition, epilepsy or recent surgery; some breath practices are adapted or left out. You may opt out of any part, at any time.`
  - H3 `Questions.` Twelve `<details>`, answers ≤ 3 sentences: `Do I need experience? No. The practice meets you where you are.` · `Am I fit enough? Movement is scaled to the body in the room. Strength, mobility, function, at your level.` · `What do I wear? Clothes you can move and lie down in. A layer for rest.` · `What do I bring? A mat if you have one. Water. Nothing else.` · `What happens in a session? Arrive. Move. Breathe. Rest. Listen. Return.` · `Breath and health. Tell Tezpha before the session if you are pregnant, or have a heart, blood-pressure or respiratory condition, epilepsy or recent surgery. Some breath practices will be adapted or left out.` · `Outdoors and weather. Sessions in nature move with the sky. Rain moves us inside, or moves the date.` · `Language. [English and Italian.]` · `How many? From one to [twenty].` · `How much? It depends on format, place and group. Ask.` · `Invoicing. [Invoiced with P.IVA; proposals in writing within three days.]` · `Insurance. [Liability cover for group facilitation; details on request.]` · `What must the venue provide? A quiet room or outdoor space. Tezpha brings the bowls.`
  - Closing line: `Mystique Tao is a practice, not a treatment. It does not replace medical care.`
- **Interaction.** Native `<details>`; when `data-context` is `workplaces` or `hotels`, JS moves the three institutional questions to the top (reorders, never hides). FAQPage JSON-LD emitted from the same text.
- **Visual.** Ink ground; the mountain strip under a dark overlay as a faint band at the top of the section (as the poster's lower third). Hairlines between definition rows.

### 5.10 `season` — This season.
- **Purpose.** The one block that changes between visits, so a manifesto never looks dormant.
- **Copy.** H2 `This season.` Either an `<ol>` of entries — `<time datetime="2027-03-07">Saturday 7 March</time> · Morning in nature · [place] · [language] · [from EUR __ / on request] · Write on WhatsApp` — or, when there are none, exactly one sentence: `Open sessions are announced on Instagram.` with the handle linked. Digits are allowed here by exception (dates).
- **Interaction.** Hand-maintained. `Add to calendar` links to `/season.ics` (hand-maintained VCALENDAR). Each entry gets an `Event` JSON-LD object. Rule: never an empty frame.
- **Visual.** Plain list, 1px hairlines, dates in Playfair numerals.

### 5.11 `write` — Taste. Experience. See.
- **Purpose.** The poster's three-stage invitation as the conversion section: a conversation, not a checkout.
- **Copy.** H2 with `Taste.` in ember, `Experience.` in ivory, `See.` in sage (Playfair, ≥ 32px), the four-point star ornament beneath. Three hairline-divided columns:
  - **Taste.** `Write on WhatsApp. Say where you are, who you are with and what you need. Tezpha replies within [a day].` Context chooser: a `<fieldset>` of six radios (`For me · A private group · A retreat · In nature · Our hotel · Our team`) followed by the link `WhatsApp +39 366 2969582` (wa.me with the prefill for the chosen context, §10) and a one-line preview of the message that will be sent. A second small link: `Scrivi in italiano` (same prefill in Italian).
  - **Experience.** `For your team or your guests.` Link `Request a proposal` (mailto with subject and five-field body) and visible `mystic.tao.life@gmail.com`; `A proposal in writing within [three days].` Links to the two one-page pages.
  - **See.** `Instagram MystiqueTao` (→ instagram.com/MystiqueTao) and `The teaser. Share it.` (→ `assets/img/teaser-poster.jpg`). When three attributed voices exist, they appear here as static quotes (first name, role, place), never star ratings, never a carousel.
  - Contact block beneath, verbatim with the gold line icons: `MystiqueTao` · `+39 3662969582` · `mystic.tao.life@gmail.com`. Each is a link **and** visible text; the number and email have a `Copy` text control.
- **Interaction.** Choosing a context rewrites the WhatsApp `text=` and the mailto subject/body live and updates the preview; the two institutional choices swap the WhatsApp link for the proposal mailto. Session only. Without JS every link carries the default prefill and the six context rows carry their own.
- **Visual.** Ink ground, three columns at ≥ 900px, stacked on phones, no form fields other than the radios, no buttons: text links with hairline underlines.

### 5.12 `colophon` — Colophon (footer)
- **Purpose.** End as a book ends; carry the creed, the legal lines Italian law requires, and the edition.
- **Copy.** `— ROOTED IN NATURE. GUIDED BY EXPERIENCE. OPEN TO LIFE. —` (tracked gold caps with the flanking dash ornaments). The double-ring enso stamp at left, closed. Line: `Mystique Tao · Created & Facilitated by Tezpha · [Town], Italy · P.IVA [11 digits] · Privacy · © 2026`. Colophon proper: `Edition 1 · October 2026. Set in Playfair Display and Nunito Sans. No cookies.` Then `Back to the beginning.` and, once it exists, `Italiano`.
- **Interaction.** When the colophon enters the viewport the reading enso closes its stroke and the stamp fades in once over 400ms. `Back to the beginning.` is a plain anchor (smooth only when motion is allowed).
- **Visual.** `--ink-footer` band with a brush-torn top edge; a thumbnail of the whole poster captioned `The teaser` linking to the full file.

---

## 6. Secondary pages

All share `tokens.css`, `site.css`, `site.js`, the header and the colophon. Hand-written HTML; a `<!-- shared: header -->` comment marks the blocks that must be kept identical across files.

### `/for/hotels-resorts/index.html` — For your guests.
H1 `For your guests.` Eyebrow `Hotels & resorts. Guest experience. Wellness. Differentiation.` Lead `A practice your guests remember the place by.` Three formats as label + three descriptors: `Residency. Three to fourteen days. Sunrise movement, sunset sound & rest, private sessions.` · `Guest session. Seventy-five minutes. Scheduled or on request.` · `Signature evening. Sound & deep rest under the sky. Up to forty.` A sample week (six lines, Monday to Saturday). `You provide / Tezpha brings`. `Words and images for your guests, on request.` `Languages. [English. Italian.]` `Invoicing. [P.IVA; insured.]` `Prices by format and season. Ask.` (do not publish day-rate or revenue-share logic until Tezpha confirms it). The three institutional questions. `Request a proposal` (mailto, subject `Mystique Tao — proposal for Hotels & Resorts`) with the address visible; `or WhatsApp +39 366 2969582`. `Print this page.` → prints as one A4 parchment sheet with the enso, no header. **PHOTO SLOT D** (bowls crop) at the top in an enso mask.

### `/for/workplaces/index.html` — For your team.
H1 `For your team.` Eyebrow `Workplaces. Well-being. Productivity. Culture.` Lead `A pause in the day that changes the day.` Formats: `Reset. One hour. Movement, breath, deep rest. Up to twenty-five.` · `Offsite module. Half a day. Movement, breath, rest, sound, a walk.` · `Series. Six weeks, one hour a week. A culture, not an event.` `You provide / Tezpha brings`. One sentence on measurement: `How people feel before and after, one question each, reported to you.` `[Invoiced with P.IVA. Welfare aziendale: confirm eligibility with a commercialista before publishing this line.]` The three institutional questions. Proposal mailto (subject `Mystique Tao — proposal for Workplaces`), visible address, `Print this page.` No photo (the poster has none for an office); the breath enso, static, instead.

### `/for/hotels/index.html`, `/for/teams/index.html` — redirects
Static HTML with `<meta http-equiv="refresh" content="0; url=/for/hotels-resorts/">` (and `/for/workplaces/`), a canonical link, and a visible fallback link. For QR codes on the next poster print run.

### `/privacy/index.html` — Privacy (Italian first, then English)
Title `Privacy · Informativa`. Italian section first (mandatory), then English. Content: who processes (Mystique Tao, [name], P.IVA, address), what is processed (messages you send on WhatsApp, email or Instagram; nothing on the site itself), no cookies, no analytics unless the cookieless counter is enabled (then: what it counts, no cookies, no cross-site tracking, the provider), retention, rights under GDPR, contact. The founder has it checked before launch. Cookie notice: one sentence on this page, no banner, because the site sets no cookies.

### `/404.html`
`This path is not here.` `The principles remain.` One link: `Home.` Same header and colophon.

### `/season.ics`, `/sitemap.xml`, `/robots.txt`, `/.nojekyll`, `/CNAME` (once the domain is chosen), `/README.md`, `/LICENSE-TEXT.md`
See §11.

---

## 7. Signature interactions

### 7.1 Reading draws the enso
One thin ember enso (the traced brush path, 48–56px) sits in the left margin on desktop and in the header on phones, beside one text link, `Write.` (→ `#write`). Its stroke is bound to reading progress through `<main>`: a dot at the masthead, closing exactly as the colophon's creed enters the viewport, where it thickens by 1px and the gold double-ring stamp appears beside it. The poster's enso is a circle drawn in one breath; here it is drawn by one reading, so the seventh pillar, Experience (whose icon is the enso, observed), is literally the sum of what the reader has done.

Implementation: a `<svg>` with a `<mask>` holding a stroked circle (`pathLength="1"`, `stroke-dasharray: 1`, `stroke-dashoffset: calc(1 - var(--progress))`) over the filled brush shape. `site.js` sets `--progress` on `<html>` from `scrollY / (scrollHeight - innerHeight)`, throttled with `requestAnimationFrame`. Where `animation-timeline: scroll(root)` is supported it may be used behind `@supports`, but the JS path is the required one. With neither, `--progress` defaults to 1 (fully drawn). `aria-hidden="true"`. Under reduced motion: static, fully drawn.

### 7.2 One breath, then the bridge
The opt-in breath in `#taste` (§5.4): three cycles, phase words, no dimming, no sound, then `Nothing to do here. Notice.` for one cycle, then `That was thirty seconds of the practice. A session is sixty to ninety minutes.` with links to `#where` and `#write`. It is the poster's TASTE → EXPERIENCE step in the house cadence.

### 7.3 Doors that know who opened them
Any link into the page with `#workplaces`, `#hotels`, `#retreats`, `#nature`, `#private-groups` or `#one-to-one` opens that row expanded and sets the register for every prefilled message on the page. Each context's WhatsApp message opens with a different first sentence (§10), so the door a lead came through is readable in the chat with no tracker.

### 7.4 Drawn once
The masthead enso (4s on first paint) and the signature (1.5s on entry) each draw once and never again. With §7.1 and §7.2 these are the page's four motions. There is no fifth.

---

## 8. Visual system

### 8.1 Palette (pixel-sampled from the poster; keep flat, no gradients or foil)

| Token | Hex | Role | Contrast / rule |
|---|---|---|---|
| `--ink` | `#0b0f08` | Page ground (near-black olive; never `#000`) | — |
| `--ink-panel` | `#0e160a` | Brush panels: `#where`, ethos band | — |
| `--ink-footer` | `#0e0e0a` | Colophon band | — |
| `--ivory` | `#f6ead2` | Display caps, pillar and context names, mantra | 16.22:1 on ink |
| `--paper-text` | `#f3f3f3` | Body copy on dark (never a surface) | 17.43:1 |
| `--muted` | `#9d9688` | Secondary text on dark | 6.58:1 |
| `--ember` | `#f6722a` | TAO, enso strokes, SERIOUSNESS and EFFORT, `Taste.`, link ink. **Ink only, never a fill or button background. Never on parchment** | 6.78:1 on ink; 2.04:1 on parchment (fails) |
| `--ember-light` | `#f68a36` | Logo enso, focus ring, hover ink | — |
| `--rust` | `#a5410f` | Core of the photo enso masks | graphic only |
| `--brush-highlight` | `#dec6a2` | Dry-brush highlights on the masks | graphic only |
| `--copper` | `#c97a48` | Hairlines near the wordmark, row dividers at 60%, link underlines | 5.86:1 — large text, rules, glyphs only |
| `--gold` | `#f6d296` | Triads, eyebrows, ornaments, contact icons, the creed | 13.42:1 |
| `--bronze` | `#876937` | Lotus and rules on parchment; ornaments on dark | 3.65:1 on parchment — never text |
| `--tan` | `#b9a57d` | Vertical rule on parchment; grid dividers at 35% on dark | graphic only |
| `--parchment` | `#e9d8bb` | The single light surface | — |
| `--parchment-ink` | `#1a1a14` | Text on parchment | 12.49:1 |
| `--sage` | `#7a8f5c` | The word `See.` and the Nature pillar icon only | 5.44:1 — display size only |
| `--rest-blue` | `#7f9fb3` | The Deep Rest icon only | 6.92:1 — icon only |
| `--candle` | `#ffb955` | Breath halo, one glow; never text | — |
| `--haze` | `#ead2ae` | Image highlight target; mountain-mist gradient | — |

Rules encoded in `tokens.css` as comments and enforced by review: ember, copper, sage and bronze are never body text; ember never appears on parchment; one sage and one rest-blue element on the whole page; no new accent colours. Reconcile the current `tokens.css` (`#0d1410`, `#e8722c`, `#c9a45c`, `#7fa6c9`) to these values.

### 8.2 Typography (Google Fonts faces, self-hosted)
- **Display:** Playfair Display 400 and 500, uppercase only, for `MYSTIQUE` (tracking 0.2em), `TAO` (tracking 0.04em), H2s, the ethos band, `Taste. Experience. See.` and the method sentences on parchment. It is the closest Google face to the poster's high-contrast serif (hairline bracketed serifs, splayed M, long-tailed Q; observed). **Never below 24px on the dark ground.** Replaces Cormorant Garamond.
- **Text:** Nunito Sans 400 and 600 for eyebrows and labels (11–13px, uppercase, tracking 0.18–0.32em), triads, body (17px / 1.6, max 62ch), facts, questions. Matches the poster's Avenir-like two-storey a and single-storey g (observed). Replaces Jost. Weight never above 600.
- **Signature:** an SVG path traced from the poster's footer crop, used once. No script font is loaded (drop Cookie); if tracing is impossible, Allura from Google Fonts as a last resort.
- **Files:** `assets/fonts/playfair-display-400.woff2`, `-500.woff2`, `nunito-sans-400.woff2`, `-600.woff2`, latin + latin-ext subsets (Italian accented capitals), `font-display: swap`, `size-adjust` fallback metrics (`Georgia` for Playfair, `Arial` for Nunito) to avoid layout shift. Preload the two 400 weights. Budget ≤ 100 KB for all four.
- **Scale (fluid):** `--size-mystique: clamp(2.2rem, 1.2rem + 5vw, 5rem)`; `--size-tao: clamp(5rem, 2rem + 13vw, 12rem)`; `--size-h2: clamp(1.8rem, 1.3rem + 2vw, 3rem)`; body 17px; eyebrow `clamp(.68rem, .62rem + .3vw, .8rem)`.
- **House rules as classes:** `.mantra` (tracked caps, full stops), `.label` (Title Case), `.prose` (sentence case). `&` in display, `and` in prose. A full stop after every fragment. No exclamation marks. No digits in display text except dates in `#season` and the phone number.

### 8.3 Motion principles
- Exactly four motions: masthead enso draw (4s, once), reading enso (scroll-bound), opt-in breath (10s cycle, three times), signature draw (1.5s, once). Micro: `<details>` content and link underlines at 200–300ms with `cubic-bezier(.42,0,.2,1)`.
- No scroll-reveal (remove the `.reveal` pattern), no parallax, no hover scaling, no auto-advancing content, no autoplay sound or video, no scripted scrolling, no page dimming, no time-of-day shifts.
- `prefers-reduced-motion: reduce` sets `--mt-breath: 0s` and `--mt-reveal: 0ms`, renders every enso fully drawn and static, turns the breath into text phases with a dotted progress ring, and disables smooth scrolling. `prefers-contrast: more` raises hairlines to 100% opacity and underlines all links.

### 8.4 Imagery strategy
The only asset is the poster. Use it honestly; build the page to look right with the crops it has and to accept real photographs later without layout change.
- **Crops (already in `assets/img`):** `photo-pose.jpg` 300x470, `photo-bowls.jpg` 290x320, `photo-leaves.jpg` 240x530, `atmos-mountains.jpg` 1600x175, `enso-mark.png` 116x116, `teaser-poster.jpg` 1024x1536. Generate WebP (quality 78) at 1x and 2x of the display size with cwebp or ImageMagick once, by hand, and commit; serve via `<picture>` with JPEG fallback, explicit `width`/`height`, `loading="lazy"` below the fold.
- **Rules:** never show a crop wider than its native width or outside an enso brush mask with a warm vignette; the forest bokeh (poster x 400–1000, y 0–260) only blurred 24px as the masthead backdrop; the mountain strip only under a `--haze` gradient at the parchment's foot and as a faint band at the top of `#practical`.
- **Slots:** A masthead (bowls), B session (leaves, desktop rail), C Tezpha (backbend, captioned as an image, not a portrait), D hotels page (bowls). Captions say `Atmosphere.` until real session photographs exist; never caption a poster photo as a session.
- **Masks:** one brush enso mask as SVG (`assets/svg/enso-mask.svg`, the rust core `#a5410f` with `#dec6a2` dry-brush highlights, traced from the poster's left-column frames) applied with `mask-image` (with `-webkit-mask-image`), plus a radial warm vignette.
- **SVG art (redraw everything decorative):** the enso (five scales: masthead, reading enso, Experience icon, stamp, favicon), the double-ring stamp, the lotus, the double-triangle, four-point star and clover ornaments, the flanking dashes, the brush-edge mask for panels, the signature. Nothing decorative depends on a raster.
- **Open Graph:** a 1200x630 crop of the poster's title block (x 300–1024, y 40–560, scaled) as `assets/img/og.jpg`. The whole poster is linked once, in the colophon, as `The teaser`.
- **Grading recipe for future photographs (observed on the poster):** warm white balance, no cyan or blue, shadows lifted toward olive `#1e2a06`, highlights toward `#ead2ae`, skin in the `#72421e`–`#7e4e2a` range, leaves olive-gold. Subjects to shoot first: Tezpha portrait at golden hour; a group resting with bowls in a hotel garden; an office room session; feet on ground; hands on a bowl; one landscape at dusk.

### 8.5 Texture
Ink on paper: a tiled 2–3% noise texture at plain opacity (no `mix-blend-mode`), `pointer-events: none`; brush-torn top and bottom edges on `#where`, `#ethos`, `#principles` and the colophon via one SVG mask traced from the poster's contexts panel; a soft dark vignette at the corners; parchment grain on the one light panel; one `<hr>` component: 1px copper or gold line at 60% with a centred 10–14px glyph; 1px tan vertical dividers instead of borders. Forbidden: shadows, `border-radius` cards or pills, glass, gradients beyond the vignette and haze, foil, filled or emoji icons, white or grey surfaces, pastel wellness colours.

---

## 9. Voice and tone

Derived from the poster: five full sentences, every fragment closed with a full stop, triads everywhere, imperatives for invitations, nouns for outcomes, `&` for polarities, no hype.

1. **Fragment. Full stop.** The period is the breath. One- to three-word sentences by default.
2. **Threes.** Descriptors, benefits, headings in triads; never two, never four.
3. **Verbs invite, nouns deliver.** `Taste.` `Write.` `Begin.` for actions; `Recovery`, `Clarity` for outcomes; never `you will feel`.
4. **Both/and.** Hold polarities with `&`; never `not just yoga`, never `more than`.
5. **No hype.** No superlatives, no `!`, no scarcity, no numerals in display text, no emoji, no `Book now`.
6. **Secular, embodied.** Name a technique only when people search for it (Yoga Nidra). No chakras, no energy healing, no lineage claims. `Tao` means the way, not a doctrine.
7. **Nature is a participant, not a backdrop.**
8. **`You` sparingly:** the method panel, the practical block, the questions, the booking copy.
9. **`&` in display, `and` in prose.** `Mystique Tao` in running text; `MystiqueTao` only as the handle.
10. **`Experience` capitalised at most once per screen.** It already appears seven times on the poster.
11. **Third person for Tezpha**, fragments, the role noun is `facilitator`; the poster never says `I`.
12. **Italian is a sibling, not a translation.**

Do: `Deep rest. Yoga Nidra, guided. Forty minutes lying down. You leave lighter.` Don't: `Experience the ultimate relaxation journey that will transform your life!` Do: `Taste a session.` Don't: `Book your spot now, limited places!` Do: `Come as you are.` Don't: `Beginners welcome!!` Do: `Nature, whenever the sky allows.` Don't: `Stunning outdoor locations.`

Micro-copy: thank-you `Received. Tezpha will reply soon. Until then, breathe.`; error `Something did not land. Try again, or write on WhatsApp.`; 404 `This path is not here. The principles remain.`; copy control `Copied.`

---

## 10. Conversion path

**Arrival (inferred).** On a phone, from the Instagram bio link, a WhatsApp-forwarded poster or link, or a QR on the printed poster; later from search landing on the two door pages.

**Individuals** (wired-tired professional, seeker, visitor): masthead → `Taste.` → one breath → bridge line → `#where` or `#write` → WhatsApp with a prefilled message. The reading enso keeps `Write.` one tap away at all times without a sticky bar. Instagram is the low-commitment first action and is never buried.

**Organisations** (HR lead, hotel or resort manager): masthead → `Just the facts.` → `#practical` (formats, group size, languages, base, what Tezpha brings, invoicing, insurance) → the one-page door page → `Request a proposal` by mailto with a five-field body, address visible for a paper trail; or a forwarded `#hotels` / `#workplaces` link that lands already opened.

**Organisers** (retreat, private group): `#retreats` / `#private-groups` → WhatsApp with the four-field prefill.

**Channels, verbatim from the poster.** WhatsApp `https://wa.me/393662969582?text=…` · Instagram `https://instagram.com/MystiqueTao` · email `mailto:mystic.tao.life@gmail.com`. Recommend a domain address once the name is settled; keep the Gmail address until then.

**Prefilled WhatsApp messages** (URL-encode; the first sentence names the door so leads are countable by reading the chat):
- Default / `For me`: `Hello Tezpha, I would like to taste Mystique Tao. I am in [place], [alone / with a group of N].`
- `#one-to-one`: `Hello Tezpha, I would like a one-to-one session. I am in [place].`
- `#private-groups`: `Hello Tezpha, I would like a private session for [N] people in [place] on [date]. The occasion: [occasion].`
- `#retreats`: `Hello Tezpha, I am planning a retreat in [place] around [dates]. Could we co-create a programme?`
- `#nature`: `Hello Tezpha, I would like to join a session in nature. I am in [place].`
- `#hotels` (WhatsApp alternative): `Hello Tezpha, I would like to bring Mystique Tao to our guests at [property], [place].`
- `#workplaces` (WhatsApp alternative): `Hello Tezpha, I would like to bring Mystique Tao to our team. We are [N] people in [place].`
- Italian default: `Ciao Tezpha, vorrei assaporare Mystique Tao. Sono a [luogo], [da solo/a / con un gruppo di N].`

**Proposal mailto** (note `&` must be `%26` in the subject): `mailto:mystic.tao.life@gmail.com?subject=Mystique%20Tao%20%E2%80%94%20proposal%20for%20Hotels%20%26%20Resorts&body=Who%20you%20are%3A%0AWhere%3A%0AHow%20many%3A%0AWhen%3A%0AWhat%20you%20need%3A%0A` and the Workplaces equivalent. The same five fields exist as a `<form>` on the two door pages with `action` set to the mailto by default; if the founder later adds `data-endpoint="https://…"` to the form, `site.js` posts it with `fetch` and shows the thank-you line. No backend is required to launch.

**Measurement.** (1) Zero-infrastructure: the distinct first sentences above; Tezpha counts enquiries by door once a week. (2) Optional, founder-enabled: a cookieless counter (GoatCounter) loaded only when `<html data-count="…">` carries the account name; events `whatsapp_click`, `email_click`, `pdf_print`, `breath_complete`, `facts_open`, `door_open` with the context as a property. No cookies, no banner; the colophon's `No cookies.` stays true. Nothing else is ever added.

---

## 11. Tech

### 11.1 Stack
Static HTML, CSS and vanilla JS, no build, no npm, no framework, no CMS. GitHub Pages serves the repository root (the existing `pages.yml` workflow uploads `.`; keep it, and keep `.nojekyll`). Custom domain via `CNAME` once the name is settled, HTTPS enforced.

### 11.2 File tree
```
/index.html
/for/hotels-resorts/index.html
/for/workplaces/index.html
/for/hotels/index.html            (meta refresh → /for/hotels-resorts/)
/for/teams/index.html             (meta refresh → /for/workplaces/)
/privacy/index.html
/404.html
/season.ics
/sitemap.xml
/robots.txt
/.nojekyll
/CNAME                            (later)
/README.md                        (URL policy, estate note, edition ritual, QA checklist)
/LICENSE-TEXT.md                  (CC BY-ND 4.0 on the canonical text: tagline, pillars, pairs, method, seven words, creed)
/assets/tokens.css                (single source of truth: colour, type, rhythm, motion)
/assets/css/site.css              (layout, components; includes @media print)
/assets/js/site.js                (≤ 4 KB minified; progressive enhancement only)
/assets/fonts/*.woff2             (four subset files)
/assets/svg/enso.svg, enso-mask.svg, enso-double.svg, lotus.svg, signature.svg, ornaments.svg, brush-edge.svg
/assets/img/*.jpg|webp            (crops at 1x and 2x, og.jpg, teaser-poster.jpg)
/scripts/lint-copy.mjs            (optional, run by hand or by a check-only Action; not a build)
```
Keep the current inline `<symbol>` sprite in `index.html` (`enso-mark`, `enso-shape`, `i-movement` … `i-mail`, `i-lotus`, `i-ornament`); duplicate it verbatim at the top of each secondary page.

### 11.3 Three fixes to the existing repo (observed in `site.css` and `index.html`)
1. The grain layer uses `mix-blend-mode: screen` on a fixed full-viewport element: replace with a tiled noise texture at `opacity: .03`, no blend mode.
2. The enso symbol carries a live `feTurbulence`/`feDisplacementMap` filter and is animated with `transform: scale`: bake the brush edge into a static path once (export the filtered shape from Inkscape or trace the poster's enso at 2x), and implement the stroke-draw as a stroked-circle `<mask>` over the filled brush shape. The filter never animates.
3. Remove the pill buttons (`border-radius: 999px`), the `box-shadow`, the `backdrop-filter` glass nav and the `.reveal` scroll-reveal pattern; replace `.btn` with text links and hairlines.
Also: swap the Google Fonts `<link>` for self-hosted `@font-face`; reconcile `tokens.css` to §8.1 and §8.2; keep `--mt-breath: 10s`, `--mt-ease`, the reduced-motion override and the breath pacer logic in `site.js`; disable the synthesised bowl behind a flag.

### 11.4 `site.js` responsibilities (all optional; the page is complete without it)
Header compaction after 24px; reading-progress `--progress`; masthead and signature one-time draws (add a class on load / on intersection); the breath guide (existing logic, three cycles, the `Notice.` beat, the bridge line); hash → open `<details>` + `data-context`; context radios → rewrite `wa.me` text and mailto subject/body + preview; institutional question reordering; copy-to-clipboard; `Print the principles.` body class + `window.print()`; year; optional counter events; optional form `fetch` when `data-endpoint` is present.

### 11.5 Head
`<title>Mystique Tao — Move. Breathe. Rest. Experience.</title>`; meta description = the verbatim 98-character sentence; canonical; `hreflang` pairs once `/it/` exists; Open Graph and Twitter cards with `og.jpg`; JSON-LD: `Organization` (Mystique Tao; sameAs Instagram), `Person` (Tezpha; jobTitle Facilitator), one `Service` per context (`areaServed: IT` without an address), `FAQPage` from §5.9, `Event` per season entry. Never `LocalBusiness` with a placeholder address. Favicon: SVG enso; `manifest.webmanifest` with ink background.

### 11.6 Print stylesheet
White ground, black ink, ember enso, tan hairlines, grain off, header and reading enso hidden, all `<details>` open. `body.print-principles` prints only `#principles` as one A4 sheet. The two door pages print as one A4 sheet each (`@page { size: A4; margin: 18mm }`), which is the PDF: `Save as PDF` from the browser, committed by hand when formats change.

### 11.7 Rituals (in `README.md`)
- **URL policy:** canon URLs never carry dates (`/principles/`, `/method/`); season URLs always do (`/experiences/2027-05-10-slug/`).
- **Estate note:** who owns the domain, the repository, the canonical text and the signature; where the fonts and the poster source live.
- **Edition ritual:** when the canon changes, bump the edition line in the colophon and on the parchment, `git tag edition-N-YYYY-MM`, and submit the URL to the Internet Archive.
- **Content lint (`scripts/lint-copy.mjs`, run by hand or as a check-only GitHub Action):** every pillar and context has exactly three descriptors; no `!` anywhere; no digits in display strings except `#season` and the phone number; `&` in headings, `and` in prose; a trailing period on every list fragment.
- **QA checklist before each deploy:** all seven context prefills (six + Italian) open WhatsApp with the right text on iOS Safari and Android Chrome; both mailto links carry subject and body; `#hotels` and `#workplaces` deep links open their rows; reduced-motion renders the breath as text; keyboard reaches every control; the page renders with JS disabled; Lighthouse ≥ 95 on all four categories on a mid-range Android profile; the print view of `#principles` and both door pages fits one A4 sheet.

---

## 12. Accessibility and performance

**Accessibility (WCAG 2.2 AA).** Landmarks (`header`, `nav`, `main`, `footer`); one `<h1>` (the wordmark, with visually hidden text `Mystique Tao`); heading order never skipped; skip link first; every expandable is a native `<details>`; the context chooser is a `<fieldset>` of radios; focus ring 2px `--ember-light` with 4px offset; targets ≥ 44px; links carry their destination as text; alt text in the brand voice; the signature SVG has `role="img"` and an accessible name; decorative SVG is `aria-hidden`; the breath guide has a visible `End` control, Space and Escape, focus return, and an `aria-live="polite"` phase region that is active only during a run the user started; no autoplay; `lang="en"` on the page and `lang="it"` on Italian fragments; latin-ext subsets for accented capitals; contrast per §8.1 with colour never the sole carrier of meaning (the ember words in the ethos band are decorative emphasis); layout survives 200% zoom and a 320px viewport with a 16px gutter and no horizontal scroll; the health note and the disclaimer are plain text on the page.

**Performance budget.** First viewport ≤ 200 KB (HTML ~35 KB, CSS ~25 KB, JS ≤ 4 KB, fonts ≤ 100 KB, masthead image ≤ 45 KB WebP + bokeh ≤ 18 KB); whole page ≤ 500 KB; zero third-party requests unless the founder enables the counter (one 2 KB script); LCP < 1.8s on a throttled 4G mid-range Android; CLS 0 (explicit image dimensions, `size-adjust` fallbacks); inline critical CSS for the masthead; `content-visibility: auto` on sections below `#where`; animations on transform and opacity only; no filter animates; Lighthouse ≥ 95 on all four categories.

---

## 13. Languages

**Now (Edition 1):** English at `/`. Italian where law or the buyer requires it: the privacy page Italian-first; the P.IVA line in the colophon; `Scrivi in italiano` prefill in `#write`; `lang="it"` on those fragments.

**Year 1:** `/it/index.html` as a hand-written sibling of `/index.html` (same sections, same ids), `/it/per/hotel-resort/` and `/it/per/aziende/`, `hreflang` pairs, `EN | IT` in the header, the choice remembered in `localStorage` (a convenience only), no automatic redirect. Add a `<!-- parity -->` note at the top of both files listing the sections so drift is caught by eye.

**Never translated:** Mystique Tao, Tao, Yoga Nidra, the Instagram handle, the signature.

**Italian drafts (nouns where Italian prefers nouns; one native copywriter pass before launch):** tagline `MOVIMENTO. RESPIRO. RIPOSO. ESPERIENZA.`; sentence `Un'esperienza immersiva che fonde movimento, respiro, rilassamento profondo, meditazione, suono, consapevolezza e natura.`; pillars `Movimento · Respiro · Consapevolezza · Riposo profondo · Suono · Natura · Esperienza`; contexts `Aziende · Hotel & Resort · Ritiri · Natura · Gruppi privati · Individuale`; pairs `SERIETÀ & LEGGEREZZA. QUIETE & MOVIMENTO. SFORZO & ABBANDONO.`; method `Mystique Tao ti incontra dove sei. Ogni esperienza prende forma dal momento, dallo spazio e dalle persone presenti. L'ambiente cambia. I principi restano.`; seven words `Corpo. Respiro. Mente. Cuore. Connessione. Natura. Intero.`; invitation `ASSAPORA. VIVI. SCOPRI.`; byline `Ideato e condotto da Tezpha`; creed `RADICATI NELLA NATURA. GUIDATI DALL'ESPERIENZA. APERTI ALLA VITA.`; door pages `Per i tuoi ospiti.` / `Per il tuo team.`; prefill `Ciao Tezpha, vorrei assaporare Mystique Tao. Sono a [luogo], [da solo/a / con un gruppo di N].`

---

## 14. Roadmap

**Now (Edition 1, weeks 1–3).** `index.html` per §5; `/for/hotels-resorts/`, `/for/workplaces/`, the two redirects, `/privacy/`, `/404.html`; self-hosted fonts; the three repo fixes; `README.md` rituals; `LICENSE-TEXT.md`; `sitemap.xml`, `robots.txt`; `git tag edition-1-2026-10`; Internet Archive submission. Founder tasks that gate launch: settle the name, fill every bracket (base, radius, languages, group size, P.IVA, insurance, training), confirm the photo licence and whether the backbend is Tezpha. Founder tasks in the first quarter: record one real bowl and one twelve-minute Yoga Nidra; shoot real photographs to the recipe; collect three attributed voices.

**One year.** Real photographs in slots A–D; the `See.` quotes; `/listen/` with the free Nidra as the `Taste` asset and the real bowl behind the breath; `/breathe/` as a printable QR room card for hotels; `/it/` sibling with the two Italian door pages; the domain and a domain email; the counter enabled; a one-sentence occasional letter (Buttondown or plain mailto list) only once there is a first letter to send; the proposal form given an endpoint if desktop mailto failures are observed; first `#season` entries with `.ics` and `Event` data.

**Three years.** `/principles/` holds the founder-written canonical text (structured by the three pairs, closing on `Whole.`), Edition 2; `/places/` lists partner venues (hotels, agriturismi, retreat centres) as the residency circuit; `/experiences/` dated pages for retreats with deposits handled off-site; the two door pages grow case lines (`Sessions held at …`); a first facilitator-training cohort page under `/training/` only when a date exists.

**Ten years.** A productised practice: recorded library, residency circuit, partner retreats, facilitator training; `/facilitators/` with Tezpha as the first entry and the byline block as a list; `/method/edition-N/` with the licensed text; the same two faces, the same hairline grammar, no redesign.

**Twenty years.** The fork: a named method with licensed facilitators, or a place of its own (`/places/ours`). New environments (online, in-room, clinics, biometric breath feedback, AI soundscapes, synthetic nature) are new rows in `#where`; the pillars do not change. The counter-trend raises the value of the in-person, in-nature practice.

**Fifty years.** A text, a mark, a community and a place, and a domain that resolves. Everything in a public git repository as plain HTML, SVG and JSON; every edition tagged and archived; an estate note that names the owners; a voice with no trend language, so the last page on the domain can be the principles sheet with the enso drawn once and the word `Whole.` beneath it.

---

## 15. Open questions for Tezpha (each is a bracket in the copy)
1. Canonical name and domain: Mystique Tao or Mystic Tao?
2. Base town and region; travel radius; languages facilitated.
3. Training lineage (Yoga Nidra, breathwork, movement, sound), years, insurance, P.IVA.
4. Are the poster photographs licensed and is the backbend Tezpha?
5. Typical group size; price position per context; whether one-to-one is also online.
6. Is "Retreats" own-run, guest facilitation, or both?
7. Any fixed public dates now, or everything by arrangement?
8. Does the orange on SERIOUSNESS and EFFORT mean the yang pole (inferred) or rhythm? (Reproduced as printed either way; no rule built on it.)
9. Is there any written principle text beyond the poster?

