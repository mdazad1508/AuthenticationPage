import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";
import { AuthContexProvider } from "./store/auth-contex";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContexProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthContexProvider>
);
