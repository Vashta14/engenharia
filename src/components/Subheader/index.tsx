import { Container } from "react-bootstrap";

interface SubheaderProps {
  title: string;
  filters?: React.JSX.Element;
}

export function Subheader(props: SubheaderProps) {
  const { title, filters } = props;
  return (
    <Container className=" d-flex justify-content-between flex-row text-light py-4">
      <h2 className=" fw-light">{title}</h2>
      <div>{filters}</div>
    </Container>
  );
}
