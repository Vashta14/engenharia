import { Card, Container, Form } from "react-bootstrap";
import { FormAlert } from "../../components/FormAlert";
import { FormField } from "../../components/FormField";
import { FormSubmitButton } from "../../components/FormSubmitButton";
import { useState } from "react";
import { signUp } from "../../services";
import { AxiosError } from "axios";
import { ApiErrors } from "../../components/ApiErrors";

export default function SignUp() {
  const [formIsInvalid, setFormIsInvalid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState<Array<string>>([]);
  const [key, setKey] = useState(0);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setKey(Date.now());
    if (e.currentTarget.checkValidity()) {
      const target = e.target as typeof e.target & {
        name: { value: string };
        nickname: { value: string };
        email: { value: string };
        password: { value: string };
        image: { files: FileList };
      };

      const newUser = {
        name: target.name.value,
        nickname: target.nickname.value,
        email: target.email.value,
        password: target.password.value,
        image: target.image.files[0],
      };
      setIsLoading(true);
      try {
        await signUp(newUser);
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
        <Card className="col-12 col-md-10">
          <Card.Header className="bg-white">Criar uma nova conta</Card.Header>
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
                <ApiErrors key={key} items={errorMessages} />
              )}
              <FormField title="Nome" name="name" type="text" required />
              <FormField title="Apelido" name="nickname" type="text" required />
              <FormField
                title="Imagem"
                name="image"
                type="file"
                accept=".png,.jpg,.jpeg,.webp"
                required
              />
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
                Criar conta
              </FormSubmitButton>
            </Card.Footer>
          </Form>
        </Card>
      </Container>
    </div>
  );
}
