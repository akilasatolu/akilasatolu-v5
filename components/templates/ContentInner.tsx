type ContentInnerProps = {
    children: React.ReactNode;
    styles?: string;
}

export const ContentInner = (props: ContentInnerProps) => {
    return (
        <div className={`box-border w-full max-w-5xl px-4 py-4 sm:px-6 md:px-8 ${props.styles ?? ""}`}>
            {props.children}
        </div >
    );
}