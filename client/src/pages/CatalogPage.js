import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  Link,
  MenuItem,
  Paper,
  Select,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import Page from "../components/common/Page";
import productsResource from "../helpers/api/products";
import categoriesResource from "../helpers/api/categories";
import basketsResource from "../helpers/api/baskets";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { currentUserState, isAuthenticatedState } from "../atoms/auth";
import { useNavigate } from "react-router-dom";
import { currentUserBasketState } from "../atoms/userBasket";

const Item = styled(Paper)(({ theme }) => ({
  elevation: 3,
  height: "100%",
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const sortingStates = [
  { id: 1, name: "По названию А-я" },
  { id: 2, name: "По названию Я-а" },
  { id: 3, name: "По возрастанию цены" },
  { id: 4, name: "По убыванию цены" },
];

export default function CatalogPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [inputText, setInputText] = useState("");
  const currentUser = useRecoilValue(currentUserState);
  const currentUserBasket = useRecoilValue(currentUserBasketState);
  const setCurrentUserBasket = useSetRecoilState(currentUserBasketState);
  const isAuthenticated = useRecoilValue(isAuthenticatedState);
  const [selectedSort, setSelectedSort] = useState(1);
  const navigate = useNavigate();

  useEffect(async () => {
    const [products, categories] = await Promise.all([
      productsResource.getAll(),
      categoriesResource.getAll(),
    ]);
    sortByAscendingName(products);
    setCategories(categories);
  }, []);

  const searchProducts = async (name) => {
    const res = await productsResource.getAll();
    sortByAscendingName(
      res.filter((p) => p.name.toLowerCase().includes(name.toLowerCase()))
    );
  };

  const filterProducts = async (cat) => {
    const res = await productsResource.getAll();
    sortByAscendingName(res.filter((p) => p.category.id === cat.id));
  };

  const clearInput = useCallback(async () => {
    setInputText("");
    const res = await productsResource.getAll();
    sortByAscendingName(res);
  }, []);

  const clearFilter = async () => {
    const res = await productsResource.getAll();
    sortByAscendingName(res);
  };

  const sortByAscendingName = async (products) => {
    setProducts(products.sort((a, b) => a.name.localeCompare(b.name)));
  };

  const handleSort = (e) => {
    const value = e.target.value;
    setSelectedSort(value);
    if (value === 3) {
      const res = products.sort((a, b) => a.price - b.price);
      setProducts(res);
    }
    if (value === 4) {
      const res = products.sort((a, b) => b.price - a.price);
      setProducts(res);
    }
    if (value === 1) {
      const res = products.sort((a, b) => a.name.localeCompare(b.name));
      setProducts(res);
    }
    if (value === 2) {
      const res = products.sort((a, b) => b.name.localeCompare(a.name));
      setProducts(res);
    }
  };

  const addToBasket = useCallback(async (productId) => {
    const res = await basketsResource.addToBasket({ productId, count: 1 });
    const basket = await basketsResource.getUserBasket();
    setCurrentUserBasket(basket);
    console.log(res);
  }, []);

  return (
    <Page title="Каталог">
      <Box p={3}>
        <Box
          sx={{
            mb: 3,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <MenuWrapper fullHeight xs={{ height: "100%" }}>
              <MenuItemsWrapper>
                {categories.map((cat, index) => (
                  <MenuItemBox key={index}>
                    <MenuButton
                      onClick={() => {
                        filterProducts(cat);
                      }}
                    >
                      {cat.name}
                    </MenuButton>
                  </MenuItemBox>
                ))}
                <MenuItemBox key="discard">
                  <MenuButton onClick={clearFilter}>Все</MenuButton>
                </MenuItemBox>
              </MenuItemsWrapper>
            </MenuWrapper>
          </Box>
          <Box style={{ justifyContent: "right" }}>
            <FormControl sx={{ mr: 1, width: 220 }}>
              <InputLabel>Сортировать</InputLabel>
              <Select
                value={selectedSort}
                onChange={handleSort}
                label="Сортировать"
              >
                {sortingStates.map((state) => (
                  <MenuItem key={state.id} value={state.id}>
                    {state.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
                      <ProductLink href={`/product/${product.id}`}>
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
                      </ProductLink>
                      {isAuthenticated && !currentUser.isAdmin && (
                        <Button
                          variant="outlined"
                          color="success"
                          disabled={currentUserBasket.some(
                            (basketItem) => basketItem.productId === product.id
                          )}
                          style={{
                            textTransform: "none",
                            fonUpperCase: "none",
                            marginTop: "1rem",
                          }}
                          onClick={() => addToBasket(product.id)}
                        >
                          Добавить в корзину
                        </Button>
                      )}
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

const ProductLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

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

const MenuItemBox = styled(Box)`
  padding: 4px 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
`;

const MenuItemsWrapper = styled(Box)`
  display: flex;
`;
