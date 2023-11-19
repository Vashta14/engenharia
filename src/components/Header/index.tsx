import { Container, Dropdown, Nav, Image } from "react-bootstrap";
import { useEffect } from "react";
import { signOut } from "../../services";
import { CurrentUser } from "../../utils/userUtils";
import { AuthTokens } from "../../utils/authTokens";
import logo from "../../assets/imgs/logo.png";

export function Header() {
  const user = CurrentUser.get();

  useEffect(() => {
    if (!CurrentUser.get() || !AuthTokens.tokensExist()) {
      CurrentUser.clear();
      AuthTokens.cleanTokens();
    }
  }, []);

  const handleClose = async () => {
    await signOut();
    CurrentUser.clear();
    AuthTokens.cleanTokens();
  };

  return (
    <div className=" bg-black">
      <Container className="d-flex flex-row justify-content-between">
        <Nav className="d-flez justify-content-center align-content-center">
          <a href="/home">
            <Image src={logo} style={{ width: "80px", height: "80px" }} />
          </a>
        </Nav>
        <Nav className=" d-flex flex-row justify-content-end align-items-center p-3">
          <Nav.Link href="/relatorio" className=" text-white">
            Relatorio
          </Nav.Link>
          <Nav.Link href="/items" className=" text-white">
            Lista de items
          </Nav.Link>
          <Nav.Link href="/projects" className=" text-white">
            Projetos
          </Nav.Link>
          {user && user.role === "admin" && (
            <Nav.Link href="/users" className=" text-white">
              Usuarios
            </Nav.Link>
          )}
          <Nav.Link className=" text-white">
            <Dropdown>
              <Dropdown.Toggle variant="outline-light">
                <Image
                  src={user?.image}
                  sizes="2em"
                  className="rounded-circle"
                />
                {user?.name}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>Perfil</Dropdown.Item>
                <Dropdown.Item onClick={handleClose}>Sair</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav.Link>
        </Nav>
      </Container>
    </div>
  );
}
