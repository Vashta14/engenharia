import { useEffect, useState } from "react";
import { CurrentUser } from "../../../../utils/userUtils";
import { createSponsorship } from "../../../../services/sponsorships.service";
import { toast } from "react-toastify";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { FormField } from "../../../../components/FormField";
import { FormSubmitButton } from "../../../../components/FormSubmitButton";

export function SponsorshipModal(props: SponsorshipModalProps) {
  const { projectId, success, setSuccess, show, setShow } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [formValidated, setFormValidated] = useState(false);

  function handleCloseModal() {
    setShow(false);
    setIsLoading(false);
    setFormValidated(false);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (e.currentTarget.checkValidity() && projectId) {
      const target = e.target as typeof e.target & {
        sponsorship: { value: string };
      };

      const newSponsorship: CreateSponsorshipProps = {
        sponsorship: Number(target.sponsorship.value),
        userId: CurrentUser.get().id,
        projectId,
      };

      setIsLoading(true);
      try {
        await createSponsorship(newSponsorship);
        toast.success("Projeto patrocinado com sucesso!");
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
        Patrocinar
      </Button>
      <Modal
        show={show}
        onHide={handleCloseModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Patrocinar projeto</Modal.Title>
        </Modal.Header>
        <Form noValidate validated={formValidated} onSubmit={handleSubmit}>
          <Modal.Body>
            <FormField
              title="Valor"
              name="sponsorship"
              type="number"
              group={<InputGroup.Text>R$</InputGroup.Text>}
              required
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={handleCloseModal}>
              Fechar
            </Button>
            <FormSubmitButton isLoading={isLoading}>
              Patrocinar
            </FormSubmitButton>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
