import React, { useCallback, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import styled from "@emotion/styled/macro";
import { DataGrid } from "@mui/x-data-grid";
import productsResource from "../helpers/api/products";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { Button, IconButton, Link, Stack, Typography } from "@mui/material";
import TypeForm from "../components/forms/TypeForm";
import Popup from "../components/controls/Popup";
import { blue, cyan, orange, red } from "@mui/material/colors";
import Page from "../components/common/Page";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import CategoryForm from "../components/forms/CategoryForm";
import ProductForm from "../components/forms/ProductForm";
import Avatar from "@mui/material/Avatar";
import { withStyles } from "@mui/styles";
import InfoIcon from "@mui/icons-material/Info";
import ProductInfoForm from "../components/forms/ProductInfoForm";

const initialValues = {
  id: 0,
  name: "",
  article: "",
  price: 0,
  type: { id: 0, name: "" },
  category: { id: 0, name: "" },
  photo: "",
};

const ProductPage = () => {
  const [pageSize, setPageSize] = useState(10);
  const [records, setRecords] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(initialValues);

  const [infoPopup, setInfoPopup] = useState(false);
  const [recordForInfo, setRecordForInfo] = useState(initialValues);

  const deleteRecord = useCallback(
    async (deleteId) => {
      await productsResource.deleteById(deleteId);
      setRecords(records.filter(({ id }) => id !== deleteId));
    },
    [records]
  );

  const columns = [
    { field: "id", headerName: "#", width: 100 },
    {
      field: "photo",
      headerName: "Фото",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Avatar
          alt={params.row.name}
          src={`http://localhost:5000/${params.row.photo}`}
          sx={{ height: "80px", width: "80px" }}
        />
      ),
    },
    { field: "name", headerName: "Название", flex: 1 },
    {
      field: "type",
      headerName: "Тип",
      flex: 1,
      renderCell: (params) => <span>{params.row.type?.name}</span>,
    },
    { field: "price", headerName: "Стоимость", flex: 1 },
    {
      field: "action",
      headerName: "Действия",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <IconButton
            size="large"
            onClick={() => {
              console.log(params.row);
              setRecordForEdit(params.row);
              setOpenPopup(true);
            }}
          >
            <EditIcon sx={{ color: cyan[200] }} />
          </IconButton>
          <IconButton
            size="large"
            onClick={() => {
              setRecordForInfo(params.row);
              setInfoPopup(true);
            }}
          >
            <InfoIcon sx={{ color: cyan[200] }} />
          </IconButton>
          <IconButton
            size="large"
            onClick={() => {
              deleteRecord(params.row.id);
            }}
          >
            <DeleteForeverIcon sx={{ color: cyan[200] }} />
          </IconButton>
        </Stack>
      ),
    },
  ];

  const addOrEdit = useCallback(async (data) => {
    console.log(data);
    if (data.id !== 0) {
      await productsResource.update(data.id, data);
    } else {
      await productsResource.create(data);
    }
    setOpenPopup(false);
    setRecordForEdit(initialValues);
    const res = await productsResource.getAll();
    setRecords(res);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await productsResource.getAll();
      setRecords(res);
    };
    fetchData();
  }, []);

  return (
    <Page title="Товары">
      <Box
        sx={{
          display: "flex",
          padding: 3,
          flexDirection: "column",
          justifyContent: "right",
        }}
      >
        <Typography variant="h6">Товары</Typography>
        <Box
          sx={{
            display: "flex",
            marginRight: 4,
            marginLeft: 4,
            flexDirection: "center",
            justifyContent: "space-between",
          }}
        >
          <Button
            variant="outlined"
            href="/admin"
            startIcon={<ArrowBackIcon />}
            sx={{ marginBottom: "1rem", fontUppercase: "none" }}
          >
            <Typography sx={{ fontSize: "13px", color: blue[500] }}>
              Назад
            </Typography>
          </Button>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            sx={{ marginBottom: "1rem" }}
            onClick={() => {
              setRecordForEdit(initialValues);
              setOpenPopup(true);
            }}
          >
            <Typography sx={{ fontSize: "13px", color: blue[500] }}>
              Создать
            </Typography>
          </Button>
        </Box>
        <Box style={{ flexGrow: 1 }}>
          <DataGrid
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 20]}
            pagination
            rowHeight={90}
            autoHeight
            disableSelectionOnClick
            rows={records}
            columns={columns}
          />
        </Box>
      </Box>
      <Popup title="Товар" openPopup={openPopup} setOpenPopup={setOpenPopup}>
        <ProductForm data={recordForEdit} onSubmit={addOrEdit} />
      </Popup>
      <Popup
        title="Информация о товаре"
        openPopup={infoPopup}
        setOpenPopup={setInfoPopup}
      >
        <ProductInfoForm data={recordForInfo} />
      </Popup>
    </Page>
  );
};

const StyledDataGrid = withStyles({
  root: {
    "& .MuiDataGrid-renderingZone": {
      maxHeight: "none !important",
    },
    "& .MuiDataGrid-cell": {
      lineHeight: "unset !important",
      maxHeight: "none !important",
      whiteSpace: "normal",
    },
    "& .MuiDataGrid-row": {
      maxHeight: "none !important",
    },
  },
})(DataGrid);

const MainBox = styled(Box)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`;

export default ProductPage;
