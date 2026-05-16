# [akilasatolu-v5](https://drj0u9hm1kc44.cloudfront.net/)

[English](README.md) | [日本語](README.ja.md)

Personal portfolio site built with Next.js. Content (blog, photography, experience) lives in separate repositories and S3 buckets; the app ships static HTML and loads images from CloudFront.

---

## Tech Stack

### Application

| Category | Technology |
|----------|------------|
| Framework | [Next.js](https://nextjs.org/) 16 (App Router) |
| UI | [React](https://react.dev/) 19 |
| Language | [TypeScript](https://www.typescriptlang.org/) 5 |
| Styling | [Tailwind CSS](https://tailwindcss.com/) 4 (PostCSS) |
| Fonts | [Geist](https://vercel.com/font) (`next/font/google`) |
| State | [Jotai](https://jotai.org/) |
| Markdown | [marked](https://marked.js.org/) (blog body) |
| AWS SDK | [@aws-sdk/client-s3](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/s3/) (fetch from S3 at build time / on the server) |

### Quality & Tooling

| Category | Technology |
|----------|------------|
| Linter | [ESLint](https://eslint.org/) 9 + `eslint-config-next` |
| Formatter | [Prettier](https://prettier.io/) |
| Tests | [Jest](https://jestjs.io/) 30 + [Testing Library](https://testing-library.com/) |

### Infrastructure & Deploy

| Category | Technology |
|----------|------------|
| Production | Amazon S3 (static site) + **CloudFront** (HTML + images) |
| CI/CD | [GitHub Actions](https://github.com/features/actions) |
| Containers | Docker / Docker Compose (standalone prod, dev, SSG build) |
| CI auth | IAM access keys (read content S3 during SSG) + **OIDC** (write deploy bucket) |

---

## Architecture

### Data flow

```text
[Content S3]  blog / photography / experience buckets
       │  JSON & Markdown (at build time or server fetch)
       ▼
[Next.js]  akilasatolu-v5
       │  image URLs only (no binary sync)
       ▼
[CloudFront]  /akilasatolu-blog-image/*  /akilasatolu-photography/*
       ▲
[Deploy S3]  out/ (HTML/CSS/JS) ← CI sync
```

### Directory layout (main)

```text
app/                 # App Router pages
components/          # atoms / organisms / templates
lib/                 # S3, blog, photography, experience, image URLs
scripts/             # build-static.mjs
public/              # favicon, etc. (images use CloudFront paths)
styles/
.github/workflows/   # deploy on push to main
Dockerfile           # standalone production
Dockerfile.static    # SSG build → out/
Dockerfile.dev       # development
```

---

## Pages

| Path | Description |
|------|-------------|
| `/` | Blog index (published posts only) |
| `/blog/[slug]` | Blog post |
| `/photography` | Photo gallery |
| `/experience` | Skills & experience |
| `/about` | About me |

---

## Design Highlights

- **Fast page loads** — Pages are pre-rendered and served from a CDN, so visitors do not wait on server processing every time they open a page.
- **Instant list updates** — Blog search, tag filters, and pagination update on the spot without another request to the server.
- **Less theme flicker** — Light or dark mode is applied before the page appears, and the setting is saved in the browser. It carries over on the next visit—no login required.
- **Only actionable controls are shown** — Pagination buttons are hidden when there is nowhere to go, reducing the frustration of clicking something that does nothing.
- **Readable on any device** — The layout adapts to screen size, so the site is comfortable to use on phones and desktops alike.
- **Keyboard accessible** — Buttons and links can be reached in order with the Tab key, so a mouse is not required.
- **Lower cost with CDN image delivery** — Images are served from the CDN instead of being bundled into every build, which keeps both deploy size and delivery costs down.
- **Content separated from the app** — Blog, photography, and experience each live in their own repository. When content is updated, the site is rebuilt and deployed automatically; the data can be reused elsewhere. The app itself focuses on presentation and delivery, not content management.
  - Blog: [akilasatolu-blog](https://github.com/akilasatolu/akilasatolu-blog)
  - Photography: [akilasatolu-photography](https://github.com/akilasatolu/akilasatolu-photography)
  - Experience: [akilasatolu-experience](https://github.com/akilasatolu/akilasatolu-experience)
