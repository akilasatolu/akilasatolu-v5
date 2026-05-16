# [akilasatolu-v5](https://drj0u9hm1kc44.cloudfront.net/)

Blog: https://github.com/akilasatolu/akilasatolu-blog

Photography: https://github.com/akilasatolu/akilasatolu-photography

Experience: https://github.com/akilasatolu/akilasatolu-experience

---

## 技術スタック

### アプリケーション

| 分類 | 技術 |
|------|------|
| フレームワーク | [Next.js](https://nextjs.org/) 16（App Router） |
| UI | [React](https://react.dev/) 19 |
| 言語 | [TypeScript](https://www.typescriptlang.org/) 5 |
| スタイル | [Tailwind CSS](https://tailwindcss.com/) 4（PostCSS） |
| フォント | [Geist](https://vercel.com/font)（`next/font/google`） |
| 状態管理 | [Jotai](https://jotai.org/) |
| Markdown | [marked](https://marked.js.org/)（ブログ本文） |
| AWS SDK | [@aws-sdk/client-s3](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/s3/)（ビルド時・サーバーから S3 取得） |

### 品質・開発ツール

| 分類 | 技術 |
|------|------|
| Linter | [ESLint](https://eslint.org/) 9 + `eslint-config-next` |
| Formatter | [Prettier](https://prettier.io/) |
| テスト | [Jest](https://jestjs.io/) 30 + [Testing Library](https://testing-library.com/) |

### インフラ・デプロイ

| 分類 | 技術 |
|------|------|
| 本番配信 | Amazon S3（静的サイト）+ **CloudFront**（HTML + 画像） |
| CI/CD | [GitHub Actions](https://github.com/features/actions) |
| コンテナ | Docker / Docker Compose（standalone 本番・開発・SSG ビルド） |
| CI 認証 | IAM アクセスキー（SSG ビルド時のコンテンツ S3 読み取り）+ **OIDC**（デプロイ先 S3 への書き込み） |

---

## アーキテクチャ概要

### データの流れ

```text
[コンテンツ S3]  blog / photography / experience 各バケット
       │  JSON・Markdown（ビルド時 or サーバー取得）
       ▼
[Next.js]  akilasatolu-v5
       │  画像 URL のみ参照（バイナリは同期しない）
       ▼
[CloudFront]  /akilasatolu-blog-image/*  /akilasatolu-photography/*
       ▲
[デプロイ S3]  out/（HTML/CSS/JS）← CI が sync
```

- **コンテンツ用バケット**（`S3_BUCKET_*`）: テキスト・画像オブジェクトの保管。アプリは `GetObject` で JSON / Markdown を取得。
- **デプロイ先バケット**（`AWS_S3_BUCKET`）: `npm run build:static` の `out/` のみ。ブログ・写真の**画像ファイルは含めない**（CF 側のパスで配信）。

### コンテンツの S3 キー（`lib/env.ts`）

| ページ | データ | 画像（CF 上のパス） |
|--------|--------|---------------------|
| `/` | 投稿一覧 JSON（`S3_PATH_BLOG`） | — |
| `/blog/[slug]` | `akilasatolu-blog/{slug}.md` | `/akilasatolu-blog-image/{filename}` |
| `/photography` | 一覧 JSON（`S3_PATH_PHOTOGRAPHY`） | `/akilasatolu-photography/...` |
| `/experience` | JSON（`S3_PATH_EXPERIENCE`） | — |

### 実行モード

`next.config.ts` は `STATIC_EXPORT` で `output` を切り替えます。

| モード | コマンド | `output` | 画像の `src` |
|--------|----------|----------|----------------|
| 開発 / standalone | `npm run dev` / `npm run build` | `standalone` | `{CONTENT_CDN_BASE}/akilasatolu-blog-image/...` 等（絶対 URL） |
| 本番（SSG） | `npm run build:static` | `export` | `/akilasatolu-blog-image/...` 等（サイトと同一ドメイン＝CF） |

- ロジック: `lib/contentAssetUrl.ts` の `contentImagePublicUrl`
- SSG ビルド: `scripts/build-static.mjs` → `STATIC_EXPORT=1 next build` → `out/`

---

## ディレクトリ構成（主要）

```text
app/                 # App Router ページ
components/          # atoms / organisms / templates
lib/                 # S3、ブログ・写真・Experience、画像 URL
scripts/             # build-static.mjs
public/              # favicon 等（画像は CF パスを参照）
styles/
.github/workflows/   # main push で S3 デプロイ
Dockerfile           # standalone 本番
Dockerfile.static    # SSG ビルド → out/
Dockerfile.dev       # 開発
```

---

## スクリプト

```bash
npm run dev              # 開発サーバー（.env に CONTENT_CDN_BASE 必須）
npm run build            # standalone ビルド
npm run build:static     # 静的エクスポート → out/
npm run start            # standalone 起動
npm run lint
npm run test
npm run format           # Prettier
```

### Docker

```bash
npm run docker:dev       # docker-compose.dev.yml
npm run docker:up        # standalone 本番（docker-compose.yml）
```

---

## 環境変数

ローカルは `.env`。CI は GitHub Actions Secrets。

| 変数 | 用途 |
|------|------|
| `AWS_REGION` | リージョン（未設定時 `ap-northeast-1`） |
| `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY` | ローカル・CI の S3 読み取り（SSG ビルド内） |
| `S3_BUCKET_*` / `S3_PATH_*` | コンテンツ用バケットと JSON キー |
| `CONTENT_CDN_BASE` | **dev / standalone 必須**。CF のベース URL（例 `https://dxxxx.cloudfront.net`、末尾スラッシュなし）。SSG では未使用 |
| `AWS_S3_BUCKET` | 静的サイトのデプロイ先（CI のみ） |
| `AWS_ROLE_TO_ASSUME` | デプロイ用 IAM ロール ARN（OIDC） |

`NEXT_PUBLIC_` は使っていません（サーバー専用）。

**Docker standalone:** `CONTENT_CDN_BASE` は **ビルド時**（`Dockerfile` の ARG）に渡す。`/photography` などは `force-static` のため、実行時の `env_file` だけでは画像 URL が埋まりません。

---

## CI/CD（`.github/workflows/deploy.yml`）

`main` への push で:

1. **Docker（`Dockerfile.static`）** — BuildKit secret で AWS 認証を渡し `build:static`。`--output type=local,dest=./out`
2. **OIDC** — `configure-aws-credentials` で `AWS_ROLE_TO_ASSUME` を引き受け
3. **S3** — デプロイバケットを空にしてから `aws s3 sync ./out`（`--delete`、キャッシュ無効ヘッダ）

`Dockerfile.static` に `CONTENT_CDN_BASE` は**不要**（SSG はルート相対パスのみ）。

---

## ページ一覧

| パス | 内容 |
|------|------|
| `/` | ブログ一覧（公開記事のみ） |
| `/blog/[slug]` | ブログ記事 |
| `/photography` | 写真ギャラリー |
| `/experience` | スキル・経験 |
| `/about` | 私について |
