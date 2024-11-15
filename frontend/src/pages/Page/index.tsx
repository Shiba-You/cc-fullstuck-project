import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  AspectRatio,
  Button,
  Grid,
  GridItem,
  Image,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { PageStoreType } from "../../types/pageStore";
import usePageStore from "../../store/pageStore";
import { useShallow } from "zustand/react/shallow";
import { PageType } from "../../types/page";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { dateToString } from "../../common/utils";

const selector = (state: PageStoreType) => ({
  getPageById: state.getPageById,
  savePage: state.savePage,
});

const Page = () => {
  const [page, setPage] = useState<PageType>({
    title: "",
    createAt: dateToString(new Date()),
    thumbnail: "",
    content: "",
  });
  const [isEdit, setIsEdit] = useState(false);
  const id = (useParams().id || 0) as number; //TODO: 何にも該当しないIDを定義する (今は0で仮置)
  const { getPageById, savePage } = usePageStore(useShallow(selector));

  useEffect(() => {
    (async () => {
      let fetchedPage;
      if (id) fetchedPage = (await getPageById(id)) as PageType;
      if (fetchedPage) setPage(fetchedPage);
    })();
  }, []);

  const editPage = (key: string, val: string | Date) => {
    if (page) {
      if (key == "createAt" && val instanceof Date) {
        val = dateToString(val);
      }
      const newPage = { ...page, [key]: val };
      setPage(newPage);
    }
  };

  const generateImage = async () => {
    const newImage = await fetch("http://localhost:3000/api/gpt", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({ content: page.content }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    const newPage = { ...page, thumbnail: newImage.url };
    setPage(newPage);
  };

  const toggleIsEdit = async () => {
    if (isEdit) setPage((await getPageById(id)) as PageType);
    setIsEdit((currentIsEdit) => !currentIsEdit);
  };

  const save = async () => {
    setPage((await savePage(page)) as PageType);
    setIsEdit(false);
  };

  return (
    <>
      <Grid w="100%" templateColumns="repeat(12, 1fr)" gap={4}>
        <GridItem colSpan={10}>
          <Input
            disabled={!isEdit}
            value={page.title}
            onChange={(e) => editPage("title", e.target.value)}
          />
        </GridItem>
        <GridItem colSpan={2}>
          <DatePicker
            disabled={!isEdit}
            selected={new Date(page.createAt)}
            onChange={(d) => editPage("createAt", d as Date)}
          />
        </GridItem>
      </Grid>
      <Grid>
        <GridItem colSpan={12} rowSpan={3}>
          <AspectRatio bg="bg.muted" ratio={2 / 1}>
            {page?.thumbnail ? (
              <Image src={page.thumbnail} />
            ) : (
              <Button disabled={!isEdit} onClick={() => generateImage()}>
                生成AIに絵を描いてもらう！
              </Button>
            )}
          </AspectRatio>
        </GridItem>
      </Grid>
      <Grid>
        <GridItem colSpan={12}>
          <Textarea
            disabled={!isEdit}
            value={page.content}
            onChange={(e) => editPage("content", e.target.value)}
            height={500}
          />
        </GridItem>
      </Grid>
      {isEdit ? (
        <>
          <Button onClick={() => toggleIsEdit()}>中止する</Button>
          <Button onClick={() => save()}>保存する</Button>
        </>
      ) : (
        <Button onClick={() => toggleIsEdit()}>編集する</Button>
      )}
    </>
  );
};

export default Page;
