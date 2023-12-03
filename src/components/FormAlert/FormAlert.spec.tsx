import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { FormAlert } from ".";

describe("FormAlert", () => {
  const onCloseMock = jest.fn();

  it("renders success alert", () => {
    render(
      <FormAlert variant="success" show onClose={onCloseMock}>
        Mensagem de sucesso!
      </FormAlert>
    );

    const successAlert = screen.getByText("Mensagem de sucesso!");
    expect(successAlert).toBeInTheDocument();
    expect(successAlert).toHaveClass("alert-success");
  });

  it("renders danger alert", () => {
    render(
      <FormAlert variant="danger" show onClose={onCloseMock} dismissible>
        Mensagem de erro!
      </FormAlert>
    );

    const dangerAlert = screen.getByText("Mensagem de erro!");
    expect(dangerAlert).toBeInTheDocument();
    expect(dangerAlert).toHaveClass("alert-danger");
  });

  it("renders warning alert", () => {
    render(
      <FormAlert variant="warning" show onClose={onCloseMock}>
        Mensagem de aviso!
      </FormAlert>
    );
    const warningAlert = screen.getByText("Mensagem de aviso!");
    expect(warningAlert).toBeInTheDocument();
    expect(warningAlert).toHaveClass("alert-warning");
  });

  it("calls onClose when close button is clicked", () => {
    render(
      <FormAlert variant="warning" show onClose={onCloseMock} dismissible>
        This is a warning message.
      </FormAlert>
    );

    fireEvent.click(screen.getByRole("button"));
    expect(onCloseMock).toHaveBeenCalled();
  });
});
