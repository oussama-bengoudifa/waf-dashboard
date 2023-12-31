import { useState, useEffect } from "react";

//store
import { useAuthStore } from "../store";

//jwt
import jwt from "jwt-decode";

//services
import { refreshToken } from "../services";

export const useAuth = () => {
  const { user, updateToken, logoutUser } = useAuthStore((state) => ({
    user: state.user,
    updateToken: state.updateToken,
    logoutUser: state.logoutUser,
  }));
  const [token, setToken] = useState(user?.access_token || null);

  const handleAuthorization = async () => {
    const { access_token, refresh_token } = user;

    if (
      !access_token ||
      access_token.length === 0 ||
      !refresh_token ||
      refresh_token.length === 0
    ) {
      logoutUser();
      return setToken("expired");
    }

    const decodedAccess = jwt(access_token);
    const decodedRefresh = jwt(refresh_token);

    const expAccess = new Date(decodedAccess.exp * 1000);
    const expRefresh = new Date(decodedRefresh.exp * 1000);
    const now = new Date();
    const isAccessTokenExpired = now > expAccess;
    const isRefreshTokenExpired = now > expRefresh;

    if (isAccessTokenExpired && isRefreshTokenExpired) {
      logoutUser();
      return setToken("expired");
    }

    if (isAccessTokenExpired && !isRefreshTokenExpired) {
      const response = refreshToken(refresh_token);
      if (!response) {
        logoutUser();
        return setToken("expired");
      } else {
        updateToken(response?.access_token);
        return setToken(response?.access_token);
      }
    }

    setToken(access_token);
  };

  useEffect(() => {
    handleAuthorization();
  }, []);

  return token;
};
