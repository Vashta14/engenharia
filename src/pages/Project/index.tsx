import { Container, ProgressBar } from "react-bootstrap";
import { Subheader } from "../../components/Subheader";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProject } from "../../services/projects.service";
import { listSponsorships } from "../../services/sponsorships.service";
import useUrlParams from "../../Hooks/useUrlParams";
import { Column, CustomTable } from "../../components/CustomTable";
import { SponsorshipModal } from "./Components/SponsorshipModal";
import { Avatar } from "../../components/Avatar";

export default function Project() {
  const [params, setParams] = useUrlParams();
  const { id } = useParams();
  const [project, setProject] = useState<Project>();
  const [projectIsLoading, setProjectIsLoading] = useState(false);
  const [sponsorshipsIsLoading, setSponsorshipsIsLoading] = useState(false);
  const [sponsorships, setSponsorships] = useState<Array<Sponsorship>>([]);
  const [totalAmount, setTotalAmount] = useState<number>();

  const [page, setPage] = useState<number>(Number(params.get("page")) || 1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [totalItems, setTotalItems] = useState<number>();
  const [success, setSuccess] = useState(false);
  const [show, setShow] = useState(false);

  const actualBar =
    project && totalAmount ? (totalAmount / project.goal) * 100 : 0;

  const columns: Array<Column<Sponsorship>> = [
    {
      name: "Image",
      field: (item) => <Avatar src={item.user.image} alt={item.user.name} />,
      size: 1,
    },
    {
      name: "Nickname",
      field: (item) => item.user.nickname,
      title: (item) => item.user.name,
      size: 3,
    },
    {
      tdClassName: "text-end",
      thClassName: "text-end",
      name: "Patrocínio",
      field: (item) =>
        item.amount.toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
        }),
      size: 1,
    },
  ];

  async function findProject() {
    setProjectIsLoading(true);
    try {
      const { data } = await getProject(Number(id) || undefined);
      setProject(data);
    } catch (error) {
      console.error(error);
    } finally {
      setProjectIsLoading(false);
    }
  }

  async function getSponsorships() {
    setSponsorshipsIsLoading(true);
    try {
      const { data } = await listSponsorships({
        page,
        itemsPerPage,
        id: Number(id),
      });
      setSponsorships(data.sponsorships);
      setTotalAmount(data.totalAmount);
      setPage(data.pageNumber);
      setItemsPerPage(data.itemsPerPage);
      setTotalItems(data.count);
    } catch (error) {
      console.error(error);
    } finally {
      setSponsorshipsIsLoading(false);
    }
  }

  useEffect(() => {
    findProject();
  }, []);

  useEffect(() => {
    if (!params.get("page")) {
      setParams({ page: page.toString() });
    }
    setParams({ page: page.toString() });
    getSponsorships();
  }, [page]);

  useEffect(() => {
    success && getSponsorships();
  }, [success]);

  return (
    <>
      <Subheader
        title={
          <>
            {projectIsLoading ? (
              <></>
            ) : (
              <div className=" d-flex flex-column gap-2 w-100">
                <h2 className=" fw-light">{project?.name}</h2>
                <div className="d-flex flex-md-row flex-column gap-2 align-items-start align-items-md-center">
                  <ProgressBar
                    variant={
                      actualBar >= 100
                        ? "success"
                        : actualBar > 50
                        ? "warning"
                        : "danger"
                    }
                    className="col-12 col-md-7"
                    now={actualBar}
                  />
                  {`${(totalAmount || 0).toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  })} de ${(project?.goal || 0).toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  })}`}
                </div>
              </div>
            )}
          </>
        }
        filters={
          <SponsorshipModal
            show={show}
            setShow={setShow}
            projectId={Number(id)}
            success={success}
            setSuccess={setSuccess}
          />
        }
      />
      <Container className=" text-white">
        <div className=" border-bottom border-top d-flex flex-column py-4">
          <h4> Descrição</h4>
          <span className=" col-12 col-md-8">{project?.description}</span>
        </div>
        <div className=" border-bottom d-flex flex-column py-4">
          <h4> Recompensas</h4>
          <span className=" col-12 col-md-8">{project?.reward} </span>
        </div>
        <h4 className="pt-4"> Patrocínios</h4>
        <CustomTable
          items={sponsorships}
          columns={columns}
          isLoading={sponsorshipsIsLoading}
          page={page}
          setPage={setPage}
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
        />
      </Container>
    </>
  );
}
