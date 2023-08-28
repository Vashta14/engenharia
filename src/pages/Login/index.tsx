import { useState } from "react";
import { Card, Container, Form } from "react-bootstrap";
import { FormAlert } from "../../components/FormAlert";
import { FormField } from "../../components/FormField";
import { FormSubmitButton } from "../../components/FormSubmitButton";
import * as Service from "../../services";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [userEmail, setUserEmail] = useState<string>();
  const [userPass, setUserPass] = useState<string>();
  const [formIsInvalid, setFormIsInvalid] = useState<boolean>(false);
  const [invalidUser, setInvalidUser] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>();
  const history = useNavigate();

  function handleSubmit(e: React.FormEvent) {
    async function fatch(): Promise<void> {
      setIsLoading(true);
      const response = await Service.authentication({
        email: userEmail || "",
        password: userPass || "",
      });
      setIsLoading(false);
      if (response.status === 200) {
        const data = await response.json();
        localStorage.setItem("userName", data.name);
        history("/");
      } else if (response.status === 404) {
        setInvalidUser(true);
      }
    }
    e.preventDefault();
    if (userEmail && userPass) {
      fatch();
    } else setFormIsInvalid(true);
  }

  return (
    <div className="bg-dark min-vh-100 d-flex align-items-center">
      <Container className=" d-flex justify-content-center">
        <Card>
          <Card.Header>Login</Card.Header>
          <Form noValidate validated={formIsInvalid} onSubmit={handleSubmit}>
            <Card.Body>
              <FormAlert
                onClose={() => {
                  setFormIsInvalid(false);
                }}
                variant="danger"
                show={formIsInvalid}
                dismissible={true}
              >
                Preencha os campos obrigatorios!
              </FormAlert>
              <FormAlert
                onClose={() => {
                  setInvalidUser(false);
                }}
                variant="danger"
                show={invalidUser}
                dismissible={true}
              >
                Usuario invalido
              </FormAlert>
              <FormField
                title="Email:"
                name="email"
                type="email"
                required
                value={userEmail}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setUserEmail(e.target.value)
                }
              />
              <FormField
                title="Senha:"
                name="password"
                type="password"
                required
                value={userPass}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setUserPass(e.target.value)
                }
              />
            </Card.Body>
            <Card.Footer className=" d-flex flex-row justify-content-end">
              <FormSubmitButton isLoading={isLoading}>Entrar</FormSubmitButton>
            </Card.Footer>
          </Form>
        </Card>
      </Container>
    </div>
  );
}
