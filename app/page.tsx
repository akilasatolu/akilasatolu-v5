export default function HomePage() {
    return (
        <div className="w-full flex min-h-0 flex-1 flex-col justify-start md:flex-row md:items-stretch">
            <div className="w-full min-w-0 md:flex-1 md:pr-4">
                <h1>H1 title</h1>
                <h2>H2 title</h2>
                <h3>H3 title</h3>
                <h4>H4 title</h4>
                <h5>H5 title</h5>
                <h6>H6 title</h6>
                <p>ParagraphParagraphParagraphParagraphParagraphParagraphParagraphParagraphParagraphParagraphParagraphParagraphParagraphParagraphParagraphParagraphParagraphParagraphParagraphParagraphParagraphParagraphParagraphParagraphParagraphParagraphParagraphParagraph</p>
                <a href="#">Link</a>
                <button>Button</button>
            </div>
            <aside className="w-full shrink-0 border-[color:var(--border)] md:min-h-full md:pl-4 md:grow md:shrink md:basis-[25%] md:min-w-[20%] md:max-w-[30%] md:self-stretch md:border-l">
                <p>AsideAsideAsideAsideAsideAsideAsideAsideAsideAsideAsideAsideAsideAsideAsideAsideAsideAsideAsideAsideAsideAsideAsideAsideAside</p>
            </aside>
        </div>
    );
}
