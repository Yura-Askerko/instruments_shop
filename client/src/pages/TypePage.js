import React, { useCallback, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import styled from "@emotion/styled/macro";
import { DataGrid } from "@mui/x-data-grid";
import typesResource from "../helpers/api/types";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { Button, IconButton, Link, Stack, Typography } from "@mui/material";
import TypeForm from "../components/forms/TypeForm";
import Popup from "../components/controls/Popup";
import { blue, cyan, orange, red } from "@mui/material/colors";
import Page from "../components/common/Page";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";

const initialValues = {
  id: 0,
  name: "",
};

const TypePage = () => {
  const [pageSize, setPageSize] = useState(10);
  const [records, setRecords] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(initialValues);

  const deleteRecord = useCallback(
    async (deleteId) => {
      await typesResource.deleteById(deleteId);
      setRecords(records.filter(({ id }) => id !== deleteId));
    },
    [records]
  );

  const columns = [
    { field: "id", headerName: "#", width: 100 },
    { field: "name", headerName: "Название", flex: 1 },
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
    if (data.id !== 0) {
      await typesResource.update(data.id, data);
    } else {
      await typesResource.create(data);
    }
    setOpenPopup(false);
    setRecordForEdit(initialValues);
    const res = await typesResource.getAll();
    setRecords(res);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await typesResource.getAll();
      setRecords(res);
    };
    fetchData();
  }, []);

  return (
    <Page title="Типы товаров">
      <Box
        sx={{
          display: "flex",
          padding: 3,
          flexDirection: "column",
          justifyContent: "right",
        }}
      >
        <Typography variant="h6">Типы товаров</Typography>
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
      </Box>
      <Popup
        title="Тип товара"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <TypeForm data={recordForEdit} onSubmit={addOrEdit} />
      </Popup>
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

export default TypePage;
