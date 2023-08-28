import { Button, Spinner } from "react-bootstrap";

interface FormSubmitButtonProps {
  isLoading?: boolean;
  isEdit?: boolean;
  className?: string;
}

export function FormSubmitButton(
  props: React.PropsWithChildren<FormSubmitButtonProps>
) {
  const { isLoading, isEdit, children, className = "" } = props;
  return (
    <Button
      variant={isEdit ? "outline-dark" : "dark"}
      className={`${className} d-flex justify-content-center align-items-center`}
      type="submit"
      disabled={isLoading}
    >
      {isLoading ? <Spinner size="sm" /> : children}
    </Button>
  );
}
