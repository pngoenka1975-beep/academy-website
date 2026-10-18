# Rising Starz — Resources Content Guide

This document explains how to add and manage **Previous Year Question Papers (PYQs)**, **Blogs**, and **Study Notes** for the Rising Starz website (`spark.html`).

---

## 1. Folder Structure

Keep all resource files inside the `Spark/` folder alongside `spark.html`:

```
Spark/
├── spark.html              # Main website
├── blog-neet-strategy.html # Standalone blog page (example)
├── assets/
│   ├── og-image.jpg
│   └── logo.png
├── blogs/
│   ├── blog-jee-physics.html
│   └── blog-chemistry.html
├── pyqs/
│   ├── jee-main-2024.pdf
│   ├── neet-2024.pdf
│   └── jee-advanced-2024.pdf
└── notes/
    ├── physics-chapterwise.pdf
    ├── chemistry-chapterwise.pdf
    ├── mathematics-chapterwise.pdf
    └── biology-chapterwise.pdf
```

**Recommendation:** Use subfolders (`blogs/`, `pyqs/`, `notes/`) so the root stays clean.

---

## 2. Adding a New Blog Post

### Step 1 — Create a standalone HTML file

Create a new file in `Spark/blogs/` (or root) using `blog-neet-strategy.html` as a template. Required elements:

| Element | Purpose |
|---------|---------|
| `<title>` | SEO title (max 60 chars) |
| `<meta name="description">` | SEO description (max 160 chars) |
| `<meta name="keywords">` | Relevant keywords |
| Open Graph tags (`og:title`, `og:description`, `og:image`) | Social sharing previews |
| Twitter Card tags | Twitter/X sharing |
| `<link rel="canonical">` | Prevent duplicate content issues |
| `<article>` / `<h1>`, `<h2>`, `<h3>` | Semantic content structure |
| Internal link back to `spark.html` | Navigation + SEO juice |

### Step 2 — Add a blog card in `spark.html`

Open `spark.html` and find the **Blogs Section** inside `#tab-resources`. Add a new card following this pattern:

```html
<a href="blogs/your-blog-file.html" class="group block">
    <div class="p-6 rounded-3xl theme-card border hover:border-brand-500 transition duration-300 h-full flex flex-col group-hover:shadow-xl">
        <div class="w-12 h-12 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center text-xl mb-4 group-hover:bg-brand-500 group-hover:text-white transition-colors">
            <i class="fa-solid fa-blog"></i>
        </div>
        <h4 class="text-lg font-bold mb-2 group-hover:text-brand-400 transition">Blog Title</h4>
        <p class="text-xs theme-text-muted mb-4 flex-grow">Short description of the blog.</p>
        <div class="flex items-center justify-between pt-4 border-t border-slate-700/40">
            <span class="text-xs font-bold text-brand-400">Read Guide →</span>
            <span class="text-xs theme-text-muted">X min read</span>
        </div>
    </div>
</a>
```

### Step 3 — Update the "Read All Blogs" link

Change the existing "Read All Blogs" button to point to a blog listing page or keep it linking to your main featured blog:

```html
<a href="blogs/blog-listing.html" class="px-5 py-2.5 rounded-xl bg-brand-600 ...">Read All Blogs</a>
```

---

## 3. Adding Previous Year Question Papers (PYQs)

### Step 1 — Upload PDF files

Place PDF files in `Spark/pyqs/`. Use clear naming:

```
jee-main-2024.pdf
jee-main-2023.pdf
neet-2024.pdf
neet-2023.pdf
jee-advanced-2024.pdf
jee-advanced-2023.pdf
```

### Step 2 — Add download cards in `spark.html`

In the **PYQs Section** of `#tab-resources`, add a card like this:

```html
<div class="p-6 rounded-3xl theme-card border flex flex-col items-center text-center group hover:border-brand-500 transition">
    <div class="w-14 h-14 rounded-2xl bg-brand-500/20 text-brand-400 flex items-center justify-center text-2xl mb-3 group-hover:bg-brand-500 group-hover:text-white transition-colors">
        <i class="fa-solid fa-download"></i>
    </div>
    <h4 class="text-lg font-bold mb-2">JEE Main 2024</h4>
    <p class="text-xs theme-text-muted mb-6">Question paper with solutions</p>
    <a href="pyqs/jee-main-2024.pdf" download class="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm transition shadow-md">Download PDF</a>
</div>
```

**Important:** Add the `download` attribute to the `<a>` tag so browsers download the PDF instead of opening it.

### Step 3 — Repeat for each paper

Copy the block above and change:
- Icon color class (`bg-brand-500/20 text-brand-400` → `bg-amber-500/20 text-amber-400`, etc.)
- Heading (`JEE Main 2024`, `NEET 2024`, `JEE Advanced 2024`)
- PDF path (`pyqs/jee-main-2024.pdf`)
- Button text if needed

---

## 4. Adding Study Notes

### Step 1 — Upload note files

Place PDFs in `Spark/notes/`:

```
physics-chapterwise.pdf
chemistry-chapterwise.pdf
mathematics-chapterwise.pdf
biology-chapterwise.pdf
```

### Step 2 — Add note cards in `spark.html`

In the **Study Notes Section** of `#tab-resources`, add cards following this pattern:

```html
<div class="p-6 rounded-3xl theme-card border flex flex-col items-center text-center group hover:border-purple-500 transition">
    <div class="w-14 h-14 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center text-2xl mb-3 group-hover:bg-purple-500 group-hover:text-white transition-colors">
        <i class="fa-solid fa-microscope"></i>
    </div>
    <h4 class="text-lg font-bold mb-2">Physics</h4>
    <p class="text-xs theme-text-muted mb-4">Mechanics, Thermodynamics, Electrodynamics</p>
    <a href="notes/physics-chapterwise.pdf" download class="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm transition text-xs sm:text-base">View Notes</a>
</div>
```

### Step 3 — Repeat for all 4 subjects

Update the icon, color, heading, description, and PDF path for Chemistry, Mathematics, and Biology.

---

## 5. Updating Navigation

When you add a new major resource category (e.g., a new tab), update:

1. **Desktop nav** — add a `<button onclick="switchTab('your-tab-id')">` next to other nav buttons.
2. **Mobile menu** — add a matching `<button>` inside `#mobile-menu`.
3. **Tab content** — add `<section id="tab-your-tab-id" class="tab-content hidden ...">` before the Contact tab.
4. **`switchTab()` JS function** — no change needed; it dynamically handles any `tab-` ID.

---

## 6. SEO Checklist for Every New Page

Before publishing a new blog or resource page:

- [ ] Unique `<title>` under 60 characters
- [ ] Unique `<meta name="description">` under 160 characters
- [ ] `<meta name="robots" content="index, follow">`
- [ ] `<link rel="canonical" href="https://yourdomain.com/page.html">`
- [ ] Open Graph tags (`og:type`, `og:url`, `og:title`, `og:description`, `og:image`)
- [ ] Twitter Card tags
- [ ] JSON-LD structured data (optional but recommended)
- [ ] H1 heading present on the page
- [ ] Internal link back to `spark.html`
- [ ] Image `alt` attributes on all images
- [ ] `download` attribute on PDF links

---

## 7. File Naming Conventions

Use lowercase, kebab-case, no spaces:

| Content Type | Pattern | Example |
|--------------|---------|---------|
| Blog posts | `blog-{topic}-{year}.html` | `blog-neet-strategy-2026.html` |
| PYQs | `pyq-{exam}-{year}.pdf` | `pyq-neet-2024.pdf` |
| Notes | `notes-{subject}.pdf` | `notes-physics.pdf` |
| Images | `img-{description}.jpg` | `img-neet-biology.jpg` |

---

## 8. Quick Reference: Adding a New Blog in 3 Steps

1. **Create** `Spark/blogs/blog-new-topic.html` using `blog-neet-strategy.html` as a template.
2. **Add** a card link in `spark.html` → `#tab-resources` → Blogs grid.
3. **Update** the "Read All Blogs" CTA if you created a listing page.

---

## 9. Maintenance Notes

- Replace `risingstarz.example.com` in all `og:url`, `twitter:url`, and `canonical` links with your real domain before launch.
- Test all PDF download links on mobile and desktop.
- Keep blog images under 200 KB and use WebP or compressed JPG for faster loading.
- If you add Firebase later, you can store blog metadata (title, excerpt, date) in the database and render cards dynamically instead of hardcoding HTML.
