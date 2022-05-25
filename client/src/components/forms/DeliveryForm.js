import React from "react";
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";

const defaultValues = {
  address: "",
};
const DeliveryForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
  });
  return (
    <form onSubmit={handleSubmit((d) => onSubmit?.(d))}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          style={{ width: "100%" }}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          pb={2}
        >
          <Box
            style={{ width: "100%" }}
            display="flex"
            flexDirection="column"
            alignContent="center"
            pb={2}
          >
            <TextField
              {...register("address", {
                required: true,
                minLength: 4,
                maxLength: 128,
              })}
              error={!!errors.address}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="address"
              label="Адрес"
              name="address"
              autoFocus
            />
          </Box>
          <Button type="submit" variant="outlined">
            Оформить заказ
          </Button>
        </Box>
      </Container>
    </form>
  );
};

export default DeliveryForm;
