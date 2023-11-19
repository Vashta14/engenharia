interface Project {
  name: string;
  description: string;
  goal: number;
  reward?: number;
  active: boolean;
  id: number;
}

interface CreateProjectProps {
  name: string;
  description: string;
  goal: number;
}
