import { ContentInner } from "@/components/templates/ContentInner";

export const Footer = () => {
    return (
        <footer className="flex w-full justify-center border-t border-[color:var(--border)]">
            <ContentInner>
                <div className="flex justify-center">
                    <small>© 2026 akilasatolu</small>
                </div>
            </ContentInner>
        </footer>
    );
}
