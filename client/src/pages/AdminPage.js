import React from "react";
import { Box, Button, Link, Typography } from "@mui/material";
import Page from "../components/common/Page";
import styled from "@emotion/styled/macro";

const AdminPage = () => {
  return (
    <Page title="Админ панель">
      <Box
        style={{
          paddingTop: "120px",
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <LinkBox>
          <LinkButton variant="outlined" href="/admin/types">
            Типы товаров
          </LinkButton>
        </LinkBox>
        <LinkBox>
          <LinkButton variant="outlined" href="/admin/categories">
            Категории товаров
          </LinkButton>
        </LinkBox>
        <LinkBox>
          <LinkButton variant="outlined" href="/admin/products">
            Товары
          </LinkButton>
        </LinkBox>
        <LinkBox>
          <LinkButton variant="outlined" href="/admin/orders">
            Заказы
          </LinkButton>
        </LinkBox>
        <LinkBox>
          <LinkButton variant="outlined" href="/admin/users">
            Пользователи
          </LinkButton>
        </LinkBox>
        <LinkBox>
          <LinkButton variant="outlined" href="/admin/reports">
            Отчеты
          </LinkButton>
        </LinkBox>
        <LinkBox>
          <LinkButton variant="outlined" href="/">
            Вернуться на сайт
          </LinkButton>
        </LinkBox>
      </Box>
    </Page>
  );
};

const LinkBox = styled(Box)`
  padding: 7px;
  width: 100%;
`;
const LinkButton = styled(Button)`
  width: 222px;
  height: 40px;
  border-radius: 7px;
  background-color: #b0c4de;
  color: #000;
  font-size: 14px;
  font-weight: bold;
  font-upercase: none;
  text-transform: none;
  font-family: "Roboto", sans-serif;
`;

export default AdminPage;
