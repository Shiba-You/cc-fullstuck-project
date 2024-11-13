import React, { useEffect, useState } from "react";
import { Grid, GridItem, Text } from "@chakra-ui/react";
import CustomCard from "../../components/CustomCard";
import usePageStore from "../../store/pageStore";
import { PageStoreType } from "../../types/pageStore";
import { useShallow } from "zustand/react/shallow";

const selector = (state: PageStoreType) => ({
  pages: state.pages,
  setPages: state.setPages,
});

const PageList = () => {
  const { pages, setPages } = usePageStore(useShallow(selector));

  useEffect(() => {
    setPages([
      {
        id: 1,
        title: "test title 1",
        timestamp: "2024/11/13",
        thumbnail:
          "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
        content: "test content",
      },
      {
        id: 2,
        title: "test title 2",
        timestamp: "2024/11/13",
        thumbnail:
          "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
        content: "test content",
      },
      {
        id: 3,
        title: "test title 3",
        timestamp: "2024/11/13",
        thumbnail:
          "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
        content: "test content",
      },
    ]);
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
    </>
  );
};

export default PageList;
