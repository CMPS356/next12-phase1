import create from 'zustand'
import { persist } from "zustand/middleware";

const store = (set) => ({
    userContext: {},

    setUserContext: (user) => set({ userContext : user })
  })

export const useLoginStore = create(persist(store, { name: "store" , getStorage: () => sessionStorage }));

