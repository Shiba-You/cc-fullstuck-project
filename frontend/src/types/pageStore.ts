import { PageType } from "./page";

export type PageStoreType = {
  pages: PageType[];
  setPages: (pages: PageType[]) => void;
  getPageById: (id: number) => Promise<PageType | Response>;
  getPages: () => Promise<PageType[] | Response>;
  savePage: (page: PageType) => Promise<PageType | Response>;
};
