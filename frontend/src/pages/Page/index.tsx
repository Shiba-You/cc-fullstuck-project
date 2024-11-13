import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Image, Text } from "@chakra-ui/react";
import { PageStoreType } from "../../types/pageStore";
import usePageStore from "../../store/pageStore";
import { useShallow } from "zustand/react/shallow";
import { PageType } from "../../types/page";

const selector = (state: PageStoreType) => ({
  getPageById: state.getPageById,
});

const Page = () => {
  const [page, setPage] = useState<PageType>();
  const params = useParams() as { id: string };
  const { getPageById } = usePageStore(useShallow(selector));

  useEffect(() => {
    setPage(getPageById(params.id));
  }, []);

  return (
    <>
      {page ? (
        <>
          <Text>{page.title}</Text>
          <Text>{page.timestamp}</Text>
          <Image src={page.thumbnail} />
          <Text>{page.content}</Text>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default Page;
