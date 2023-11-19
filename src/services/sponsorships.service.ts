import api from "./api";

export async function listSponsorships(props: {
  page: number;
  itemsPerPage: number;
  id: number | undefined;
}) {
  const { page, itemsPerPage, id } = props;
  return api.get(
    `/projects/${id}/sponsorships?pageNumber=${page}&itemsPerPage=${itemsPerPage}`
  );
}

export async function updateSponsorships(props: Sponsorship) {
  return api.put(`/sponsorships/${props.id}`, props);
}

export async function createSponsorship(props: CreateSponsorshipProps) {
  const { userId, projectId, sponsorship } = props;
  return api.post(`/sponsorships`, {
    user_id: userId,
    project_id: projectId,
    amount: sponsorship,
  });
}

export async function deleteSponsorships(id: number | undefined = undefined) {
  return api.delete(`/sponsorships/${id}`);
}

export async function getSponsorship(id: number | undefined = undefined) {
  return api.get(`/sponsorships/${id}`);
}
