import FetchAPI from "./FetchAPI";

export const create = async (data) => {
  try {
    const res = await FetchAPI.post(`/type/`, data);
    console.log(res.data);
    return res.data;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const deleteById = async (id) => {
  try {
    const res = await FetchAPI.delete(`/type/${id}`);
    console.log(res.data);
    return res.data;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const update = async (id, data) => {
  try {
    const res = await FetchAPI.put(`/type/${id}`, data);
    console.log(res.data);
    return res.data;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const getAll = async () => {
  try {
    const res = await FetchAPI.get(`/type/`);
    console.log(res.data);
    return res.data;
  } catch (e) {
    console.error(e);
    return false;
  }
};

const typesResource = {
  getAll,
  create,
  deleteById,
  update,
};

export default typesResource;
