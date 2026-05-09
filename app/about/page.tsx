export default function AboutPage() {
    return (
        <div className="flex min-h-0 w-full flex-1 flex-col justify-start md:flex-row md:items-stretch">
            <div className="w-full min-w-0 md:flex-1 md:pr-4">
                <h1 className="text-3xl font-semibold tracking-tight">About</h1>
                <p className="mt-4 text-foreground">
                    プロフィールやサイトについての説明をここに書きます。
                </p>
            </div>
            <aside className="w-full shrink-0 border-[color:var(--border)] md:min-h-full md:pl-4 md:grow md:shrink md:basis-[25%] md:min-w-[20%] md:max-w-[30%] md:self-stretch md:border-l">
                <p className="text-sm text-[color:var(--muted)]">Aside（任意）</p>
            </aside>
        </div>
    );
}
