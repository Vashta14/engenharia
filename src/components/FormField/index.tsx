import { Form } from "react-bootstrap";

interface FormCellProps {
  title: string;
  name: string;
  type: string;
  value?: string | number | undefined;
  required?: boolean;
  onChange?: React.ChangeEventHandler;
  onBlur?: React.FocusEventHandler;
  feedback?: string;
}

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
  } = props;

  return (
    <Form.Group className="mb-3" controlId={`formBase${name}`}>
      <Form.Label>
        {title}
        {required && <span className="text-danger">*</span>}
      </Form.Label>
      {value ? (
        <Form.Control
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          required={required}
        />
      ) : (
        <Form.Control type={type} name={name} required={required} />
      )}

      <Form.Control.Feedback type="invalid">{feedback}</Form.Control.Feedback>
    </Form.Group>
  );
}
