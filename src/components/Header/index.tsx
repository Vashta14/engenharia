import { Container, Dropdown, Nav, Image } from "react-bootstrap";
import { useEffect, useState } from "react";
import { signOut } from "../../services";
import { CurrentUser } from "../../utils/userUtils";
import { AuthTokens } from "../../utils/authTokens";
import logo from "../../assets/imgs/logo.png";
import { EditUserModal } from "../../pages/Users/Components/EditUserModal";
import localforage from "localforage";

export function Header() {
  const user = CurrentUser.get();
  const [userImage, setUserImage] = useState("");
  const [success, setSuccess] = useState(false);
  const [show, setShow] = useState(false);
  const [key, setKey] = useState<number>(0);

  useEffect(() => {
    if (!CurrentUser.get() || !AuthTokens.tokensExist()) {
      CurrentUser.clear();
      AuthTokens.cleanTokens();
    }
  }, []);

  useEffect(() => {
    async function getImage() {
      const file = await localforage.getItem(user?.email);
      const url = URL.createObjectURL(file as File);
      setUserImage(url);
    }
    getImage();
  }, [key]);

  useEffect(() => {
    success && setKey(Date.now());
  }, [success]);

  async function handleClose() {
    await signOut();
    CurrentUser.clear();
    AuthTokens.cleanTokens();
  }

  return (
    <div className=" bg-black" key={key}>
      <Container className="d-flex flex-row justify-content-between">
        <Nav className="d-flez justify-content-center align-content-center">
          <a href="/home">
            <Image src={logo} style={{ width: "80px", height: "80px" }} />
          </a>
        </Nav>
        <Nav className=" d-flex flex-row justify-content-end align-items-center p-3 pe-0">
          <Nav.Link href="/relatorio" className=" text-white">
            Relatorio
          </Nav.Link>
          <Nav.Link href="/projects" className=" text-white">
            Projetos
          </Nav.Link>
          {user && user.role === "admin" && (
            <Nav.Link href="/users" className=" text-white">
              Usuarios
            </Nav.Link>
          )}
          <Nav.Link className="pe-0 text-white">
            <Dropdown>
              <Dropdown.Toggle
                variant="outline-light"
                className="d-flex align-items-center gap-2"
              >
                <Image
                  src={userImage}
                  className="rounded-circle"
                  style={{ height: "30px" }}
                />
                {user?.name}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setShow(true)}>
                  Perfil
                </Dropdown.Item>
                <Dropdown.Item onClick={handleClose}>Sair</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav.Link>
        </Nav>
      </Container>
      <EditUserModal
        user={user}
        show={show}
        setShow={setShow}
        success={success}
        setSuccess={setSuccess}
      />
    </div>
  );
}
