import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { FormField } from ".";
import { Form } from "react-bootstrap";

describe("FormField", () => {
  const onChangeMock = jest.fn();
  const onBlurMock = jest.fn();

  it("renders component with required field", () => {
    render(<FormField title="Test Field" name="test" type="text" required />);

    expect(screen.getByText("Test Field")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("renders component with optional field", () => {
    render(<FormField title="Test Field" name="test" type="text" />);

    expect(screen.getByText("Test Field")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.queryByText("*")).toBeNull();
  });

  it("renders component with value", () => {
    render(
      <FormField
        title="Test Field"
        name="test"
        type="text"
        value="Test Value"
        onChange={jest.fn()}
      />
    );

    expect(screen.getByRole("textbox")).toHaveValue("Test Value");
  });

  test("calls onChange when input value changes", () => {
    render(
      <FormField
        title="Test Field"
        name="test"
        type="text"
        onChange={onChangeMock}
        value="test"
      />
    );

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "New Value" },
    });
    expect(onChangeMock).toHaveBeenCalledWith(expect.any(Object));
  });

  test("calls onBlur when input loses focus", () => {
    render(
      <FormField
        title="Test Field"
        name="test"
        type="text"
        onBlur={onBlurMock}
        value="test"
        onChange={jest.fn()}
      />
    );

    fireEvent.blur(screen.getByRole("textbox"));
    expect(onBlurMock).toHaveBeenCalled();
  });

  it("renders component with feedback message", () => {
    render(
      <Form noValidate validated={true}>
        <FormField
          title="Test Field"
          name="test"
          type="text"
          required
          feedback="Esse campo é obrigatorio!"
        />
      </Form>
    );

    expect(screen.getByText("Esse campo é obrigatorio!")).toBeInTheDocument();
  });
});
