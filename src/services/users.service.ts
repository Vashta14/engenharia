import api from "./api";

export async function listUsers() {
  return api.get("/users");
}
