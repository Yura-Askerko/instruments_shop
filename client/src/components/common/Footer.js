import styled from "styled-components";
import React from "react";
import { Box, Link, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Container>
      <Box>
        <Typography>
          Автоматизированная система магазина "Перестройка"
        </Typography>
        <Copyright />
        <Typography>Аскерко Юрий</Typography>
      </Box>
    </Container>
  );
};

function Copyright() {
  return (
    <Typography variant="body2" color="primary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://vk.com/y.askerko">
        Контакты
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  bottom: 0;
  width: 100%;
  height: 90px;
  margin: 0 auto;
  background-color: #f5f5f5;
`;

export default Footer;
