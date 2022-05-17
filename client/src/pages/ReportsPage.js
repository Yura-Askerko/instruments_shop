import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled/macro";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Button, TextField } from "@mui/material";
import ordersResource from "../helpers/api/orders";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import Page from "../components/common/Page";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { blue } from "@mui/material/colors";

const ReportsPage = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleStartDateChange = (newValue) => {
    setStartDate(newValue);
    console.log(startDate);
  };
  const handleEndDateChange = (newValue) => {
    setEndDate(newValue);
  };

  const generateReport = async () => {
    if (!startDate || !endDate) {
      alert("Выберите даты");
    } else {
      if (startDate >= endDate) {
        alert("Начальная дата должна быть меньше конечной");
      } else {
        const data = await ordersResource.getByDates(
          new Date(startDate),
          new Date(endDate)
        );

        if (!data) {
          alert("Нет данных по выбранной дате");
        } else {
          const fileType =
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
          const fileExtension = ".xlsx";
          const newData = data.map((item) => {
            console.log(item);
            return {
              "Номер заказа": item.id,
              "Дата заказа": item.date,
              Пользователь: item.basket.user.fullName,
              Телефон: item.basket.user.phone,
              Товары: item.basket.basket_products
                .map((i) => {
                  return `Название: ${i.product.name}; Количество: ${i.count}; Цена: ${i.product.price}`;
                })
                .join("\n"),
            };
          });
          const ws = XLSX.utils.json_to_sheet(newData);
          const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
          const excelBuffer = XLSX.write(wb, {
            bookType: "xlsx",
            type: "array",
          });
          const dt = new Blob([excelBuffer], { type: fileType });
          FileSaver.saveAs(
            dt,
            `Отчет_Заказы_${startDate.getDay() + 1}-${startDate.getMonth()}_${
              endDate.getDay() + 1
            }-${endDate.getMonth()}` + fileExtension
          );
        }
      }
    }
  };
  return (
    <Page title="Отчеты">
      <MainBox>
        <Button
          variant="outlined"
          href="/admin"
          startIcon={<ArrowBackIcon />}
          sx={{
            marginBottom: "1rem",
            marginTop: "1rem",
            fontUppercase: "none",
          }}
        >
          <Typography sx={{ fontSize: "13px", color: blue[500] }}>
            Назад
          </Typography>
        </Button>
        <Typography>Отчеты по выполненным заказам</Typography>
        <Typography>
          Для генерации отчета необходимо выбрать даты и нажать на кнопку
          сгенерировать.
        </Typography>
        <Box
          style={{
            marginTop: "40px",
            width: "60%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label="Дата начала"
              inputFormat="dd/MM/yyyy"
              value={startDate}
              onChange={handleStartDateChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label="Дата окончания"
              inputFormat="dd/MM/yyyy"
              value={endDate}
              onChange={handleEndDateChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Box>
        <Button
          style={{ marginTop: "40px" }}
          onClick={() => generateReport()}
          variant="outlined"
        >
          Сгенерировать
        </Button>
      </MainBox>
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

export default ReportsPage;
