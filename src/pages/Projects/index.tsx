import { Button, ButtonGroup, Container } from "react-bootstrap";
import { Subheader } from "../../components/Subheader";
import { Header } from "../../components/Header";
import { Column, CustomTable } from "../../components/CustomTable";
import { useState, useEffect } from "react";
import { FaAngleRight } from "react-icons/fa";
import useUrlParams from "../../Hooks/useUrlParams";
import { CreateProjectModal } from "./Components/CreateProjectModal";
import { listProjects } from "../../services/projects.service";

export default function Projects() {
  const [params, setParams] = useUrlParams();
  const [projects, setProjects] = useState<Array<Project>>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState<number>(Number(params.get("page")) || 1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(20);
  const [totalItems, setTotalItems] = useState<number>();
  const [success, setSuccess] = useState(false);
  const [show, setShow] = useState(false);

  const columns: Array<Column<Project>> = [
    {
      name: "Name",
      field: (item) => item.name,
      size: 3,
    },
    {
      name: "Descricao",
      field: (item) => item.description,
      title: (item) => item.description,
      tdClassName: "limited-characters",
      size: 6,
    },
    {
      tdClassName: "text-end",
      thClassName: "text-end",
      name: "Meta",
      field: (item) =>
        item.goal.toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
        }),
      size: 1,
    },
    {
      tdClassName: "text-end",
      thClassName: "text-end",
      name: "Arrecadado",
      field: (item) =>
        (item.reward || 0).toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
        }),
      size: 1,
    },
    {
      name: "Visualizar",
      tdClassName: "text-end",
      thClassName: "text-end",
      size: 1,
      field: (item) => (
        <ButtonGroup>
          <Button
            as="a"
            variant="outline-primary"
            className=" d-flex justify-content-between align-content-center"
            href={`/project/${item.id}`}
          >
            <FaAngleRight />
          </Button>
        </ButtonGroup>
      ),
    },
  ];

  async function getProjects() {
    setLoading(true);
    try {
      const { data } = await listProjects({ page, itemsPerPage });
      setProjects(data.projects);
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
    getProjects();
  }, [page]);

  useEffect(() => {
    success && getProjects();
  }, [success]);

  return (
    <>
      <Header />
      <Subheader
        title="Projetos"
        filters={
          <CreateProjectModal
            show={show}
            setShow={setShow}
            success={success}
            setSuccess={setSuccess}
          />
        }
      />
      <Container>
        <CustomTable
          items={projects}
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
