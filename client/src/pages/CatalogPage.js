import {
  Box,
  Button,
  Grid,
  Paper,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Page from "../components/common/Page";
import productsResource from "../helpers/api/products";
import categoriesResource from "../helpers/api/categories";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

const Item = styled(Paper)(({ theme }) => ({
  elevation: 3,
  height: "100%",
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function CatalogPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await productsResource.getAll();
      setProducts(res);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await categoriesResource.getAll();
      setCategories(res);
    };
    fetchData();
  }, []);

  const searchProducts = async (name) => {
    const res = await productsResource.getAll();
    setProducts(
      res.filter((p) => p.name.toLowerCase().includes(name.toLowerCase()))
    );
  };

  const filterProducts = async (cat) => {
    const res = await productsResource.getAll();
    setProducts(res.filter((p) => p.category.id === cat.id));
  };

  const clearInput = async () => {
    setInputText("");
    const res = await productsResource.getAll();
    setProducts(res);
  };

  const clearFilter = async () => {
    const res = await productsResource.getAll();
    setProducts(res);
  };

  return (
    <Page title="Каталог">
      <Box p={3}>
        <Box
          mb={3}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <MenuWrapper fullHeight xs={{ height: "100%" }}>
              <MenuItemsWrapper>
                {categories.map((cat, index) => (
                  <MenuItem key={index}>
                    <MenuButton
                      onClick={() => {
                        filterProducts(cat);
                      }}
                    >
                      {cat.name}
                    </MenuButton>
                  </MenuItem>
                ))}
                <MenuItem key="discard">
                  <MenuButton onClick={clearFilter}>Все</MenuButton>
                </MenuItem>
              </MenuItemsWrapper>
            </MenuWrapper>
          </Box>
          <Box style={{ justifyContent: "right" }}>
            <TextField
              label="Поиск по названию"
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value);
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => searchProducts(inputText)}>
                      <SearchIcon />
                    </IconButton>
                    <IconButton onClick={clearInput}>
                      <CloseIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Box>
        <Box>
          <Grid container spacing={2} columns={{ xs: 1, sm: 8, md: 12 }}>
            {products.map((product, index) => {
              return (
                <Grid item xs={4} key={index}>
                  <Item>
                    <Box
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        height: "100%",
                      }}
                    >
                      <Box>
                        <Box
                          component="img"
                          sx={{
                            height: 200,
                          }}
                          src={`http://localhost:5000/${product.photo}`}
                        />
                        <Typography variant="h6">{product.name}</Typography>
                        <Typography variant="subtitle1">
                          {product.price} руб.
                        </Typography>
                      </Box>
                      <Button
                        variant="outlined"
                        color="success"
                        style={{
                          textTransform: "none",
                          fonUpperCase: "none",
                          marginTop: "1rem",
                        }}
                      >
                        Добавить в корзину
                      </Button>
                    </Box>
                  </Item>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Box>
    </Page>
  );
}

const MenuButton = styled(Button)`
  color: #000;
  text-decoration: none;
  cursor: pointer;
  text-transform: none;
  font-uppercase: none;
  font-weight: 300;
  &:hover {
    color: #2f4f4f;
  }
`;
const MenuWrapper = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
`;

const MenuItem = styled(Box)`
  padding: 4px 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
`;

const MenuItemsWrapper = styled(Box)`
  display: flex;
`;
