interface Project {
  name: string;
  description: string;
  goal: number;
  reward: string;
  active: boolean;
  id: number;
}

interface CreateProjectProps {
  name: string;
  description: string;
  goal: number;
  reward: string;
}
