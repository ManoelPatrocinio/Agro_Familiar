import React from 'react'
import ReactDOM from 'react-dom/client'
import './Global/styles.css'
import { SystemRoutes } from './Routers/router'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <SystemRoutes />
  </React.StrictMode>
)
