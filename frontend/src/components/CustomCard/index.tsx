import React from "react";
import { Card, Image, Text } from "@chakra-ui/react";
import { PageType } from "../../types/page";
import { useNavigate } from "react-router-dom";
import style from "./style.module.scss";
import clsx from "clsx";

interface CustomCardProps {
  page: PageType;
}

const CustomCard: React.FC<CustomCardProps> = ({ page }) => {
  const navigate = useNavigate();
  const openPage = (id: number | undefined) => {
    navigate(`/page/${id}`);
  };
  return (
    <Card.Root
      maxW={"md"}
      onClick={() => openPage(page.id)}
      className={clsx(style.Card)}
    >
      <Card.Header>
        <Text>{page.title}</Text>
        <Text>{page.createAt}</Text>
      </Card.Header>
      <Image src={page.thumbnail} />
      <Card.Body>
        <Text>{page.content}</Text>
      </Card.Body>
    </Card.Root>
  );
};

export default CustomCard;
