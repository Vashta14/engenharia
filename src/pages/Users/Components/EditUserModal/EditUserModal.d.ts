interface EditUserModalProps {
  user: User;
  success: boolean;
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}
