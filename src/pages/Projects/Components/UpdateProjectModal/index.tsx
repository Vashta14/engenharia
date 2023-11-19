import { useEffect, useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { FormSubmitButton } from "../../../../components/FormSubmitButton";
import { FormField } from "../../../../components/FormField";
import { toast } from "react-toastify";
import {
  createProject,
  deleteProject,
  updateProject,
} from "../../../../services/projects.service";
import { CustomDeleteModal } from "../../../../components/CustomDeleteModal";

export function UpdtateProjectModal(props: UpdateProjectModalProps) {
  const { project, setProject, success, setSuccess, show, setShow } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [formValidated, setFormValidated] = useState(false);

  function handleCloseModal() {
    setShow(false);
    setIsLoading(false);
    setFormValidated(false);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (e.currentTarget.checkValidity()) {
      setIsLoading(true);
      try {
        const target = e.target as typeof e.target & {
          name: { value: string };
          description: { value: string };
          goal: { value: string };
          reward: { value: string };
        };
        if (project) {
          const newProject: Project = {
            name: target.name.value,
            description: target.description.value,
            goal: Number(target.goal.value),
            reward: target.reward.value,
            id: project.id,
            active: project.active,
          };

          await updateProject(newProject);
          toast.success("Projeto atualizado com sucesso!");
          setSuccess(true);
        } else {
          const newProject: CreateProjectProps = {
            name: target.name.value,
            description: target.description.value,
            goal: Number(target.goal.value),
            reward: target.reward.value,
          };

          await createProject(newProject);
          toast.success("Projeto criadocom sucesso!");
          setSuccess(true);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setFormValidated(true);
    }
  }

  useEffect(() => {
    show && setSuccess(false);
  }, [show]);

  useEffect(() => {
    success && handleCloseModal();
  }, [success]);

  return (
    <>
      <Button
        variant="outline-success"
        onClick={() => {
          setShow(true);
          setProject(undefined);
        }}
      >
        Criar projeto
      </Button>
      <Modal
        show={show}
        onHide={handleCloseModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{`${
            project === undefined ? "Criar" : "Editar"
          } projeto`}</Modal.Title>
        </Modal.Header>
        <Form noValidate validated={formValidated} onSubmit={handleSubmit}>
          <Modal.Body>
            <FormField
              title="Nome"
              name="name"
              type="text"
              required
              defaultValue={project?.name}
            />
            <FormField
              title="Descrição"
              name="description"
              type="text"
              as="textarea"
              required
              defaultValue={project?.description}
            />
            <FormField
              title="Meta"
              name="goal"
              type="number"
              group={<InputGroup.Text>R$</InputGroup.Text>}
              required
              defaultValue={project?.goal}
            />
            <FormField
              title="Recompensas"
              name="reward"
              type="text"
              as="textarea"
              required
              defaultValue={project?.reward}
            />
          </Modal.Body>
          <Modal.Footer
            className={
              project !== undefined ? " d-flex justify-content-between" : ""
            }
          >
            {project !== undefined ? (
              <>
                <CustomDeleteModal
                  title="Remover usuario"
                  item={project?.name}
                  itemType="Projeto"
                  deleteFunction={async () => {
                    await deleteProject(Number(project?.id));
                  }}
                  setSuccess={setSuccess}
                />
                <div className="d-flex flex-row gap-2">
                  <Button
                    variant="outline-secondary"
                    onClick={handleCloseModal}
                  >
                    Fechar
                  </Button>
                  <FormSubmitButton isLoading={isLoading}>
                    {project === undefined ? "Criar" : "Editar"}
                  </FormSubmitButton>
                </div>
              </>
            ) : (
              <>
                <Button variant="outline-secondary" onClick={handleCloseModal}>
                  Fechar
                </Button>
                <FormSubmitButton isLoading={isLoading}>
                  {project === undefined ? "Criar" : "Editar"}
                </FormSubmitButton>
              </>
            )}
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
