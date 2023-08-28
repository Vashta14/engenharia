import { Button, Container, Dropdown } from "react-bootstrap";
import { Header } from "../../components/Header";
import { Subheader } from "../../components/Subheader";
import { CustomTable } from "../../components/CustomTable";
import { useState } from "react";
import { CustomModal } from "../../components/CustomModal";

interface Customer {
  name: string;
  document: string;
  tel: string;
}

const customers: Array<Customer> = [
  { name: "Pedrinho", document: "12.12.21.21.12-2", tel: "(23) 12334-1233" },
  { name: "Gabiroba", document: "12.12.1231.21.12-2", tel: "(23) 12664-1233" },
  { name: "Sergin", document: "12.12.271.251.112-2", tel: "(23) 12777-1233" },
  { name: "Anastacia", document: "654.65.21.21.12-2", tel: "(23) 12334-3633" },
  { name: "Enrica", document: "12.1452.231.21.12-2", tel: "(23) 12334-9873" },
  { name: "Asmirra", document: "12.127.216.56.12-2", tel: "(23) 98334-9933" },
  { name: "Anderson", document: "145.12.45.21.12-2", tel: "(23) 88334-5633" },
];

export function ItemsTable() {
  const [shwoModal, setShowModal] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("")
  const [modalVariant, setModalVariant] = useState<"edit" | "show" | "creat">(
    "creat"
  );
  const [itemsToShow, setItemsToShow] = useState<
    Array<{
      name: string;
      value: string;
    }>
  >();

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
            <CustomModal
              button={
                <Button
                  variant="outline-light"
                  onClick={() => {
                    setShowModal(true);
                    setModalVariant("creat");
                  }}
                >
                  Criar
                </Button>
              }
              variant={modalVariant}
              title={title}
              show={shwoModal}
              setShow={setShowModal}
              handleSubmit={() => false}
              itemsToShow={itemsToShow}
            ></CustomModal>
          </div>
        }
      />
      <Container>
        <CustomTable
          items={customers}
          columns={[
            { name: "Nome", size: 7, field: (item) => item.name },
            { name: "Documento", size: 2, field: (item) => item.document },
            {
              name: "Telefone",
              size: 2,
              direction: "end",
              field: (item) => item.tel,
            },
          ]}
          actions={(item) => {
            return (
              <>
                <Button
                  onClick={() => {
                    setModalVariant("show");
                    setTitle("vizualizar sei lá o que")
                    setShowModal(true);
                    setItemsToShow([
                      {
                        name: "Nome",
                        value: item.name,
                      },
                      {
                        name: "Nome",
                        value: item.document,
                      },
                      {
                        name: "Nome",
                        value: item.tel,
                      },
                    ]);
                  }}
                >
                  Vizualizar
                </Button>
                <Button>c</Button>
              </>
            );
          }}
          isLoading={false}
        />
      </Container>
    </>
  );
}
