import {
    BrowserRouter,
    Routes,
    Route
  } from "react-router-dom";
  import { Home } from "../Pages/Home";
  import { Entities } from "../Pages/Entities";
//   import { Login } from "../pages/Login";
//   import { Register } from "../pages/Register";
//   import { ContactUs } from "../pages/FaleConosco";

  
export  const SystemRoutes = () => {
    return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/Entities" element={<Entities/>} />
            {/* <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/fale-conosco" element={<FaleConosco/>} /> */}

        </Routes>
      </BrowserRouter>
    )
};