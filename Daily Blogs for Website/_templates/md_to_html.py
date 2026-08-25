#!/usr/bin/env python3
"""
Convert JHP blog Markdown (with YAML front matter) into publish-ready HTML.

Usage:
    python md_to_html.py <folder-or-file> [...]

Produces <name>.html beside each <name>.md, containing:
  - <title>, meta description, canonical, robots
  - Open Graph + Twitter card tags
  - JSON-LD Article schema
  - JSON-LD FAQPage schema (auto-built from the "Frequently asked questions" section)
  - JSON-LD BreadcrumbList
  - Self-contained CSS so it renders standalone, and clean semantic markup so the
    <article> block can be pasted straight into a CMS.

Dependencies: markdown, pyyaml  (pip install markdown pyyaml)
"""
import sys, os, re, json, html, datetime

try:
    import yaml
except ImportError:
    sys.exit("pip install pyyaml")
try:
    import markdown
except ImportError:
    sys.exit("pip install markdown")

SITE = "https://www.jindalhydro.com"
BLOG_BASE = f"{SITE}/blog"
ORG = "Jindal Hydro Projects Inc."
LOGO = f"{SITE}/logo.png"
PHONE = "+91 74120 00949"
EMAIL = "amit@jindalhydro.com"

CSS = """
:root{--navy:#1f3a5f;--accent:#c8102e;--ink:#1a1a1a;--muted:#5a6672;--line:#e2e8f0;--bg:#fff;--soft:#f5f8fb}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--ink);font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif;font-size:17px;line-height:1.75;-webkit-font-smoothing:antialiased}
article{max-width:760px;margin:0 auto;padding:48px 24px 80px}
h1{font-size:2.15rem;line-height:1.22;color:var(--navy);margin:0 0 .5rem;letter-spacing:-.02em}
h2{font-size:1.5rem;line-height:1.3;color:var(--navy);margin:2.6rem 0 .9rem;letter-spacing:-.01em}
h3{font-size:1.16rem;color:var(--navy);margin:2rem 0 .6rem}
p{margin:0 0 1.15rem}
a{color:var(--accent);text-decoration:none;border-bottom:1px solid rgba(200,16,46,.3)}
a:hover{border-bottom-color:var(--accent)}
ul,ol{margin:0 0 1.3rem;padding-left:1.4rem}
li{margin-bottom:.5rem}
strong{font-weight:650}
hr{border:0;border-top:1px solid var(--line);margin:2.8rem 0}
blockquote{margin:2rem 0;padding:20px 24px;background:var(--soft);border-left:4px solid var(--accent);border-radius:0 6px 6px 0}
blockquote p{margin:0;font-size:1rem}
table{width:100%;border-collapse:collapse;margin:1.6rem 0;font-size:.94rem}
th{background:var(--navy);color:#fff;text-align:left;padding:11px 13px;font-weight:600}
td{padding:11px 13px;border-bottom:1px solid var(--line);vertical-align:top}
tr:nth-child(even) td{background:#fafbfc}
.byline{color:var(--muted);font-size:.88rem;margin:0 0 2.2rem;padding-bottom:1.4rem;border-bottom:1px solid var(--line)}
.byline span{margin-right:14px}
.cta{background:var(--navy);color:#fff;border-radius:10px;padding:30px 32px;margin:2.6rem 0}
.cta h2{color:#fff;margin-top:0}
.cta p{color:#dbe4ee}
.cta a{color:#fff;border-bottom-color:rgba(255,255,255,.45)}
.btn{display:inline-block;background:var(--accent);color:#fff!important;padding:13px 26px;border-radius:6px;font-weight:600;border:0!important;margin:8px 10px 0 0}
.btn:hover{background:#a50d26}
.faq h3{font-size:1.03rem;margin-top:1.7rem}
.sources{margin-top:3rem;padding-top:1.6rem;border-top:1px solid var(--line);font-size:.9rem;color:var(--muted)}
.sources h2{font-size:1.05rem;margin-bottom:.7rem}
.sources ol{padding-left:1.2rem}
.sources li{margin-bottom:.45rem}
@media(max-width:640px){body{font-size:16px}article{padding:32px 18px 56px}h1{font-size:1.7rem}h2{font-size:1.3rem}table{font-size:.86rem}}
"""


def split_front_matter(text):
    m = re.match(r"^---\s*\n(.*?)\n---\s*\n(.*)$", text, re.S)
    if not m:
        raise ValueError("no YAML front matter found")
    return yaml.safe_load(m.group(1)), m.group(2).strip()


def extract_faqs(body_md):
    """Pull Q/A pairs out of the trailing 'Frequently asked questions' section."""
    m = re.search(r"##\s*Frequently asked questions\s*\n(.*)$", body_md, re.S | re.I)
    if not m:
        return []
    block = m.group(1)
    faqs = []
    # Pattern: **Question?**\n Answer paragraph(s) until next ** or end
    for qm in re.finditer(r"\*\*(.+?)\*\*\s*\n(.+?)(?=\n\*\*|\Z)", block, re.S):
        q = qm.group(1).strip()
        a = re.sub(r"\s+", " ", qm.group(2)).strip()
        a = re.sub(r"\*\*(.+?)\*\*", r"\1", a)
        a = re.sub(r"\[(.+?)\]\(.+?\)", r"\1", a)
        if q and a:
            faqs.append((q, a))
    return faqs


def wrap_ctas(html_body):
    """Wrap the closing CTA block (after the final <hr>) in a styled container."""
    # The last two <hr> split: body | CTA | FAQ
    parts = html_body.split("<hr />")
    if len(parts) >= 3:
        cta = parts[-2]
        faq = parts[-1]
        head = "<hr />".join(parts[:-2])
        cta = cta.replace(
            '<a href="https://www.jindalhydro.com/contact">',
            '<a class="btn" href="https://www.jindalhydro.com/contact">')
        cta = cta.replace(
            '<a href="/JHP-Catalogue.pdf">',
            '<a class="btn" href="/JHP-Catalogue.pdf">')
        return f'{head}<div class="cta">{cta}</div><div class="faq"><hr />{faq}</div>'
    return html_body


def build(md_path):
    raw = open(md_path, encoding="utf-8").read()
    fm, body = split_front_matter(raw)

    faqs = extract_faqs(body)
    md = markdown.Markdown(extensions=["extra", "sane_lists", "toc"])
    body_html = md.convert(body)
    body_html = wrap_ctas(body_html)

    # ---- Sources block (from front matter `sources:` list) ----
    sources = fm.get("sources") or []
    if sources:
        items = []
        for s in sources:
            pub = html.escape(str(s.get("publisher", "")))
            ttl = html.escape(str(s.get("title", "")))
            url_s = str(s.get("url", ""))
            acc = str(s.get("accessed", ""))
            bits = f'<a href="{html.escape(url_s)}" rel="nofollow noopener" target="_blank">{ttl}</a>'
            if pub:
                bits += f" — {pub}"
            if acc:
                bits += f' <span style="opacity:.7">(accessed {acc})</span>'
            items.append(f"<li>{bits}</li>")
        body_html += (
            '<div class="sources"><h2>Sources</h2><ol>'
            + "".join(items)
            + "</ol><p><em>External figures are attributed to the sources above. "
              "Machine specifications are from the Jindal Hydro Projects product catalogue. "
              "Policy and regulatory details change — confirm current rules with the relevant "
              "authority before acting on them.</em></p></div>"
        )

    slug = fm["slug"]
    url = f"{BLOG_BASE}/{slug}"
    title = fm["title"]
    meta_title = fm.get("meta_title", title)
    desc = fm["meta_description"]
    pub = str(fm["publish_date"])
    kws = [fm["primary_keyword"]] + list(fm.get("secondary_keywords") or [])

    article_ld = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": title[:110],
        "description": desc,
        "keywords": ", ".join(kws),
        "articleSection": fm.get("category", ""),
        "wordCount": fm.get("word_count"),
        "inLanguage": "en-IN",
        "datePublished": pub,
        "dateModified": pub,
        "mainEntityOfPage": {"@type": "WebPage", "@id": url},
        "author": {"@type": "Organization", "name": ORG, "url": SITE},
        "publisher": {
            "@type": "Organization", "name": ORG, "url": SITE,
            "logo": {"@type": "ImageObject", "url": LOGO},
            "telephone": PHONE, "email": EMAIL,
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "B, 38A, MIA Road, Matsya Industrial Area, Naharpur",
                "addressLocality": "Alwar", "addressRegion": "Rajasthan",
                "postalCode": "301030", "addressCountry": "IN"},
        },
    }

    breadcrumb_ld = {
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Home", "item": SITE},
            {"@type": "ListItem", "position": 2, "name": "Blog", "item": BLOG_BASE},
            {"@type": "ListItem", "position": 3, "name": title, "item": url},
        ],
    }

    if sources:
        article_ld["citation"] = [
            {"@type": "CreativeWork", "name": s.get("title", ""),
             "url": s.get("url", ""), "publisher": {"@type": "Organization",
                                                    "name": s.get("publisher", "")}}
            for s in sources
        ]

    blocks = [article_ld, breadcrumb_ld]
    if faqs:
        blocks.append({
            "@context": "https://schema.org", "@type": "FAQPage",
            "mainEntity": [
                {"@type": "Question", "name": q,
                 "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in faqs],
        })

    ld = "\n".join(
        f'<script type="application/ld+json">\n{json.dumps(b, indent=2, ensure_ascii=False)}\n</script>'
        for b in blocks)

    doc = f"""<!DOCTYPE html>
<html lang="en-IN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{html.escape(meta_title)}</title>
<meta name="description" content="{html.escape(desc)}">
<meta name="keywords" content="{html.escape(', '.join(kws))}">
<meta name="author" content="{ORG}">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">
<link rel="canonical" href="{url}">

<meta property="og:type" content="article">
<meta property="og:site_name" content="{ORG}">
<meta property="og:locale" content="en_IN">
<meta property="og:title" content="{html.escape(meta_title)}">
<meta property="og:description" content="{html.escape(desc)}">
<meta property="og:url" content="{url}">
<meta property="og:image" content="{SITE}/og/{slug}.jpg">
<meta property="article:published_time" content="{pub}">
<meta property="article:section" content="{html.escape(str(fm.get('category', '')))}">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{html.escape(meta_title)}">
<meta name="twitter:description" content="{html.escape(desc)}">
<meta name="twitter:image" content="{SITE}/og/{slug}.jpg">

{ld}
<style>{CSS}</style>
</head>
<body>
<article>
<p class="byline"><span>{ORG}</span><span>{datetime.datetime.strptime(pub, '%Y-%m-%d').strftime('%d %B %Y')}</span><span>{fm.get('word_count','')} words</span></p>
{body_html}
</article>
</body>
</html>
"""
    out = os.path.splitext(md_path)[0] + ".html"
    open(out, "w", encoding="utf-8").write(doc)

    # ---- SEO self-check ----
    warn = []
    if len(meta_title) > 60:
        warn.append(f"meta_title {len(meta_title)} chars (>60)")
    if not 120 <= len(desc) <= 160:
        warn.append(f"meta_description {len(desc)} chars (want 120-160)")
    pk = fm["primary_keyword"].lower()
    if pk not in title.lower() and pk not in meta_title.lower():
        warn.append("primary keyword not in title")
    if pk not in desc.lower():
        warn.append("primary keyword not in meta description")
    if pk not in body.lower()[:1200]:
        warn.append("primary keyword not in opening section")
    words = len(re.findall(r"\w+", body))
    dens = body.lower().count(pk) / max(words, 1) * 100
    if dens > 2.5:
        warn.append(f"keyword density {dens:.2f}% (>2.5%, risks over-optimisation)")
    if "jindalhydro.com/contact" not in body:
        warn.append("no contact CTA link")
    if not sources:
        warn.append("no sources listed in front matter")
    if body.count("## ") < 4:
        warn.append("fewer than 4 H2 sections")
    if words < 1100:
        warn.append(f"only {words} words (thin for a ranking post)")

    print(f"{os.path.basename(out)}  |  {words} words  |  FAQs: {len(faqs)}  |  "
          f"sources: {len(sources)}  |  title {len(meta_title)}c  |  desc {len(desc)}c  |  "
          f"kw density {dens:.2f}%")
    for w in warn:
        print(f"    WARN: {w}")
    return out


def main(args):
    targets = []
    for a in args:
        if os.path.isdir(a):
            targets += [os.path.join(a, f) for f in sorted(os.listdir(a)) if f.endswith(".md")]
        elif a.endswith(".md"):
            targets.append(a)
    if not targets:
        sys.exit("no .md files found")
    for t in targets:
        build(t)


if __name__ == "__main__":
    main(sys.argv[1:] or ["."])
