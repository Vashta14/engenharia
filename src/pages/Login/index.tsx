import { useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { FormAlert } from "../../components/FormAlert";
import { FormField } from "../../components/FormField";
import { FormSubmitButton } from "../../components/FormSubmitButton";
import React from "react";
import { signIn } from "../../services";
import { AxiosError } from "axios";
import { ApiErrors } from "../../components/ApiErrors";
import { CurrentUser } from "../../utils/userUtils";

export default function Login() {
  const [formIsInvalid, setFormIsInvalid] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>();
  const [errorMessages, setErrorMessages] = useState<Array<string>>([]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (e.currentTarget.checkValidity()) {
      const target = e.target as typeof e.target & {
        email: { value: string };
        password: { value: string };
      };
      const newUser = {
        email: target.email.value,
        password: target.password.value,
      };

      setIsLoading(true);
      try {
        const { data } = await signIn(newUser);
        CurrentUser.set(data);
        window.location.replace("/home");
      } catch (error) {
        if (error instanceof AxiosError)
          setErrorMessages(error.response?.data.messages);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setFormIsInvalid(true);
    }
  }

  return (
    <div className="bg-dark min-vh-100 d-flex align-items-center">
      <Container className=" d-flex justify-content-center">
        <Card className="col-12 col-md-3">
          <Card.Header className="bg-white">Login</Card.Header>
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
              {errorMessages?.length > 0 && (
                <ApiErrors
                  key={JSON.stringify(errorMessages)}
                  items={errorMessages}
                />
              )}
              <FormField title="Email" name="email" type="email" required />
              <FormField
                title="Senha"
                name="password"
                type="password"
                required
              />
            </Card.Body>
            <Card.Footer className="d-flex flex-column align-items-center justify-content-center bg-white">
              <FormSubmitButton className="w-100" isLoading={isLoading}>
                Entrar
              </FormSubmitButton>
              <span className="py-2">ou</span>
              <Button
                as={"a"}
                variant="success"
                onClick={() => window.location.replace("/sign-up")}
              >
                Criar usuario
              </Button>
            </Card.Footer>
          </Form>
        </Card>
      </Container>
    </div>
  );
}
