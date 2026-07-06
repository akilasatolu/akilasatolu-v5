type PageTitleProps = {
    title: string;
}

export const PageTitle = (props: PageTitleProps) => {
    return (
        <h1 className="tracking-tight">{props.title}</h1>
    );
}