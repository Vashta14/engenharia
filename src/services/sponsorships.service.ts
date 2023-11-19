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

export async function createSponsorship(props: CreateSponsorshipProps) {
  const { userId, projectId, sponsorship } = props;
  return api.post(`/sponsorships`, {
    user_id: userId,
    project_id: projectId,
    amount: sponsorship,
  });
}
