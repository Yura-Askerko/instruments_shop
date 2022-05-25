import { Box, Button, Paper, Stack, styled, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import productsResource from "../helpers/api/products";
import { useRecoilValue } from "recoil";
import { currentUserState, isAuthenticatedState } from "../atoms/auth";
import basketsResource from "../helpers/api/baskets";

export default function ProductInfoPage() {
  const [product, setProduct] = useState(null);
  const currentUser = useRecoilValue(currentUserState);
  const isAuthenticated = useRecoilValue(isAuthenticatedState);
  let { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const res = await productsResource.getById(id);
      console.log(id);
      console.log(res);
      setProduct(res);
    };
    fetchData();
  }, []);

  const addToBasket = async () => {
    const res = await basketsResource.addToBasket({ productId: id, count: 1 });
  };

  return (
    <Box m={3}>
      {product && (
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Box
            component="img"
            sx={{
              height: 400,
            }}
            style={{ borderRadius: "10px" }}
            src={`http://localhost:5000/${product.photo}`}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <Typography variant="h4">{product.name}</Typography>
            <Stack spacing={2} direction="column" alignContent="left" m={2}>
              <Item>
                <Typography variant="h6">Тип:</Typography>
                <Typography variant="h6" ml={2}>
                  {product.type.name}
                </Typography>
              </Item>
              <Item>
                <Typography variant="h6">Категория:</Typography>
                <Typography variant="h6" ml={2}>
                  {product.category.name}
                </Typography>
              </Item>
              <Item>
                <Typography variant="h6">Описание:</Typography>
                <Typography variant="h6" ml={2} paragraph>
                  {product.description}
                </Typography>
              </Item>
              <Item>
                <Typography variant="h6">Цена:</Typography>
                <Typography variant="h6" ml={2}>
                  {product.price}
                </Typography>
              </Item>
            </Stack>
          </Box>
        </Box>
      )}
      {isAuthenticated && !currentUser.isAdmin && (
        <Button
          variant="outlined"
          color="success"
          onClick={addToBasket}
          style={{
            textTransform: "none",
            fonUpperCase: "none",
            marginTop: "1rem",
          }}
        >
          Добавить в корзину
        </Button>
      )}
    </Box>
  );
}

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  display: "flex",
  flexDirection: "row",
  textAlign: "left",
  color: theme.palette.text.secondary,
}));
