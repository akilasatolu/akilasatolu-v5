"use client";

import { useEffect, useSyncExternalStore, type ReactNode } from "react";
import { createPortal } from "react-dom";

function subscribeMounted(onStoreChange: () => void): () => void {
    onStoreChange();
    return () => undefined;
}

type ModalProps = {
    open: boolean;
    onClose: () => void;
    children: ReactNode;
    ariaLabel?: string;
};

export const Modal = ({
    open,
    onClose,
    children,
    ariaLabel = "Dialog",
}: ModalProps) => {
    const mounted = useSyncExternalStore(
        subscribeMounted,
        () => true,
        () => false,
    );

    useEffect(() => {
        if (!open) {
            return;
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [open, onClose]);

    if (!open || !mounted) {
        return null;
    }

    return createPortal(
        <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            role="presentation"
            onClick={onClose}
        >
            <div className="absolute inset-0 bg-black/60" aria-hidden="true" />
            <div
                role="dialog"
                aria-modal="true"
                aria-label={ariaLabel}
                className="relative z-10 flex h-[90vh] w-[90vw] flex-col overflow-hidden rounded-lg border border-[color:var(--border)] bg-[color:var(--background)] shadow-lg"
                onClick={(event) => event.stopPropagation()}
            >
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close"
                    className="absolute top-3 right-3 z-10 inline-flex size-9 items-center justify-center rounded-md text-[color:var(--muted)] transition-colors hover:bg-[color:var(--card-bg)] hover:text-[color:var(--color)]"
                >
                    <span aria-hidden="true" className="text-2xl leading-none">
                        ×
                    </span>
                </button>
                <div className="flex min-h-0 flex-1 flex-col overflow-hidden p-4 pt-12 sm:p-6 sm:pt-14">
                    {children}
                </div>
            </div>
        </div>,
        document.body,
    );
};
