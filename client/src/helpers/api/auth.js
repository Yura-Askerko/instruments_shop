import FetchAPI from "./FetchAPI";

export const checkAuth = async () => {
  try {
    const res = await FetchAPI.get(`/auth`);
    console.log(res.data);
    return res.data;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const fetchCurrentUser = async () => {
  try {
    const res = await FetchAPI.get(`/auth/currentUser`);
    return res.data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const login = async (username, password) => {
  try {
    const res = await FetchAPI.post(`/auth/signin`, {
      login: username,
      password,
    });
    return res.data;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const logout = async () => {
  try {
    await FetchAPI.post(`/auth/signout`);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const register = async (data) => {
  try {
    await FetchAPI.post(`/auth/signup`, data);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

const authResource = {
  login,
  logout,
  checkAuth,
  register,
};

export default authResource;
