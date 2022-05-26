import React, { useCallback, useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import styled from "@emotion/styled/macro";
import { DataGrid } from "@mui/x-data-grid";
import usersResource from "../helpers/api/users";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Button, IconButton, Stack, Typography } from "@mui/material";
import { blue, cyan, orange, red } from "@mui/material/colors";
import Page from "../components/common/Page";
import Popup from "../components/controls/Popup";
import UserForm from "../components/forms/UserForm";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const initialValues = {
  id: 0,
  fullName: "",
  email: "",
  login: "",
  phone: "",
  password: "",
  role: { id: 0, name: "" },
};

const UserPage = () => {
  const [pageSize, setPageSize] = useState(10);
  const [records, setRecords] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(initialValues);

  const deleteRecord = useCallback(async (deleteId) => {
    const res = await usersResource.deleteById(deleteId);
    setRecords(records.filter(({ id }) => id !== deleteId));
  }, []);

  const columns = useMemo(
    () => [
      { field: "id", headerName: "#", width: 100 },
      { field: "fullName", headerName: "ФИО", flex: 1 },
      { field: "email", headerName: "Email", flex: 1 },
      { field: "login", headerName: "Username", flex: 1 },
      {
        field: "role",
        headerName: "Роль",
        flex: 1,
        renderCell: (params) => <span>{params.row.role.name}</span>,
      },
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
                deleteRecord(params.row.id);
              }}
            >
              <DeleteForeverIcon sx={{ color: cyan[200] }} />
            </IconButton>
          </Stack>
        ),
      },
    ],
    []
  );

  const addOrEdit = useCallback(async (data) => {
    const res = await usersResource.create(data);
    if (res.status === 400) {
      alert("Пользователь уже существует");
    } else {
      setOpenPopup(false);
      setRecordForEdit(initialValues);
      const res = await usersResource.getAll();
      setRecords(res);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await usersResource.getAll();
      setRecords(res);
    };
    fetchData();
  }, []);

  return (
    <Page title="Пользователи">
      <Typography variant="h6" sx={{ paddingTop: 2 }}>
        Пользователи
      </Typography>
      <Box
        sx={{
          display: "flex",
          margin: 3,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            marginRight: 3,
            marginLeft: 3,
            flexDirection: "row",
            justifyContent: "space-between",
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

          <Button
            variant="contained"
            color="action"
            sx={{ marginBottom: "1rem", fontUppercase: "none", width: "100px" }}
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
      </Box>
      <Box height="100%">
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
        title="Пользователь"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        {openPopup && <UserForm data={recordForEdit} onSubmit={addOrEdit} />}
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

export default UserPage;
