type PageTitleProps = {
    title: string;
}

export const PageTitle = (props: PageTitleProps) => {
    return (
        <h1>{props.title}</h1>
    );
}