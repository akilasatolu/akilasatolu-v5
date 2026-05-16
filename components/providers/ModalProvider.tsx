"use client";

import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
    type ReactNode,
} from "react";
import { Modal } from "@/components/organisms/Modal";

type ModalContextValue = {
    isOpen: boolean;
    openModal: (content: ReactNode, options?: { ariaLabel?: string }) => void;
    closeModal: () => void;
};

const ModalContext = createContext<ModalContextValue | null>(null);

type ModalProviderProps = {
    children: ReactNode;
};

export const ModalProvider = ({ children }: ModalProviderProps) => {
    const [content, setContent] = useState<ReactNode | null>(null);
    const [ariaLabel, setAriaLabel] = useState("Dialog");

    const openModal = useCallback(
        (nextContent: ReactNode, options?: { ariaLabel?: string }) => {
            setAriaLabel(options?.ariaLabel ?? "Dialog");
            setContent(nextContent);
        },
        [],
    );

    const closeModal = useCallback(() => {
        setContent(null);
    }, []);

    const value = useMemo(
        () => ({
            isOpen: content !== null,
            openModal,
            closeModal,
        }),
        [content, openModal, closeModal],
    );

    return (
        <ModalContext.Provider value={value}>
            {children}
            <Modal open={content !== null} onClose={closeModal} ariaLabel={ariaLabel}>
                {content}
            </Modal>
        </ModalContext.Provider>
    );
};

export const useModal = (): ModalContextValue => {
    const context = useContext(ModalContext);

    if (!context) {
        throw new Error("useModal must be used within ModalProvider");
    }

    return context;
};
