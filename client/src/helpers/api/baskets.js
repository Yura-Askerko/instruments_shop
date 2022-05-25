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

const basketsResource = {
  getUserBasket,
  addToBasket,
};

export default basketsResource;
