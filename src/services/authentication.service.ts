import axios from "axios";
import api from "./api";

export async function signIn(props: authenticationProps) {
  const { password, email } = props;
  return axios.post("http://127.0.0.1:3000/api/auth/sign_in", {
    password,
    email,
  });
}

export async function signUp(props: createUserProps) {
  const { email, password, nickname, name, image } = props;
  return axios.post("http://127.0.0.1:3000/api/auth", {
    email,
    password,
    nickname,
    name,
    image,
  });
}

export async function signOut() {
  return api.delete("/auth");
}
