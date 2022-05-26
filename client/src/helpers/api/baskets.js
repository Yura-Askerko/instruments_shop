import FetchAPI from "./FetchAPI";

export const getUserBasket = async () => {
  try {
    const res = await FetchAPI.get(`/basket`);
    console.log(res.data);
    return res.data;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const addToBasket = async (data) => {
  try {
    const res = await FetchAPI.post(`/basket`, data);
    console.log(res.data);
    return res.data;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const update = async (data) => {
  try {
    const res = await FetchAPI.put(`/basket`, data);
    console.log(res.data);
    return res.data;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const deleteFromBasket = async (productId) => {
  try {
    const res = await FetchAPI.delete(`/basket/${productId}`);
    console.log(res.data);
    return res.data;
  } catch (e) {
    console.error(e);
    return false;
  }
};

const basketsResource = {
  getUserBasket,
  addToBasket,
  update,
  deleteFromBasket,
};

export default basketsResource;
