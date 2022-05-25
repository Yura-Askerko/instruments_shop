import React from "react";
import Box from "@mui/material/Box";
import styled from "@emotion/styled/macro";
import Page from "../components/common/Page";
import { Typography } from "@mui/material";

const MainPage = () => {
  return (
    <Page title="Главная">
      <MainBox>
        <Typography variant="h4">Главная страница</Typography>
        <Typography variant="h5">
          Автоматизированная система магазина "Перестройка"
        </Typography>
      </MainBox>
    </Page>
  );
};

const MainBox = styled(Box)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`;

export default MainPage;
