import React from "react";
import ReactDOM from "react-dom/client";
import "./Global/styles.css";

import { QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { ModalRegister } from "./Components/ModalRegister";
import { SystemRoutes } from "./Routers/router";
import { PuchaseListProvider } from "./context/PuchaseListContext";
import { UserLoggedProvider } from "./context/UserLoggedContext";
import { queryClient } from "./service/queryClient";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <UserLoggedProvider>
          <PuchaseListProvider>
            <SystemRoutes />
          </PuchaseListProvider>
        </UserLoggedProvider>
      </QueryClientProvider>
    </BrowserRouter>
    <ToastContainer />
    <ModalRegister />
  </React.StrictMode>
);
