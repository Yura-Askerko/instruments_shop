import React from "react";
import {
  Avatar,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import { Box } from "@mui/system";

const ProductInfoForm = ({ data }) => {
  return (
    <Grid item xs={12} md={6}>
      <List>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Avatar
            alt={data.name}
            align="center"
            src={`http://localhost:5000/${data.photo}`}
            sx={{ height: "80px", width: "80px" }}
          />
        </Box>

        <ListItem divider>
          <BoldTypography>Название</BoldTypography>
          <ListItemText sx={{ ml: 2 }} primary={data.name} />
        </ListItem>

        <ListItem divider>
          <BoldTypography>Тип</BoldTypography>
          <ListItemText sx={{ ml: 2 }} primary={data.type.name} />
        </ListItem>

        <ListItem divider>
          <BoldTypography>Категория</BoldTypography>
          <ListItemText sx={{ ml: 2 }} primary={data.category.name} />
        </ListItem>

        <ListItem divider>
          <BoldTypography>Артикул</BoldTypography>
          <ListItemText sx={{ ml: 2 }} primary={data.article} />
        </ListItem>

        <ListItem divider>
          <BoldTypography>Цена</BoldTypography>
          <ListItemText sx={{ ml: 2 }} primary={data.price} />
        </ListItem>

        <ListItem divider>
          <BoldTypography>Описание</BoldTypography>
          <ListItemText sx={{ ml: 2 }} primary={data.description} />
        </ListItem>
      </List>
    </Grid>
  );
};

const BoldTypography = styled(Typography)`
  font-weight: bold;
  font-size: 1rem;
`;

export default ProductInfoForm;
