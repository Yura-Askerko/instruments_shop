import { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { isAuthenticatedState, currentUserState } from "../atoms/auth";
import authResource from "../helpers/api/auth";

const useLogin = () => {
  const navigate = useNavigate();
  const setIsAuthenticated = useSetRecoilState(isAuthenticatedState);
  const setCurrentUserState = useSetRecoilState(currentUserState);

  const login = useCallback(
    async (username, password) => {
      const data = await authResource.login(username, password);
      if (data) {
        setIsAuthenticated(true);
        localStorage.setItem("token", data.token);
        setCurrentUserState({
          login: data.login,
          roleId: data.roleId,
          isAdmin: data.isAdmin,
        });
        navigate("/home");
      } else {
        alert("Login failed");
        setIsAuthenticated(null);
        setCurrentUserState(null);
      }
    },
    [navigate, setCurrentUserState, setIsAuthenticated]
  );

  return login;
};

export default useLogin;
