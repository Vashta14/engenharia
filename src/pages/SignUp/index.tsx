import { Button, Card, Container, Form, Image } from "react-bootstrap";
import { FormAlert } from "../../components/FormAlert";
import { FormField } from "../../components/FormField";
import { FormSubmitButton } from "../../components/FormSubmitButton";
import { useState } from "react";
import { signUp } from "../../services";
import { AxiosError } from "axios";
import { ApiErrors } from "../../components/ApiErrors";
import localforage from "localforage";
import logo from "../../assets/imgs/logo.png";

export default function SignUp() {
  const [formIsInvalid, setFormIsInvalid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState<Array<string>>([]);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessages([]);
    if (e.currentTarget.checkValidity()) {
      const target = e.target as typeof e.target & {
        name: { value: string };
        nickname: { value: string };
        email: { value: string };
        password: { value: string };
        image: { files: FileList };
      };

      if (!!target.image.files[0]) {
        const file = target.image.files[0];
        const blob = new Blob([file], { type: file.type });
        await localforage.setItem(target.email.value, blob);
      }

      const newUser = {
        name: target.name.value,
        nickname: target.nickname.value,
        email: target.email.value,
        password: target.password.value,
        image: target.email.value,
      };
      setIsLoading(true);
      try {
        await signUp(newUser);
        setSuccess(true);
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
    <div className="min-vh-100 d-flex align-items-center">
      <Container className=" d-flex justify-content-center">
        {success ? (
          <Card className="p-5 text-center col-12 col-md-4">
            <h5 className="fw-bold pb-3">
              PARABÉNS! SUA CONTA FOI REGISTRADA COM SUCESSO!
            </h5>
            <span className="text-secondary pb-4">
              AGORA VOCÊ PODE COMEÇAR A EXPLORAR PROJETOS INCRÍVEIS PARA APOIAR,
              OU CRIAR SEU PRÓPRIO PROJETO PARA COMPARTILHAR SUA IDEIA COM O
              MUNDO.
            </span>
            <Button as="a" className="mt-5" href="/login">
              <Image
                src={logo}
                style={{ width: "70px", height: "70px" }}
                alt="Login"
              />
            </Button>
          </Card>
        ) : (
          <Card className="col-12 col-md-5">
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
                  <ApiErrors items={errorMessages} />
                )}
                <FormField title="Nome" name="name" type="text" required />
                <FormField
                  title="Apelido"
                  name="nickname"
                  type="text"
                  required
                />
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
        )}
      </Container>
    </div>
  );
}
