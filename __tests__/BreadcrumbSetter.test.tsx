import { BreadcrumbSetter } from "@/components/providers/BreadcrumbSetter";
import {
    BreadcrumbProvider,
    useBreadcrumbItems,
} from "@/components/providers/BreadcrumbProvider";
import { render, screen } from "@testing-library/react";

function Probe() {
    const items = useBreadcrumbItems();
    return (
        <span data-testid="items">
            {items ? items.map((item) => item.label).join(",") : "null"}
        </span>
    );
}

describe("BreadcrumbSetter", () => {
    it("sets breadcrumb items while mounted", () => {
        render(
            <BreadcrumbProvider>
                <Probe />
                <BreadcrumbSetter items={[{ label: "Custom" }]} />
            </BreadcrumbProvider>,
        );

        expect(screen.getByTestId("items")).toHaveTextContent("Custom");
    });

    it("clears breadcrumb items on unmount", () => {
        const { rerender } = render(
            <BreadcrumbProvider>
                <Probe />
                <BreadcrumbSetter items={[{ label: "Custom" }]} />
            </BreadcrumbProvider>,
        );

        rerender(
            <BreadcrumbProvider>
                <Probe />
            </BreadcrumbProvider>,
        );

        expect(screen.getByTestId("items")).toHaveTextContent("null");
    });
});
