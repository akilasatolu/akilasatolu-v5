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
| Markdown | [marked](https://marked.js.org/)（ブログ本文のレンダリング） |
| AWS SDK | [@aws-sdk/client-s3](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/s3/)（S3 読み取り・ビルド時アセット同期） |

### 品質・開発ツール

| 分類 | 技術 |
|------|------|
| Linter | [ESLint](https://eslint.org/) 9 + `eslint-config-next` |
| Formatter | [Prettier](https://prettier.io/) |
| テスト | [Jest](https://jestjs.io/) 30 + [Testing Library](https://testing-library.com/) |

### インフラ・デプロイ

| 分類 | 技術 |
|------|------|
| 本番ホスティング | Amazon S3（静的サイト） |
| CI/CD | [GitHub Actions](https://github.com/features/actions) |
| コンテナ | Docker / Docker Compose（本番 standalone・開発・SSG ビルド用） |
| 認証（CI） | IAM アクセスキー（ビルド時 S3 取得）+ **OIDC**（デプロイ時 `AssumeRoleWithWebIdentity`） |

---

## アーキテクチャ概要

### コンテンツの置き場所（S3）

ページごとに **バケットとオブジェクトキー** を分けています（`lib/env.ts`）。

| ページ | 主なデータ |
|--------|------------|
| `/`（ブログ一覧） | 投稿一覧 JSON（`S3_PATH_BLOG`） |
| `/blog/[slug]` | `posts/{slug}.md`、画像は `posts-img/` |
| `/photography` | 写真一覧 JSON（`S3_PATH_PHOTOGRAPHY`）、画像は `photos/` |
| `/experience` | スキル等 JSON（`S3_PATH_EXPERIENCE`） |

**デプロイ先バケット**（`AWS_S3_BUCKET`）は、上記のコンテンツ用バケットとは別です。CI でビルドした `out/` をここに配置します。

### 2 つの実行モード

`next.config.ts` は環境変数 `STATIC_EXPORT` で出力形式を切り替えます。

| モード | トリガー | `output` | 画像の扱い |
|--------|----------|----------|------------|
| **開発 / standalone 本番** | `npm run dev` / `npm run build` | `standalone` | Route Handler（`/blog/image`, `/photography/image`）が S3 をプロキシ |
| **静的エクスポート（SSG）** | `npm run build:static` | `export` | ビルド前に S3 から `public/` へ同期し、`/blog/image/…`, `/photography/image/…` として配信 |

静的ビルドの流れ（`scripts/build-static.mjs`）:

1. `scripts/prepare-static-assets.mjs` — 公開記事の Markdown 参照・写真 JSON から必要画像だけ S3 へ **GetObject**（ListBucket 不要）
2. 画像用 Route Handler を一時退避（`output: export` と非両立のため）
3. `STATIC_EXPORT=1 next build` → `out/`
4. Route Handler を復元

---

## ディレクトリ構成（主要）

```
app/                 # App Router ページ・Route Handler
components/          # atoms / organisms / templates
lib/                 # S3 取得、ブログ・写真・Experience ロジック
scripts/             # build:static、静的アセット同期
public/              # 静的アセット（SSG 時に blog/photography 画像が同期される）
styles/              # グローバル CSS・テーマ
.github/workflows/   # main への push で S3 デプロイ
Dockerfile           # standalone 本番イメージ
Dockerfile.static    # SSG ビルド用（成果物を out に export）
Dockerfile.dev       # 開発用
```

---

## スクリプト

```bash
npm run dev              # 開発サーバー
npm run build            # standalone ビルド
npm run build:static     # 静的エクスポート（.env または環境変数が必要）
npm run start            # 本番サーバー起動
npm run lint
npm run test
npm run format           # Prettier
```

### Docker

```bash
npm run docker:dev       # 開発（docker-compose.dev.yml）
npm run docker:up        # 本番 standalone（docker-compose.yml）
```

---

## 環境変数

ローカルは `.env` を参照。CI は GitHub Actions Secrets。

| 変数 | 用途 |
|------|------|
| `AWS_REGION` | AWS リージョン（未設定時 `ap-northeast-1`） |
| `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY` | ローカル・CI ビルド時の S3 読み取り |
| `S3_BUCKET_*` / `S3_PATH_*` | コンテンツ用バケットと JSON キー |
| `AWS_S3_BUCKET` | 静的サイトのデプロイ先（CI のみ） |
| `AWS_ROLE_TO_ASSUME` | CI デプロイ用 IAM ロール ARN（OIDC） |

サーバー専用のため、`NEXT_PUBLIC_` プレフィックスは使っていません。

---

## CI/CD（`.github/workflows/deploy.yml`）

`main` への push で:

1. **Docker（`Dockerfile.static`）** — BuildKit secret で AWS 認証を渡し、`build:static` を実行。`--output type=local,dest=./out` で成果物を取得
2. **OIDC** — `aws-actions/configure-aws-credentials` でロールを引き受け
3. **S3** — デプロイバケットを空にしてから `aws s3 sync ./out`（キャッシュ無効ヘッダ付き）

---

## ページ一覧

| パス | 内容 |
|------|------|
| `/` | ブログ一覧（公開記事のみ） |
| `/blog/[slug]` | ブログ記事詳細 |
| `/photography` | 写真ギャラリー |
| `/experience` | スキル・経験 |
| `/about` | About |
