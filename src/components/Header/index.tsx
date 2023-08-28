import { Container, Nav } from "react-bootstrap";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function Header() {
  const user = localStorage.getItem("userName");
  const location = useLocation();
  const redirect = useNavigate();

  useEffect(() => {
    if (!user) {
      redirect("/login");
    }
  }, [location, redirect, user]);

  const handleClose = () => {
    localStorage.clear();
    redirect("/login");
  };
  
  return (
    <div className=" bg-black">
      <Container>
        <Nav className=" d-flex flex-row justify-content-end align-items-center p-3">
          <Nav.Link href="/relatorio" className=" text-white">
            Relatorio
          </Nav.Link>
          <Nav.Link href="/items" className=" text-white">
            Lista de items
          </Nav.Link>
          <Nav.Link href="/lista" className=" text-white">
            Lista de...
          </Nav.Link>
          <Nav.Link onClick={handleClose} className=" text-white">
            Sair
          </Nav.Link>
        </Nav>
      </Container>
    </div>
  );
}
