import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import { Routers } from "./routers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routers />
      </BrowserRouter>
      <ToastContainer theme="dark" />
    </>
  );
}
