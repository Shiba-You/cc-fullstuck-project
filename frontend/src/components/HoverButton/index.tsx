import React from "react";
import { IconButton, Text } from "@chakra-ui/react";
import style from "./style.module.scss";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";

const HoverButton = () => {
  const navigate = useNavigate();
  const goCreatePage = () => {
    navigate("/page/");
  };
  return (
    <IconButton
      className={clsx(style.IconButton)}
      onClick={() => goCreatePage()}
    >
      <Text className={clsx(style.Text)}>+</Text>
    </IconButton>
  );
};

export default HoverButton;
