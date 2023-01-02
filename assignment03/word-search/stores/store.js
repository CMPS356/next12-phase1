import create from "zustand";
import { persist, devtools } from "zustand/middleware";

const store = (set) => ({
    selection: [],

    handleClick: (word) =>
        set(state => {
            const selection = [...state.selection]

            const index = selection.findIndex(w => w == word)
            if (index != -1) {
                selection.splice(index, 1)
                return { ...state, selection }
            }
            else
                return { ...state, selection: [...state.selection, word] }
        }),

    handleDelete: (tag) =>
        set(state => {
            const selection = [...state.selection]

            const index = selection.findIndex(t => t == tag)
            selection.splice(index, 1)
            return { ...state, selection }
        }),


});

export const useStore = create(devtools(persist(store, { name: "store" })));