import React from "react";
import { Grid, List, ListItem, ListItemText, Typography } from "@mui/material";
import styled from "@emotion/styled";

const BasketForm = ({ data }) => {
  return (
    <Grid item xs={12} md={6}>
      <List>
        <BoldTypography sx={{ marginTop: 2 }} align="center">
          Товары
        </BoldTypography>
        {data.basket_products.map((bask) => (
          <ListItem divider key={bask.product.id}>
            <ListItemText
              sx={{ ml: 2 }}
              primary={bask.product.name}
              secondary={`Количество: ${bask.count}; Цена: ${bask.product.price}`}
            />
          </ListItem>
        ))}
      </List>
    </Grid>
  );
};

const BoldTypography = styled(Typography)`
  font-weight: bold;
  font-size: 1rem;
`;

export default BasketForm;
