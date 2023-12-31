import { useEffect, useState } from "react";
import { Subheader } from "../../components/Subheader";
import { listUsers } from "../../services/users.service";
import { Column, CustomTable } from "../../components/CustomTable";
import { FaPen } from "react-icons/fa";
import { Button, ButtonGroup, Container } from "react-bootstrap";
import useUrlParams from "../../Hooks/useUrlParams";
import { EditUserModal } from "./Components/EditUserModal";
import { Avatar } from "../../components/Avatar";

export default function Users() {
  const [params, setParams] = useUrlParams();
  const [users, setUsers] = useState<Array<User>>([]);
  const [selectedUser, setSelectedUser] = useState<User>();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [page, setPage] = useState<number>(Number(params.get("page")) || 1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(20);
  const [totalItems, setTotalItems] = useState<number>();
  const [showModal, setShowModal] = useState(false);

  const columns: Array<Column<User>> = [
    {
      name: "Image",
      field: (item) => <Avatar src={item.image} alt={item.name} />,
      size: 1,
    },
    {
      name: "Nickname",
      field: (item) => item.nickname,
      title: (item) => item.name,
      size: 3,
    },
    { name: "Email", field: (item) => item.email, size: 3 },
    { name: "Tipo", field: (item) => item.role, size: 3 },
    {
      name: "Editar",
      tdClassName: "text-end",
      thClassName: "text-end",
      field: (item) => (
        <ButtonGroup>
          <Button
            variant="outline-success"
            className=" d-flex justify-content-between align-content-center"
            onClick={() => {
              setShowModal(true);
              setSelectedUser(item);
            }}
          >
            <FaPen />
          </Button>
        </ButtonGroup>
      ),
    },
  ];

  async function getUsers() {
    setLoading(true);
    try {
      const { data } = await listUsers({ page, itemsPerPage });
      setUsers(data.users);
      setPage(data.pageNumber);
      setItemsPerPage(data.itemsPerPage);
      setTotalItems(data.count);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!params.get("page")) {
      setParams({ page: page.toString() });
    }
  }, []);

  useEffect(() => {
    setParams({ page: page.toString() });
    getUsers();
  }, [page]);

  useEffect(() => {
    success && getUsers();
  }, [success]);

  return (
    <>
      <Subheader title="Usuarios" />
      <Container>
        {selectedUser && (
          <EditUserModal
            user={selectedUser}
            show={showModal}
            setShow={setShowModal}
            success={success}
            setSuccess={setSuccess}
          />
        )}

        <CustomTable
          items={users}
          columns={columns}
          isLoading={loading}
          page={page}
          setPage={setPage}
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
        />
      </Container>
    </>
  );
}
