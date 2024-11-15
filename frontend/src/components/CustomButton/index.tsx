import { Button } from "@chakra-ui/react/button";
import React from "react";
import style from "./style.module.scss";
import clsx from "clsx";

type CustomButtonType = {
  text: string;
  onClick: any;
};

const CustomButton: React.FC<CustomButtonType> = ({ text, onClick }) => {
  return (
    <Button onClick={() => onClick()} className={clsx(style.CustomButton)}>
      {text}
    </Button>
  );
};

export default CustomButton;
