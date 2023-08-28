import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import { Routers } from "./routers";

export default function App() {
  return (
    <BrowserRouter>
      <Routers />
    </BrowserRouter>
  );
}
