# [akilasatolu-v5](https://drj0u9hm1kc44.cloudfront.net/)

[English](README.md) | [日本語](README.ja.md)

Next.js で構築した個人ポートフォリオサイトです。ブログ・経験などのコンテンツはリポジトリや S3 バケットを分けて管理し、アプリ本体は静的 HTML のみを配信し、画像は CloudFront から読み込みます。

---

## 技術スタック

### アプリケーション

| 分類 | 技術 |
|------|------|
| フレームワーク | [Next.js](https://nextjs.org/) 16（App Router） |
| UI | [React](https://react.dev/) 19 |
| 言語 | [TypeScript](https://www.typescriptlang.org/) 5 |
| スタイル | [Tailwind CSS](https://tailwindcss.com/) 4（PostCSS） |
| フォント | [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono)（`next/font/google`） |
| 状態管理 | React Context（パンくずの上書き） |
| Markdown | [marked](https://marked.js.org/)（ブログ本文） |
| AWS SDK | [@aws-sdk/client-s3](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/s3/)（ビルド時に S3 から取得） |

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

## アーキテクチャ

### データの流れ

```text
[コンテンツ S3]  blog / experience 各バケット
       │  JSON・Markdown（ビルド時）
       ▼
[Next.js]  akilasatolu-v5
       │  画像 URL のみ参照（バイナリは同期しない）
       ▼
[CloudFront]  /akilasatolu-blog-image/*
       ▲
[デプロイ S3]  out/（HTML/CSS/JS）← CI が sync
```

### ディレクトリ構成（主要）

```text
app/                 # App Router ページ
components/          # atoms / molecules / organisms / templates / providers
lib/                 # S3、ブログ・Experience、パンくず、画像 URL
scripts/             # build-static.mjs
public/              # favicon 等（画像は CF パスを参照）
styles/
.github/workflows/   # main push で S3 デプロイ
Dockerfile           # standalone 本番
Dockerfile.static    # SSG ビルド → out/
Dockerfile.dev       # 開発
```

---

## ページ一覧

| パス | 内容 |
|------|------|
| `/` | ホーム / 自己紹介 |
| `/blog/` | ブログ一覧（公開記事のみ） |
| `/blog/[slug]/` | ブログ記事 |
| `/experience/` | スキル・経験 |

---

## 設計のポイント

- **ページ表示が速い** — あらかじめ生成した HTML を CDN から配信しているため、ページを開くたびにサーバー側の処理を待つ必要がありません。
- **OS のテーマ設定に追従** — CSS の `prefers-color-scheme` でライト／ダークを切り替えます。
- **セマンティック HTML** — `h1`、`h2`、`p`、`ul`、`article`、`code` などのネイティブ要素を活かし、カスタムスタイルは最小限にしています。
- **パンくずナビゲーション** — パスから自動生成し、ブログ記事ページではタイトルで上書きします。
- **画像は CDN 配信でコストを抑える** — ビルドのたびに画像ファイルを同梱せず、CDN から配信しています。デプロイのサイズと配信コストの両方を抑えられます。
- **コンテンツを本体から分ける** — ブログ・経験はそれぞれ別リポジトリで管理しています。コンテンツが更新されると自動で再ビルド・デプロイされ、データはほかの用途にも再利用できます。サイト本体はコンテンツの管理を担わず、表示と配信に専念できます。
  - ブログ: [akilasatolu-blog](https://github.com/akilasatolu/akilasatolu-blog)
  - 経験: [akilasatolu-experience](https://github.com/akilasatolu/akilasatolu-experience)
