import React, { useEffect, useState } from "react";
import { Grid, GridItem, Text } from "@chakra-ui/react";
import CustomCard from "../../components/CustomCard";
import usePageStore from "../../store/pageStore";
import { PageStoreType } from "../../types/pageStore";
import { useShallow } from "zustand/react/shallow";
import { PageType } from "../../types/page";
import HoverButton from "../../components/HoverButton";

const selector = (state: PageStoreType) => ({
  pages: state.pages,
  setPages: state.setPages,
  getPages: state.getPages,
});

const PageList = () => {
  const { pages, setPages, getPages } = usePageStore(useShallow(selector));

  useEffect(() => {
    (async () => {
      setPages((await getPages()) as PageType[]);
    })();
  }, []);

  return (
    <>
      {pages.length ? (
        <Grid w="100%" templateColumns="repeat(12, 1fr)" gap={4}>
          {pages.map((page) => (
            <GridItem key={page.id} rowSpan={6} colSpan={6}>
              <CustomCard page={page} />
            </GridItem>
          ))}
        </Grid>
      ) : (
        <Text>日記がまだありません。</Text>
      )}
      <HoverButton />
    </>
  );
};

export default PageList;
