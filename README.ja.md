# [akilasatolu-v5](https://drj0u9hm1kc44.cloudfront.net/)

[English](README.md) | [日本語](README.ja.md)

Next.js で構築した個人ポートフォリオサイトです。ブログ・写真・経験などのコンテンツはリポジトリや S3 バケットを分けて管理し、アプリ本体は静的 HTML のみを配信し、画像は CloudFront から読み込みます。

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

## アーキテクチャ

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

### ディレクトリ構成（主要）

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

## ページ一覧

| パス | 内容 |
|------|------|
| `/` | ブログ一覧（公開記事のみ） |
| `/blog/[slug]` | ブログ記事 |
| `/photography` | 写真ギャラリー |
| `/experience` | スキル・経験 |
| `/about` | 私について |

---

## 設計のポイント

- **ページ表示が速い** — あらかじめ生成した HTML を CDN から配信しているため、ページを開くたびにサーバー側の処理を待つ必要がありません。
- **一覧の操作がすぐ反映される** — ブログ一覧の検索・タグの切り替え・ページ送りは、サーバーへの再リクエストなしでその場で結果が変わります。
- **テーマ切り替えのちらつきを抑える** — ページ表示前にライト／ダークを反映し、設定はブラウザに保存されます。次回アクセス時も、ログインなしで同じ設定が続きます。
- **押せる操作だけを表示する** — ページネーションは、先へ進めないときはボタンを出さないようにしています。「押せると思ったのに押せない」という迷いを減らします。
- **どの端末でも見やすい** — 画面サイズに応じてレイアウトが変わるため、スマートフォンからデスクトップまで快適に閲覧できます。
- **キーボードでも操作できる** — ボタンやリンクは Tab キーで順に移動でき、マウスがなくても操作できます。
- **画像は CDN 配信でコストを抑える** — ビルドのたびに画像ファイルを同梱せず、CDN から配信しています。デプロイのサイズと配信コストの両方を抑えられます。
- **コンテンツを本体から分ける** — ブログ・写真・経験はそれぞれ別リポジトリで管理しています。コンテンツが更新されると自動で再ビルド・デプロイされ、データはほかの用途にも再利用できます。サイト本体はコンテンツの管理を担わず、表示と配信に専念できます。
  - ブログ: [akilasatolu-blog](https://github.com/akilasatolu/akilasatolu-blog)
  - 写真: [akilasatolu-photography](https://github.com/akilasatolu/akilasatolu-photography)
  - 経験: [akilasatolu-experience](https://github.com/akilasatolu/akilasatolu-experience)
