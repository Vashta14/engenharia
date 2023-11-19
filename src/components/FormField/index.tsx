import { Form, FormControlProps, InputGroup } from "react-bootstrap";
import { InputHTMLAttributes } from "react";

type FormCellProps = FormControlProps &
  InputHTMLAttributes<HTMLInputElement> & {
    title: string;
    name: string;
    type: string;
    onChange?: React.ChangeEventHandler;
    onBlur?: React.FocusEventHandler;
    feedback?: string;
    required?: boolean;
    group?: React.ReactNode;
  };

export function FormField(props: FormCellProps) {
  const {
    title,
    name,
    type,
    value = "",
    required = false,
    onChange,
    onBlur,
    feedback = "Campo obrigatorio!",
    group,
    ...otherProps
  } = props;

  const FormControl: React.ReactNode = (
    <>
      {value ? (
        <Form.Control
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          required={required}
          {...otherProps}
        />
      ) : (
        <Form.Control
          type={type}
          name={name}
          required={required}
          {...otherProps}
        />
      )}
    </>
  );

  return (
    <Form.Group className="mb-3" controlId={`formBase${name}`}>
      <Form.Label>
        {title}
        {required && <span className="text-danger">*</span>}
      </Form.Label>
      {group ? (
        <InputGroup>
          {group} {FormControl}
        </InputGroup>
      ) : (
        <>{FormControl} </>
      )}

      <Form.Control.Feedback type="invalid">{feedback}</Form.Control.Feedback>
    </Form.Group>
  );
}
