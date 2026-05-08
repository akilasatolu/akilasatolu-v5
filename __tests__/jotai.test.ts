import { atom, createStore } from "jotai";

describe("jotai setup", () => {
    it("updates atom state in store", () => {
        const countAtom = atom(0);
        const store = createStore();

        expect(store.get(countAtom)).toBe(0);

        store.set(countAtom, 1);

        expect(store.get(countAtom)).toBe(1);
    });
});
