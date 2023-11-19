import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { deleteUser, updateUser } from "../../../../services/users.service";
import { FormSubmitButton } from "../../../../components/FormSubmitButton";
import { FormField } from "../../../../components/FormField";
import { toast } from "react-toastify";
import { CustomDeleteModal } from "../../../../components/CustomDeleteModal";
import { CurrentUser } from "../../../../utils/userUtils";

export function EditUserModal(props: EditUserModalProps) {
  const { user, success, setSuccess, show, setShow } = props;
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
        nickname: { value: string };
        email: { value: string };
        image: { files: FileList };
      };

      const newUser: User = {
        name: target.name.value,
        nickname: target.nickname.value,
        email: target.email.value,
        image: !!target.image.files[0]
          ? URL.createObjectURL(target.image.files[0])
          : user.image,
        id: user.id,
        role: user.role,
      };
      setIsLoading(true);
      try {
        const { data } = await updateUser(newUser);
        if (data.id === CurrentUser.get().id) {
          CurrentUser.set(data);
        }
        toast.success("Usuario atualizado com sucesso!");
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
    <Modal
      show={show}
      onHide={handleCloseModal}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Editar usuario</Modal.Title>
      </Modal.Header>
      <Form noValidate validated={formValidated} onSubmit={handleSubmit}>
        <Modal.Body>
          <FormField
            title="Nome"
            name="name"
            type="text"
            required
            defaultValue={user.name}
          />
          <FormField
            title="Apelido"
            name="nickname"
            type="text"
            required
            defaultValue={user.nickname}
          />
          <FormField
            title="Imagem"
            name="image"
            type="file"
            accept=".png,.jpg,.jpeg,.webp"
            required={!user.image}
          />
          <FormField
            title="Email"
            name="email"
            type="email"
            required
            defaultValue={user.email}
          />
        </Modal.Body>
        <Modal.Footer className=" d-flex justify-content-between">
          <CustomDeleteModal
            title="Remover usuario"
            item={user.name}
            itemType="Usuario"
            deleteFunction={async () => {
              if (user.id === CurrentUser.get().id) {
                deleteUser();
              } else {
                deleteUser(Number(user.id));
              }
            }}
            setSuccess={setSuccess}
          />
          <div className="d-flex flex-row gap-2">
            <Button variant="outline-secondary" onClick={handleCloseModal}>
              Fechar
            </Button>
            <FormSubmitButton isLoading={isLoading}>Salvar</FormSubmitButton>
          </div>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
