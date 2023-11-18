import axios, { HttpStatusCode, AxiosResponseHeaders } from "axios";
import { toast } from "react-toastify";
import { authTokens } from "../utils/authTokens";

const api = axios.create({
  baseURL: "http://127.0.0.1:3000/api",
});

api.defaults.headers["Accept-language"] = navigator.language;
api.defaults.headers["Access-Control-Allow-Origin"] = "*";

api.defaults.headers["access-token"] = authTokens.getAccessToken();
api.defaults.headers["client"] = authTokens.getClient();
api.defaults.headers["expirity"] = authTokens.getExpirity();
api.defaults.headers["uid"] = authTokens.getUid();

api.interceptors.response.use(
  (response) => {
    if (response.status === HttpStatusCode.Ok) {
      authTokens.setTokensByHeader(response.headers as AxiosResponseHeaders);
    }
    return response;
  },
  (error) => {
    if (error.response.status === HttpStatusCode.Unauthorized) {
      toast.error("Erro de autenticação. Por favor, faça login novamente.");
      window.location.replace("/login");
    } else if (error.response.status === HttpStatusCode.Forbidden) {
      toast.error("Você não tem permissão para acessar este recurso.");
    }
    if (!!error.response.data.message) {
      toast.error(error.response.data.message);
    }
    return Promise.reject(error);
  }
);

export default api;