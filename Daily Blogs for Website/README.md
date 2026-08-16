# Daily Blogs for Website — Jindal Hydro Projects

Working folder for the daily SEO blog programme, keyword tracking and competitive strategy.

## ⚠ Read the strategy document first

`JHP_SEO_Strategy.md` opens with a finding that affects everything else: **JHP has no owned website.** Both domains resolve to third-party marketplace microsites (IndiaMART and TradeIndia) that cannot host a blog. Blogs are being written and banked so they are ready to publish the day an owned site exists.

## What's here

```
Daily Blogs for Website/
├─ JHP_SEO_Strategy.md            ← competitor audit + ranking roadmap. Start here.
├─ JHP_SEO_Keyword_Tracker.xlsx   ← 261 keywords, 9 sheets
├─ README.md                      ← this file
├─ _templates/
│  └─ md_to_html.py               ← markdown → publish-ready HTML + SEO checks
└─ 2026-08-03/                    ← one folder per publishing day
   ├─ 01-rvsf-machinery-checklist.md / .html
   ├─ 02-metal-briquetting-machine-roi.md / .html
   └─ 03-types-of-scrap-baling-machines.md / .html
```

## The tracker — 9 sheets

Open **README** inside the workbook first.

| Sheet | What it holds |
|---|---|
| Keyword Master | 261 keywords, 14 categories, ~72,600 est. monthly searches. Intent, market, volume, difficulty, computed Priority Score. |
| Rank Tracker | 26 dated weekly columns. Enter Google position each Monday. |
| Traffic & Conversions | Weekly clicks, impressions, CTR, position, enquiries per landing page. |
| Competitor Audit | 13 competitors audited Aug 2026 — platform, blog depth, URL structure, strengths, weaknesses, threat level. |
| Content Gaps | 12 topic areas nobody in the Indian market owns, scored by opportunity. |
| Blog Pipeline | 65 posts scheduled — 2/day Mon–Sat, 1 deep dive Sunday. |
| Content Map | Blog-to-keyword mapping. Prevents cannibalisation. |
| Dashboard | Live metrics from every sheet. |

**Search volumes and difficulty scores are research estimates, not measured data.** Useful for relative prioritisation. Replace with Ahrefs, Semrush or Google Search Console figures once a tool is connected — the column order already matches a standard GSC export.

## Daily schedule

A scheduled task runs at **12:00 PM daily**:

1. Fresh keyword research first — checks for policy changes, seasonal angles, competitor moves
2. Then writes **2 blogs Mon–Sat**, or **1 deep dive on Sunday** (~2,500 words)
3. Builds HTML, runs SEO checks, updates the tracker

It only runs while the Claude desktop app is open. If the app is closed at noon, it runs on next launch.

## Publishing a blog

1. Copy everything between `<article>` and `</article>` into your CMS body.
2. Copy `<title>`, `<meta name="description">` and `<link rel="canonical">` into your CMS SEO fields.
3. Copy the three `<script type="application/ld+json">` blocks into the page head (BlogPosting with citations, BreadcrumbList, FAQPage).
4. Add a hero image; set the OG image at `/og/<slug>.jpg` (1200×630).
5. Update **Content Map**: paste the live URL, set Status to Published.

### Fix the internal links on first publish

Blog CTAs point at assumed paths — `/products/balers`, `/products/briquetting`, `/contact`, `/catalogue`. Swap these for real URLs once the site exists, then reuse the corrected paths.

## Regenerating HTML after editing

```bash
cd "Daily Blogs for Website"
python _templates/md_to_html.py 2026-08-03
```

Prints an SEO check per file — word count, FAQ count, sources count, meta lengths, keyword density — and warns on anything out of range. Requires `markdown` and `pyyaml`.

## Blog format standard

YAML front matter:

```yaml
title, slug, meta_title (≤60 chars), meta_description (120–160 chars),
primary_keyword, secondary_keywords[], category, funnel_stage,
author, publish_date, word_count,
sources:
  - title / publisher / url / accessed
```

Body: H1 → intro using the primary keyword in the first 100 words → 4+ H2 sections → mid-article soft CTA in a blockquote → closing CTA block → FAQ section as `**Question?**` + answer (auto-converted to FAQPage schema). Sources render as a cited list and as `citation` entries in the Article schema.

## Accuracy rules

- Machine specs come from `Jindal Hydro Projects Catalogue.pdf` in the parent folder. Verify, don't recall.
- Every external figure gets a real source in the front matter.
- Policy and regulatory details vary by state and change — always tell readers to confirm with the relevant authority.
- No invented prices, payback figures, customer names or case studies.
