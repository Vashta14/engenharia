interface EditUserModalProps {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  success: boolean;
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}
