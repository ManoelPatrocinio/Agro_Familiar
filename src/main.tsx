import React from 'react';
import ReactDOM from 'react-dom/client';
import './Global/styles.css';

import { QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { ModalRegister } from './Components/ModalRegister';
import { SystemRoutes } from './Routers/router';
import { AuthProvider } from './context/AuthContext';
import { PuchaseListProvider } from './context/PuchaseListContext';
import { queryClient } from './service/queryClient';
import { ModalHelp } from './Components/ModalHelp';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <PuchaseListProvider>
          <SystemRoutes />
        </PuchaseListProvider>
      </AuthProvider>
    </QueryClientProvider>

    <ToastContainer autoClose={1000}/>
    <ModalRegister />
    <ModalHelp/>
  </React.StrictMode>
);
