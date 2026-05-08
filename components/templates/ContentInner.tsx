type ContentInnerProps = {
    children: React.ReactNode;
    styles?: string;
}

export const ContentInner = (props: ContentInnerProps) => {
    return (
        <div className={`mx-auto w-full max-w-5xl py-4 px-4 sm:px-6 md:px-8 ${props.styles}`}>
            {props.children}
        </div>
    );
}