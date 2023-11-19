import api from "./api";

export async function listUsers(props: { page: number; itemsPerPage: number }) {
  const { page, itemsPerPage } = props;
  return api.get(`/users?pageNumber=${page}&itemsPerPage=${itemsPerPage}`);
}

export async function updateUser(props: User) {
  return api.put(`/users/${props.id}`, props);
}
