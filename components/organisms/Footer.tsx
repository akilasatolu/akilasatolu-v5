import { ContentInner } from "@/components/templates/ContentInner";

export const Footer = () => {
    return (
        <footer className="border-t border-[color:var(--border)]">
            <ContentInner>
                <div className="flex justify-center">
                    <p className="text-sm text-[color:var(--muted)]">© 2026-present akilasatolu. All rights reserved.</p>
                </div>
            </ContentInner>
        </footer>
    );
}
