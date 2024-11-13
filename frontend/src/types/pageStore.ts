import { PageType } from "./page";

export type PageStoreType = {
  pages: PageType[];
  setPages: (pages: PageType[]) => void;
  getPageById: (id: string) => PageType | undefined;
  getPages: (num: number) => void;
};
