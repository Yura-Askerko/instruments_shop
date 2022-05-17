import FetchAPI from "./FetchAPI";

export const getAll = async () => {
  try {
    const res = await FetchAPI.get(`/admin/user`);
    return res.data;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const deleteById = async (id) => {
  try {
    const res = await FetchAPI.delete(`/admin/user/${id}`);
    return res.data;
  } catch (e) {
    console.error(e);
    return e;
  }
};

export const create = async (data) => {
  try {
    const res = await FetchAPI.post(`/admin/user`, data);
    return res.data;
  } catch (e) {
    return e.response;
  }
};

export const getRoles = async () => {
  try {
    const res = await FetchAPI.get(`/role`);
    return res.data;
  } catch (e) {
    console.error(e);
    return e;
  }
};

const usersResource = {
  getAll,
  deleteById,
  create,
  getRoles,
};

export default usersResource;
