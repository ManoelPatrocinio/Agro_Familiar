import React from "react";
import ReactDOM from "react-dom/client";
import "./Global/styles.css";

import { QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { ModalRegister } from "./Components/ModalRegister";
import { SystemRoutes } from "./Routers/router";
import { queryClient } from "./service/queryClient";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <SystemRoutes />
      </QueryClientProvider>
    </BrowserRouter>
    <ModalRegister />
  </React.StrictMode>
);
