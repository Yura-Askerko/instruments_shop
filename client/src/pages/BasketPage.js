import {
  Box,
  Button,
  Container,
  CssBaseline,
  IconButton,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { currentUserState, isAuthenticatedState } from "../atoms/auth";
import basketsResource from "../helpers/api/baskets";
import ordersResource from "../helpers/api/orders";
import DoneIcon from "@mui/icons-material/Done";
import Popup from "../components/controls/Popup";
import DeliveryForm from "../components/forms/DeliveryForm";
import { useNavigate } from "react-router-dom";
import { currentUserBasketState } from "../atoms/userBasket";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function BasketPage() {
  const [basket, setBasket] = useState([]);
  const currentUser = useRecoilValue(currentUserState);
  const currentUserBasket = useRecoilValue(currentUserBasketState);
  const setCurrentUserBasket = useSetRecoilState(currentUserBasketState);
  const isAuthenticated = useRecoilValue(isAuthenticatedState);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const res = await basketsResource.getUserBasket();
      setBasket(res);
    };
    fetchData();
  }, []);

  const makeOrder = useCallback(async () => {
    const res = await ordersResource.makeOrder();
    console.log(res);
    if (res) {
      alert("Заказ успешно создан. с Вами свяжется оператор");
      navigate("/");
      setCurrentUserBasket([]);
    }
  }, []);

  const makeOrderWithDelivery = useCallback(async (data) => {
    const res = await ordersResource.makeOrderWithDelivery(data);
    console.log(res);
    if (res) {
      alert("Заказ успешно создан. с Вами свяжется оператор");
      setIsPopupOpen(false);
      navigate("/");
      setCurrentUserBasket([]);
    }
  }, []);

  return (
    <Box m={3}>
      <Box>
        <Typography variant="h4" m={2}>
          Моя корзина
        </Typography>
      </Box>
      {basket.length !== 0 ? (
        <Box sx={{ display: "flex", flexDirection: "row", width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "60%",
            }}
          >
            {basket.map((item) => (
              <Box
                key={item.id}
                p={1}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottom: "1px solid #ccc",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                  p={1}
                >
                  <Box
                    component="img"
                    sx={{
                      borderRadius: "30%",
                      height: 150,
                    }}
                    src={`http://localhost:5000/${item.product.photo}`}
                  />
                  <Box ml={3}>
                    <Typography variant="h6">{item.product.name}</Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                    }}
                  >
                    <IconButton size="small">
                      <AddIcon />
                    </IconButton>
                    <Typography variant="h6" ml={1} mr={1} align="center">
                      {item.product.price}
                    </Typography>
                    <IconButton size="small">
                      <RemoveIcon />
                    </IconButton>
                  </Box>
                  <Box>
                    <IconButton>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
          <Box
            p={1}
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "40%",
              height: "auto",
              alignItems: "center",
              borderLeft: "1px solid #ccc",
            }}
          >
            <Typography variant="h5" style={{ fontWeight: "bold" }}>
              Ваш заказ
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
              }}
              mt={2}
            >
              <Typography variant="h6" ml={2}>
                Итого
              </Typography>
              <Typography variant="h6" mr={2}>
                {basket
                  .map((item) => parseFloat(item.product.price) * item.count)
                  .reduce(
                    (previousValue, currentValue) =>
                      previousValue + currentValue
                  )}
              </Typography>
            </Box>
            <Box mt={4}>
              <Box mb={3}>
                <Button variant="outlined" onClick={makeOrder}>
                  Оформить самовывоз
                </Button>
              </Box>
              <Box>
                <Button variant="outlined" onClick={() => setIsPopupOpen(true)}>
                  Оформить доставку
                </Button>
                <Typography variant="h6" mt={2}>
                  Стоимость доставки составляет 10 рублей.
                </Typography>
              </Box>
            </Box>
          </Box>
          <Popup
            title="Доставка"
            openPopup={isPopupOpen}
            setOpenPopup={setIsPopupOpen}
          >
            <DeliveryForm onSubmit={makeOrderWithDelivery} />
          </Popup>
        </Box>
      ) : (
        <Box>
          <Typography variant="h4">Корзина пуста</Typography>
          <Link href="/catalog">Вернуться в магазин</Link>
        </Box>
      )}
    </Box>
  );
}
