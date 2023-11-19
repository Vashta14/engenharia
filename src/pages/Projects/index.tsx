import { Button, ButtonGroup, Container } from "react-bootstrap";
import { Subheader } from "../../components/Subheader";
import { Column, CustomTable } from "../../components/CustomTable";
import { useState, useEffect } from "react";
import { FaAngleRight, FaPen } from "react-icons/fa";
import useUrlParams from "../../Hooks/useUrlParams";
import { UpdtateProjectModal } from "./Components/UpdateProjectModal";
import { listProjects } from "../../services/projects.service";
import { CurrentUser } from "../../utils/userUtils";

export default function Projects() {
  const [params, setParams] = useUrlParams();
  const [projects, setProjects] = useState<Array<Project>>([]);
  const [selectedProject, setSelectedProject] = useState<Project | undefined>();
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
      size: 2,
    },
    {
      name: "Descrição",
      field: (item) => item.description,
      title: (item) => item.description,
      tdClassName: "limited-characters",
      size: 6,
    },
    {
      name: "Recompensas",
      field: (item) => item.reward,
      title: (item) => item.reward,
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
      name: "Visualizar",
      tdClassName: "text-end",
      thClassName: "text-end",
      size: 1,
      field: (item) => (
        <ButtonGroup>
          {CurrentUser.get().role === "admin" && (
            <Button
              variant="outline-success"
              className=" d-flex justify-content-between align-content-center"
              onClick={() => {
                setShow(true);
                setSelectedProject(item);
              }}
            >
              <FaPen />
            </Button>
          )}
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
      <Subheader
        title="Projetos"
        filters={
          <UpdtateProjectModal
            project={selectedProject}
            setProject={setSelectedProject}
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
