import { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { isAuthenticatedState, currentUserState } from "../atoms/auth";
import authResource from "../helpers/api/auth";

const useSignUp = () => {
  const navigate = useNavigate();
  const setIsAuthenticated = useSetRecoilState(isAuthenticatedState);
  const setCurrentUserState = useSetRecoilState(currentUserState);

  const login = useCallback(
    async (data) => {
      const res = await authResource.register(data);
      if (res) {
        navigate("/signin");
      } else {
        alert("Register failed. ");
        setIsAuthenticated(null);
        setCurrentUserState(null);
      }
    },
    [navigate, setCurrentUserState, setIsAuthenticated]
  );

  return login;
};

export default useSignUp;
