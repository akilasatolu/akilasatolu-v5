import { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

function Counter() {
    const [n, setN] = useState(0);
    return (
        <div>
            <span data-testid="count">{n}</span>
            <button type="button" onClick={() => setN((c) => c + 1)}>
                increment
            </button>
        </div>
    );
}

describe("@testing-library/react", () => {
    it("renders and responds to user events", async () => {
        const user = userEvent.setup();
        render(<Counter />);

        expect(screen.getByTestId("count")).toHaveTextContent("0");

        await user.click(screen.getByRole("button", { name: /increment/i }));

        expect(screen.getByTestId("count")).toHaveTextContent("1");
    });
});
