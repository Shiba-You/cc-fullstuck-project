import { Box, Flex, Container, Heading } from "@chakra-ui/react";
import React from "react";
import { FC } from "react";
import style from "./style.module.scss";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";

export const Header: FC = () => {
  const navigate = useNavigate();
  const backHome = () => {
    navigate("/list");
  };
  return (
    <Box px={4} className={clsx(style.header)}>
      <Container className={clsx(style.container)}>
        <Flex py="4" justifyContent="space-between" alignItems="center">
          <Heading fontSize="2xl" cursor="pointer" onClick={() => backHome()}>
            daiary
          </Heading>
        </Flex>
      </Container>
    </Box>
  );
};
