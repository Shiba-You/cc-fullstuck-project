import { create } from "zustand";
import { PageStoreType } from "../types/pageStore";

const usePageStore = create<PageStoreType>((set, get) => ({
  pages: [],
  setPages: (pages) => {
    set({ pages });
  },
  getPageById: (id) => {
    return get().pages.find((p) => p.id == Number(id));
  },
  getPages: (num) => {
    return get().pages.slice(0, num);
  },
}));

export default usePageStore;
