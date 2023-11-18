import { AxiosResponseHeaders } from "axios";

type AuthTokensManager = {
  getAccessToken: () => string | null;
  getClient: () => string | null;
  getExpirity: () => string | null;
  getUid: () => string | null;
  setTokensByHeader: (header: AxiosResponseHeaders) => void;
  cleanTokens: () => void;
  tokensExist: () => boolean;
};

export const authTokens: AuthTokensManager = {
  getAccessToken: () => `${localStorage.getItem("access-token")}`,
  getClient: () => `${localStorage.getItem("client")}`,
  getExpirity: () => `${localStorage.getItem("expirity")}`,
  getUid: () => `${localStorage.getItem("uid")}`,

  setTokensByHeader: (header) => {
    localStorage.setItem("access-token", header["access-token"]);
    localStorage.setItem("client", header.client);
    localStorage.setItem("expirity", header.expirity);
    localStorage.setItem("uid", header.uid);
    window.location.replace("/home");
  },

  tokensExist: function () {
    return (
      this.getAccessToken() !== "null" &&
      this.getClient() !== "null" &&
      this.getExpirity() !== "null" &&
      this.getUid() !== "null"
    );
  },

  cleanTokens: () => {
    localStorage.removeItem("access-token");
    localStorage.removeItem("client");
    localStorage.removeItem("expirity");
    localStorage.removeItem("uid");
  },
};
