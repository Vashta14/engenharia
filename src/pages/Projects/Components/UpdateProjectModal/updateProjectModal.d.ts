interface UpdateProjectModalProps {
  project: Project | undefined;
  setProject: React.Dispatch<React.SetStateAction<Project | undefined>>;
  success: boolean;
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}
