import React, { useCallback, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import styled from "@emotion/styled/macro";
import { DataGrid } from "@mui/x-data-grid";
import ordersResource from "../helpers/api/orders";
import { Button, IconButton, Typography } from "@mui/material";
import Popup from "../components/controls/Popup";
import { blue, cyan } from "@mui/material/colors";
import Page from "../components/common/Page";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BasketForm from "../components/forms/BasketForm";

const OrderPage = () => {
  const [pageSize, setPageSize] = useState(10);
  const [records, setRecords] = useState([]);
  const [basketPopup, setBasketPopup] = useState(false);
  const [basket, setBasket] = useState([]);

  const columns = [
    { field: "id", headerName: "#", width: 100 },
    { field: "date", headerName: "Дата", flex: 1 },
    { field: "cost", headerName: "Цена", flex: 1 },
    {
      field: "user",
      headerName: "Пользователь",
      flex: 1,
      renderCell: (params) => <span>{params.row.basket.user.fullName}</span>,
    },
    {
      field: "basket",
      headerName: "Корзина",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <IconButton
          size="large"
          onClick={() => {
            setBasket(params.row.basket);
            setBasketPopup(true);
          }}
        >
          <ShoppingCartIcon sx={{ color: cyan[200] }} />
        </IconButton>
      ),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const res = await ordersResource.getAll();
      setRecords(res);
      console.log(res);
    };
    fetchData();
  }, []);

  return (
    <Page title="Заказы">
      <Box
        sx={{
          display: "flex",
          padding: 3,
          flexDirection: "column",
          justifyContent: "right",
        }}
      >
        <Typography variant="h6">Заказы</Typography>
        <Box
          sx={{
            display: "flex",
            margin: 3,
            flexDirection: "column",
            justifyContent: "right",
          }}
        >
          <Button
            variant="outlined"
            href="/admin"
            startIcon={<ArrowBackIcon />}
            sx={{ marginBottom: "1rem", fontUppercase: "none", width: "100px" }}
          >
            <Typography sx={{ fontSize: "13px", color: blue[500] }}>
              Назад
            </Typography>
          </Button>
        </Box>

        <DataGrid
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20]}
          pagination
          autoHeight
          disableSelectionOnClick
          rows={records}
          columns={columns}
        />

        <Popup
          title="Корзина заказа"
          openPopup={basketPopup}
          setOpenPopup={setBasketPopup}
        >
          {basketPopup && <BasketForm data={basket} />}
        </Popup>
      </Box>
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

export default OrderPage;
