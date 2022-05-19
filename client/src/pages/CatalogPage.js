import { Box, Grid, Paper, styled, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Page from "../components/common/Page";
import productsResource from "../helpers/api/products";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function CatalogPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await productsResource.getAll();
      setProducts(res);
    };
  });

  return (
    <Page title="Каталог">
      <Grid container spacing={2}>
        {products.map((product, index) => {
          return (
            <Grid item xs={4} sm={2} md={1} key={index}>
              <Item theme="dark">
                <Box
                  component="img"
                  sx={{
                    height: 50,
                    mr: 2,
                  }}
                  src={`https://localhost:5000/${product.photo}`}
                />
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="subtitle1">
                  {product.price} руб.
                </Typography>
              </Item>
            </Grid>
          );
        })}
      </Grid>
    </Page>
  );
}
