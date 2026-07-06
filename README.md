# [akilasatolu-v5](https://drj0u9hm1kc44.cloudfront.net/)

[English](README.md) | [日本語](README.ja.md)

Personal portfolio site built with Next.js. Content (blog, experience) lives in separate repositories and S3 buckets; the app ships static HTML and loads images from CloudFront.

---

## Tech Stack

### Application

| Category | Technology |
|----------|------------|
| Framework | [Next.js](https://nextjs.org/) 16 (App Router) |
| UI | [React](https://react.dev/) 19 |
| Language | [TypeScript](https://www.typescriptlang.org/) 5 |
| Styling | [Tailwind CSS](https://tailwindcss.com/) 4 (PostCSS) |
| Fonts | [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono) (`next/font/google`) |
| State | React Context (breadcrumb overrides) |
| Markdown | [marked](https://marked.js.org/) (blog body) |
| AWS SDK | [@aws-sdk/client-s3](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/s3/) (fetch from S3 at build time) |

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
[Content S3]  blog / experience buckets
       │  JSON & Markdown (at build time)
       ▼
[Next.js]  akilasatolu-v5
       │  image URLs only (no binary sync)
       ▼
[CloudFront]  /akilasatolu-blog-image/*
       ▲
[Deploy S3]  out/ (HTML/CSS/JS) ← CI sync
```

### Directory layout (main)

```text
app/                 # App Router pages
components/          # atoms / molecules / organisms / templates / providers
lib/                 # S3, blog, experience, breadcrumbs, image URLs
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
| `/` | Home / personal intro |
| `/blog/` | Blog index (published posts only) |
| `/blog/[slug]/` | Blog post |
| `/experience/` | Skills & experience |

---

## Design Highlights

- **Fast page loads** — Pages are pre-rendered and served from a CDN, so visitors do not wait on server processing every time they open a page.
- **System theme support** — Light or dark mode follows the OS preference via CSS `prefers-color-scheme`.
- **Semantic HTML** — Pages use native elements (`h1`, `h2`, `p`, `ul`, `article`, `code`) with minimal custom styling.
- **Breadcrumb navigation** — Path-based breadcrumbs with per-page overrides for blog post titles.
- **Lower cost with CDN image delivery** — Images are served from the CDN instead of being bundled into every build, which keeps both deploy size and delivery costs down.
- **Content separated from the app** — Blog and experience each live in their own repository. When content is updated, the site is rebuilt and deployed automatically; the data can be reused elsewhere. The app itself focuses on presentation and delivery, not content management.
  - Blog: [akilasatolu-blog](https://github.com/akilasatolu/akilasatolu-blog)
  - Experience: [akilasatolu-experience](https://github.com/akilasatolu/akilasatolu-experience)
