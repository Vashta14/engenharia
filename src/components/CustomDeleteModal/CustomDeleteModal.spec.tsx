import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { CustomDeleteModal } from ".";
import { toast } from "react-toastify";

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
  },
}));

describe("CustomDeleteModal", () => {
  test("renders component and handles deletion", async () => {
    const setSuccessMock = jest.fn();
    const deleteFunctionMock = jest.fn();

    render(
      <CustomDeleteModal
        title="Delete Item"
        setSuccess={setSuccessMock}
        item="Example Item"
        itemType="ExampleType"
        deleteFunction={deleteFunctionMock}
      />
    );

    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByText(/Deseja remover o/i)).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(screen.getByText("Remover"));
    });

    await waitFor(() => {
      expect(deleteFunctionMock).toHaveBeenCalled();
      expect(toast.success).toHaveBeenCalledWith(
        "ExampleType Example Item removido com sucesso!"
      );
      expect(setSuccessMock).toHaveBeenCalledWith(true);
    });

    expect(screen.queryByText(/Deseja remover o/i)).toBeNull();
  });
});
