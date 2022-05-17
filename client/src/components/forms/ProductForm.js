import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Avatar,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  styled,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import DoneIcon from "@mui/icons-material/Done";
import categoriesResource from "../../helpers/api/categories";
import typesResource from "../../helpers/api/types";

const ProductForm = ({ data, onSubmit }) => {
  const [selectedPhoto, setSelectedPhoto] = useState("");
  const [showPhoto, setShowPhoto] = useState("");
  const [types, setTypes] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await categoriesResource.getAll();
      setCategories(res);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await typesResource.getAll();
      setTypes(res);
    };
    fetchData();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: data,
  });

  const doubleRegex = useMemo(
    () => /^(?!0*[.]0*$|[.]0*$|0*$)\d+[.]?\d{0,2}$/,
    []
  );

  const registerDoubleField = useCallback(
    (...props) => {
      const { onChange, ...rest } = register(...props);
      const customOnChange = (e) => {
        e.persist();
        if (!doubleRegex.test(e.target.value)) {
          e.target.value = e.target.value.slice(0, -1);
        }
        onChange(e);
      };

      return { onChange: customOnChange, ...rest };
    },
    [register, doubleRegex]
  );

  const handleCapture = ({ target }) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(target.files[0]);
    fileReader.onload = (e) => {
      setShowPhoto(e.target.result);
    };
  };

  return (
    <form
      onSubmit={handleSubmit((e) => {
        data.photo == "" && selectedPhoto == ""
          ? alert("Выберите фото")
          : onSubmit({ ...e, selectedPhoto });
      })}
    >
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
            <Stack direction="row" alignItems="center" spacing={4}>
              <Avatar
                src={
                  showPhoto !== ""
                    ? showPhoto
                    : `http://localhost:5000/${data.photo}`
                }
                sx={{ height: "80px", width: "80px" }}
              />
              <label htmlFor="contained-button-file">
                <Input
                  accept="image/*"
                  id="contained-button-file"
                  type="file"
                  onChange={(e) => {
                    setSelectedPhoto(e.target.files[0]);
                    handleCapture(e);
                  }}
                />
                <Button variant="contained" component="span">
                  Upload
                </Button>
              </label>
            </Stack>
            <TextField
              {...register("name", {
                required: true,
                minLength: 4,
                maxLength: 128,
              })}
              error={!!errors.name}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Название товара"
              name="name"
              autoFocus
            />
            <TextField
              {...register("article", {
                required: true,
                minLength: 4,
                maxLength: 128,
              })}
              error={!!errors.article}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="article"
              label="Артикул"
              name="article"
              autoFocus
            />
            <TextField
              {...register("description", {
                required: true,
                maxLength: 1000,
              })}
              error={!!errors.description}
              variant="outlined"
              margin="normal"
              required
              multiline
              fullWidth
              id="description"
              label="Описание"
              name="description"
              autoFocus
            />
            <TextField
              {...registerDoubleField(`price`, {
                required: true,
                min: 1,
                max: 9999,
              })}
              variant="outlined"
              margin="normal"
              required
              multiline
              fullWidth
              id="price"
              label="Стоимость"
              name="price"
              autoFocus
            />
            <FormControl fullWidth margin="normal" required>
              <InputLabel>Тип товара</InputLabel>
              <Select
                label="Тип товара"
                {...register("typeId", {
                  required: true,
                  min: 1,
                })}
                defaultValue={data.type.id}
              >
                {types.map((type) => (
                  <MenuItem key={type.id} value={type.id}>
                    {type.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal" required>
              <InputLabel>Категория товара</InputLabel>
              <Select
                label="Категория товара"
                {...register("categoryId", {
                  required: true,
                  min: 1,
                })}
                defaultValue={data.category.id}
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Button startIcon={<DoneIcon />} type="submit" variant="outlined">
            {data.id === 0 ? "Создать" : "Изменить"}
          </Button>
        </Box>
      </Container>
    </form>
  );
};

const Input = styled("input")({
  display: "none",
});

export default ProductForm;
