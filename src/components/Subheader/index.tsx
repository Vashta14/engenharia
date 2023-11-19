import { Container } from "react-bootstrap";

interface SubheaderProps {
  title: string | React.ReactNode;
  filters?: React.JSX.Element;
}

export function Subheader(props: SubheaderProps) {
  const { title, filters } = props;
  return (
    <Container className=" d-flex justify-content-between flex-row text-light py-4 align-items-center">
      {typeof title === "string" ? (
        <h2 className=" fw-light">{title}</h2>
      ) : (
        title
      )}
      <div>{filters}</div>
    </Container>
  );
}
