import axios from "axios";
import api from "./api";

export async function signIn(props: authenticationProps) {
  const { password, email } = props;
  return api.post("/auth/sign_in", { password, email });
}

export async function signUp(props: createUserProps) {
  const { email, password, nickname, name, image } = props;
  return axios("http://127.0.0.1:3000/api/auth", {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: {
      email,
      password,
      nickname,
      name,
      image,
    },
  });
}
