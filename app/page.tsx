export default function Home() {
    return (
        <main className="flex min-h-dvh flex-1 flex-col">
            <div className="mx-auto w-full max-w-3xl flex-1 px-6 py-12 md:py-16">
                <header className="mb-12 border-b border-[color:var(--border)] pb-8">
                    <h1 className="text-3xl font-semibold tracking-tight text-foreground">
                        Akilasatolu
                    </h1>
                    <p className="mt-2 text-[color:var(--muted)]">
                        スタイル確認用のベースレイアウト（本番ページの土台）
                    </p>
                </header>

                <div className="flex flex-col gap-14">
                    <section aria-labelledby="sec-typography">
                        <h2
                            id="sec-typography"
                            className="mb-4 text-lg font-semibold text-foreground"
                        >
                            Typography
                        </h2>
                        <div className="space-y-3 text-foreground">
                            <p>本文（--color / text-foreground）。複数行のダミーテキストで行間と折り返しを確認します。</p>
                            <p className="text-[color:var(--muted)]">
                                補助テキスト（--muted）。キャプションやメタ情報向け。
                            </p>
                        </div>
                    </section>

                    <section aria-labelledby="sec-headings">
                        <h2
                            id="sec-headings"
                            className="mb-4 text-lg font-semibold text-foreground"
                        >
                            Headings
                        </h2>
                        <div className="space-y-2">
                            <h3 className="text-xl font-semibold text-foreground">見出し h3</h3>
                            <h4 className="text-base font-semibold text-foreground">見出し h4</h4>
                        </div>
                    </section>

                    <section aria-labelledby="sec-links">
                        <h2
                            id="sec-links"
                            className="mb-4 text-lg font-semibold text-foreground"
                        >
                            Links
                        </h2>
                        <p className="text-foreground">
                            通常リンク:{" "}
                            <a href="https://example.com" className="underline-offset-2">
                                example.com
                            </a>
                        </p>
                    </section>

                    <section aria-labelledby="sec-actions">
                        <h2
                            id="sec-actions"
                            className="mb-4 text-lg font-semibold text-foreground"
                        >
                            Actions
                        </h2>
                        <button
                            type="button"
                            className="rounded-md bg-[color:var(--accent)] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[color:var(--accent-hover)]"
                        >
                            Primary button
                        </button>
                    </section>

                    <section aria-labelledby="sec-card">
                        <h2 id="sec-card" className="mb-4 text-lg font-semibold text-foreground">
                            Card
                        </h2>
                        <div className="rounded-lg border border-[color:var(--border)] bg-[color:var(--card-bg)] p-4 text-foreground">
                            カード領域（--card-bg / --border）
                        </div>
                    </section>

                    <section aria-labelledby="sec-code">
                        <h2 id="sec-code" className="mb-4 text-lg font-semibold text-foreground">
                            Code
                        </h2>
                        <pre className="overflow-x-auto rounded-lg bg-[color:var(--code-bg)] p-4 font-mono text-sm text-[color:var(--code-text)]">
                            <code>const hello = () =&gt; console.log(&quot;hello&quot;);</code>
                        </pre>
                    </section>
                </div>
            </div>
        </main>
    );
}
