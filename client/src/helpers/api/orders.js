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

const ordersResource = {
  getAll,
  getByDates,
};

export default ordersResource;
