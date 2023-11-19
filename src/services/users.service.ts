import api from "./api";

export async function listUsers(props: { page: number; itemsPerPage: number }) {
  const { page, itemsPerPage } = props;
  return api.get(`/users?pageNumber=${page}&itemsPerPage=${itemsPerPage}`);
}

export async function updateUser(props: User) {
  return api.put(`/users/${props.id}`, props);
}

export async function deleteUser(id: number | undefined = undefined) {
  const path = id ? `/users/${id}` : "//auth";
  return api.delete(path);
}
