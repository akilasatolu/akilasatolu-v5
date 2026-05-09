type PageTitleProps = {
    title: string;
}

export const PageTitle = (props: PageTitleProps) => {
    return (
        <h1 className="text-3xl font-semibold tracking-tight">{props.title}</h1>
    );
}