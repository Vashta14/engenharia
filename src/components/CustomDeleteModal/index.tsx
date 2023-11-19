import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { CustomDeleteModalProps } from "./customDeleteModal";
import { toast } from "react-toastify";
import { FormSubmitButton } from "../FormSubmitButton";
import { FaRegTrashAlt } from "react-icons/fa";

export function CustomDeleteModal(props: CustomDeleteModalProps) {
  const { title, setSuccess, item, itemType, deleteFunction } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setIsLoading(false);
  };

  async function handleDelete() {
    try {
      setIsLoading(true);
      await deleteFunction();
      handleClose();
      setSuccess(true);
      toast.success(`${itemType} ${item} removido com sucesso!`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    var novaDiv = document.createElement("div");
    novaDiv.className =
      "bg-black min-vh-100 min-vw-100 start-0 top-0 position-absolute bg-opacity-50";
    novaDiv.style.zIndex = "1055";
    novaDiv.id = "delete-bg";

    if (show) {
      document.body.appendChild(novaDiv);
    } else {
      var divToRemove = document.getElementById("delete-bg");
      if (divToRemove) document.body.removeChild(divToRemove);
    }
  }, [show]);

  return (
    <>
      <Button variant="outline-danger" onClick={() => setShow(true)}>
        <FaRegTrashAlt />
      </Button>
      <Modal show={show} onHide={handleClose} style={{ zIndex: 1056 }}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span>
            {`${"Deseja remover o"} ${itemType.toLowerCase()} `}
            <strong>{item}</strong>?
          </span>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <FormSubmitButton
            onClick={async () => {
              await handleDelete();
            }}
            isLoading={isLoading}
          >
            Remover
          </FormSubmitButton>
        </Modal.Footer>
      </Modal>
    </>
  );
}
