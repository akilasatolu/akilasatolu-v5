type ContentInnerProps = {
    children: React.ReactNode;
    className?: string;
};

export const ContentInner = ({ children, className }: ContentInnerProps) => {
    return (
        <div
            className={`box-border w-full max-w-5xl px-4 py-4 sm:px-6 md:px-8 ${className ?? ""}`}
        >
            {children}
        </div>
    );
};
