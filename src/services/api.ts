import axios, { HttpStatusCode } from "axios";
import { toast } from "react-toastify";
import { AuthTokens } from "../utils/authTokens";

const api = axios.create({
  baseURL: "http://127.0.0.1:3000/api",
});

api.defaults.headers["Accept-language"] = navigator.language;
api.defaults.headers["Access-Control-Allow-Origin"] = "*";

api.defaults.headers["access-token"] = AuthTokens.getAccessToken();
api.defaults.headers["client"] = AuthTokens.getClient();
api.defaults.headers["expirity"] = AuthTokens.getExpirity();
api.defaults.headers["uid"] = AuthTokens.getUid();

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === HttpStatusCode.Unauthorized) {
      toast.error("Erro de autenticação. Por favor, faça login novamente.");
      window.location.replace("/login");
    } else if (error.response.status === HttpStatusCode.Forbidden) {
      toast.error("Você não tem permissão para acessar este recurso.");
    }
    if (!!error.response.data.messages) {
      toast.error(error.response.data.messages);
    }
    return Promise.reject(error);
  }
);

export default api;
