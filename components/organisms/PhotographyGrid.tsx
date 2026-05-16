"use client";

import { useModal } from "@/components/providers/ModalProvider";

export type PhotographyGridItem = {
    id: string;
    photoUrl: string;
    text: string;
};

type PhotographyGridProps = {
    items: PhotographyGridItem[];
};

export const PhotographyGrid = ({ items }: PhotographyGridProps) => {
    const { openModal } = useModal();

    return (
        <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {items.map((item) => (
                <li
                    key={item.id}
                    className="border border-[color:var(--border)] has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[color:var(--accent)]"
                >
                    <button
                        type="button"
                        onClick={() =>
                            openModal(
                                <div className="flex h-full min-h-0 flex-col">
                                    <div className="flex min-h-0 flex-1 items-center justify-center">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={item.photoUrl}
                                            alt={item.text}
                                            className="max-h-full max-w-full object-contain"
                                        />
                                    </div>
                                    <p className="mt-4 shrink-0 text-[color:var(--color)]">
                                        {item.text}
                                    </p>
                                </div>,
                                { ariaLabel: item.text },
                            )
                        }
                        className="block w-full cursor-pointer text-left focus-visible:outline-none"
                    >
                        <div className="relative aspect-square w-full overflow-hidden">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={item.photoUrl}
                                alt={item.text}
                                className="absolute inset-0 h-full w-full object-cover transition-opacity hover:opacity-90"
                                loading="lazy"
                            />
                        </div>
                    </button>
                </li>
            ))}
        </ul>
    );
};
