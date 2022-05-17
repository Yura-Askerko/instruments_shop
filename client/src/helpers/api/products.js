import FetchAPI from "./FetchAPI";

export const create = async (data) => {
  try {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("photo", data.selectedPhoto);
    formData.append("typeId", data.typeId);
    formData.append("categoryId", data.categoryId);
    formData.append("article", data.article);
    console.log(formData);
    const res = await FetchAPI.post(`/product/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(res.data);
    return res.data;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const getPhoto = async (name) => {
  try {
    const res = await FetchAPI.get(`/${name}`);
    console.log(res);
    return res.data;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const deleteById = async (id) => {
  try {
    const res = await FetchAPI.delete(`/product/${id}`);
    console.log(res.data);
    return res.data;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const update = async (id, data) => {
  try {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append(
      "photo",
      data.selectedPhoto !== "" ? data.selectedPhoto : null
    );
    formData.append("typeId", data.typeId);
    formData.append("categoryId", data.categoryId);
    formData.append("article", data.article);
    console.log(formData);
    const res = await FetchAPI.put(`/product/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(res.data);
    return res.data;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const getAll = async () => {
  try {
    const res = await FetchAPI.get(`/product/`);
    console.log(res.data);
    return res.data;
  } catch (e) {
    console.error(e);
    return false;
  }
};

const productsResource = {
  getAll,
  create,
  deleteById,
  update,
  getPhoto,
};

export default productsResource;
