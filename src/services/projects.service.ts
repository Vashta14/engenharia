import api from "./api";

export async function listProjects(props: {
  page: number;
  itemsPerPage: number;
}) {
  const { page, itemsPerPage } = props;
  return api.get(`/projects?pageNumber=${page}&itemsPerPage=${itemsPerPage}`);
}

export async function updateProject(props: Project) {
  return api.put(`/projects/${props.id}`, props);
}

export async function createProject(props: CreateProjectProps) {
  return api.post(`/projects`, props);
}

export async function deleteProject(id: number | undefined = undefined) {
  return api.delete(`/projects/${id}`);
}
