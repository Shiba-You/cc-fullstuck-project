import { create } from "zustand";
import { PageStoreType } from "../types/pageStore";
import { PageType } from "../types/page";

const usePageStore = create<PageStoreType>((set, get) => ({
  pages: [],
  setPages: (pages) => {
    set({ pages });
  },
  getPageById: async (id) => {
    let page = get().pages.find((p) => p.id == Number(id));
    if (page) {
      return page;
    } else {
      return (
        await fetch(`http://localhost:3000/api/pages/${id}`, {
          method: "GET",
          mode: "cors",
        }).then((res) => res.json())
      )[0];
    }
  },
  getPages: async () => {
    let pages = get().pages;
    if (pages.length) {
      return pages;
    } else {
      return await fetch("http://localhost:3000/api/pages", {
        method: "GET",
        mode: "cors",
      }).then((res) => res.json());
    }
  },
  savePage: async (page) => {
    let newPage: PageType;
    if (page.id) {
      newPage = await fetch(`http://localhost:3000/api/pages/${page.id}`, {
        method: "PUT",
        mode: "cors",
        body: JSON.stringify(page),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
      set({
        pages: get().pages.map((p) => {
          if (p.id == page.id) return page;
          else return p;
        }),
      });
    } else {
      newPage = await fetch("http://localhost:3000/api/pages", {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(page),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
      set({ pages: [...get().pages, newPage] });
    }
    return newPage;
  },
}));

export default usePageStore;
