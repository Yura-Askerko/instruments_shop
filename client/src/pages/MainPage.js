import React from "react";
import Box from "@mui/material/Box";
import styled from "@emotion/styled/macro";
import Page from "../components/common/Page";
import { Typography } from "@mui/material";
import backgroundImage from "../assets/back.jpg";

const MainPage = () => {
  return (
    <Page title="Главная">
      <MainBox>
        <Typography
          style={{ color: "#fff", backgroundColor: "#000" }}
          variant="h4"
        >
          Главная страница
        </Typography>
        <Typography
          variant="h5"
          style={{ color: "#fff", backgroundColor: "#000" }}
        >
          Автоматизированная система магазина "Перестройка"
        </Typography>
      </MainBox>
    </Page>
  );
};

const MainBox = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 158.5px);
  background-image: url(${backgroundImage});
`;

export default MainPage;
