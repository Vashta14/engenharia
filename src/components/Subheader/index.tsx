import { Col, Container, Row } from "react-bootstrap";

interface SubheaderProps {
  title: string | React.ReactNode;
  filters?: React.JSX.Element;
}

export function Subheader(props: SubheaderProps) {
  const { title, filters } = props;
  return (
    <Container>
      <Row className=" d-flex justify-content-between flex-row text-light py-4 align-items-center gap-2">
        <Col className=" col-12 col-md-6">
          {typeof title === "string" ? (
            <h2 className=" fw-light">{title}</h2>
          ) : (
            title
          )}
        </Col>
        <Col className=" col-12 col-md-6">
          <div className="d-flex justify-content-start justify-content-md-end pt-2">
            {filters}
          </div>
        </Col>
      </Row>
    </Container>
  );
}
