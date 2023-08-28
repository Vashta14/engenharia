import { Dropdown } from "react-bootstrap";
import { Header } from "../../components/Header";
import { Subheader } from "../../components/Subheader";

export default function Home() {
  return (
    <>
      <Header />
      <Subheader
        title="Relatorio principal"
        filters={
          <div className=" d-flex flex-row align-items-center">
            <span className=" me-2">Ordem:</span>
            <Dropdown>
              <Dropdown.Toggle variant="outline-light">...</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>A-Z</Dropdown.Item>
                <Dropdown.Item>Z-A</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        }
      />
    </>
  );
}
