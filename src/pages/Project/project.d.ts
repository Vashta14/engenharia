interface Sponsorship {
  amount: number;
  id: number;
  user: User;
}

interface CreateSponsorshipProps {
  sponsorship: number;
  userId: number;
  projectId: number;
}
