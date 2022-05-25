import FetchAPI from "./FetchAPI";

export const getAll = async () => {
  try {
    const res = await FetchAPI.get(`/order/`);
    return res.data;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const getByDates = async (startDate, endDate) => {
  try {
    const res = await FetchAPI.get(`/order/byDates`, {
      params: { startDate: startDate, endDate: endDate },
    });
    return res.data;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const makeOrder = async () => {
  try {
    const res = await FetchAPI.post(`/order/`);
    return res.data;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const makeOrderWithDelivery = async (data) => {
  try {
    let res = await FetchAPI.post(`/order/`);
    if (res) {
      res = await FetchAPI.post(`/delivery/`, {
        address: data.address,
        price: 100,
        orderId: res.data.id,
      });
    }
    return res.data;
  } catch (e) {
    console.error(e);
    return false;
  }
};

const ordersResource = {
  getAll,
  getByDates,
  makeOrder,
  makeOrderWithDelivery,
};

export default ordersResource;
