import React, { SetStateAction, useEffect, useState } from "react";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { FormAlert } from "../FormAlert";

interface CustomModalProps {
  title: string;
  variant: "edit" | "show" | "creat";
  handleSubmit: () => Promise<boolean | undefined> | boolean;
  itemsToShow?: Array<{ name: string; value: string }>;
  show: boolean;
  setShow: React.Dispatch<SetStateAction<boolean>>;
  button: React.JSX.Element;
  errorMessages?: Array<string>;
}

export function CustomModal(props: React.PropsWithChildren<CustomModalProps>) {
  const {
    title,
    variant,
    children,
    handleSubmit,
    itemsToShow,
    show,
    setShow,
    button,
    errorMessages,
  } = props;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [validated, setValidated] = useState<boolean>(false);

  let color, text;
  if (variant === "edit") {
    (color = "primary"), (text = "Editar");
  } else if (variant === "creat") {
    (color = "success"), (text = "Criar");
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const valid = await handleSubmit();
    valid === false ? setValidated(true) : valid === true && setShow(false);
    setIsLoading(false);
  };

  const [showAlerts, setShowAlerts] = useState<boolean[]>([]);

  useEffect(() => {
    setShowAlerts(errorMessages?.map(() => true) ?? []);
  }, [errorMessages]);

  const onCloseAlert = (index: number) => {
    setShowAlerts(showAlerts.map((show, i) => (i === index ? false : show)));
  };

  return (
    <>
      {button}
      <Modal show={show} className=" text-light">
        <Modal.Header className=" bg-dark">{title}</Modal.Header>
        {variant === "show" ? (
          <Modal.Body className=" bg-dark">
            {itemsToShow?.map((item: { name: string; value: string }) => (
              <p>
                <span className=" fw-light">{`${item.name}:`}</span>
                <br />
                <span>{item.value}</span>
              </p>
            ))}
          </Modal.Body>
        ) : (
          <Form noValidate validated={validated} onSubmit={onSubmit}>
            <Modal.Body className=" bg-dark">
              {errorMessages?.map((item: string, index: number) => {
                if (index > 4) return;
                return (
                  <FormAlert
                    key={` Alert: ${index} `}
                    variant="danger"
                    onClose={() => onCloseAlert(index)}
                    show={showAlerts[index]}
                    dismissible={true}
                  >
                    {item}
                  </FormAlert>
                );
              })}
              {children}
            </Modal.Body>
          </Form>
        )}
        <Modal.Footer className=" d-flex flex-row justify-content-end bg-dark">
          <Button variant="outline-secondary" onClick={() => setShow(false)}>
            Cancelar
          </Button>
          {variant !== "show" && (
            <Button variant={`${color}`}>
              {isLoading ? <Spinner size="sm" /> : `${text}`}
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}
