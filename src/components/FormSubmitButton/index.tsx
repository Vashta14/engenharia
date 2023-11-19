import { Button, ButtonProps, Spinner } from "react-bootstrap";

type FormSubmitButtonProps = ButtonProps & {
  isLoading?: boolean;
  isEdit?: boolean;
};

export function FormSubmitButton(
  props: React.PropsWithChildren<FormSubmitButtonProps>
) {
  const {
    isLoading,
    isEdit,
    children,
    className = "",
    variant,
    ...otherProps
  } = props;
  return (
    <Button
      variant={variant ? variant : isEdit ? "outline-dark" : "dark"}
      className={`${className} d-flex justify-content-center align-items-center`}
      type="submit"
      disabled={isLoading}
      {...otherProps}
    >
      {isLoading ? <Spinner size="sm" /> : children}
    </Button>
  );
}
