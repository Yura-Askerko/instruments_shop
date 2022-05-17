import FetchAPI from "./FetchAPI";

export const create = async (data) => {
  try {
    const res = await FetchAPI.post(`/category/`, data);
    console.log(res.data);
    return res.data;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const deleteById = async (id) => {
  try {
    const res = await FetchAPI.delete(`/category/${id}`);
    console.log(res.data);
    return res.data;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const update = async (id, data) => {
  try {
    const res = await FetchAPI.put(`/category/${id}`, data);
    console.log(res.data);
    return res.data;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const getAll = async () => {
  try {
    const res = await FetchAPI.get(`/category/`);
    console.log(res.data);
    return res.data;
  } catch (e) {
    console.error(e);
    return false;
  }
};

const categoriesResource = {
  getAll,
  create,
  deleteById,
  update,
};

export default categoriesResource;
