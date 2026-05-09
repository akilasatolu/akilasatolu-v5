type ColBlockProps = {
    children: React.ReactNode;
}
export const ColBlock = (props: ColBlockProps) => {
    return (
        <div className="flex flex-col">
            {props.children}
        </div>
    );
}