import { useEffect, useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { FormSubmitButton } from "../../../../components/FormSubmitButton";
import { FormField } from "../../../../components/FormField";
import { toast } from "react-toastify";
import { createProject } from "../../../../services/projects.service";

export function CreateProjectModal(props: CreateProjectModalProps) {
  const { success, setSuccess, show, setShow } = props;
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
      const target = e.target as typeof e.target & {
        name: { value: string };
        description: { value: string };
        goal: { value: string };
        reward: { value: string };
      };

      const newProject: CreateProjectProps = {
        name: target.name.value,
        description: target.description.value,
        goal: Number(target.goal.value),
        reward: target.reward.value,
      };

      setIsLoading(true);
      try {
        await createProject(newProject);
        toast.success("Projeto criadocom sucesso!");
        setSuccess(true);
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
      <Button variant="outline-success" onClick={() => setShow(true)}>
        Criar projeto
      </Button>
      <Modal
        show={show}
        onHide={handleCloseModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Criar projeto</Modal.Title>
        </Modal.Header>
        <Form noValidate validated={formValidated} onSubmit={handleSubmit}>
          <Modal.Body>
            <FormField title="Nome" name="name" type="text" required />
            <FormField
              title="Descrição"
              name="description"
              type="text"
              as="textarea"
              required
            />
            <FormField
              title="Meta"
              name="goal"
              type="number"
              group={<InputGroup.Text>R$</InputGroup.Text>}
              required
            />
            <FormField
              title="Recompensas"
              name="reward"
              type="text"
              as="textarea"
              required
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={handleCloseModal}>
              Fechar
            </Button>
            <FormSubmitButton isLoading={isLoading}>Criar</FormSubmitButton>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
