import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Entities } from "../Pages/Entities";
import { Entity } from "../Pages/Entity";
import { Home } from "../Pages/Home";
import { InfoEntity } from "../Pages/InfoEntitty/InfoEntity";
import { ProductDetail } from "../Pages/ProductDetail";
import { Products } from "../Pages/Products";
//   import { Login } from "../pages/Login";
//   import { Register } from "../pages/Register";
//   import { ContactUs } from "../pages/FaleConosco";

export const SystemRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Entities" element={<Entities />} />
        <Route path="/Entity" element={<Entity />} />
        <Route path="/Entity-info" element={<InfoEntity />} />
        <Route path="/Products" element={<Products />} />
        <Route path="/Product-detail" element={<ProductDetail />} />
        {/* <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/fale-conosco" element={<FaleConosco/>} /> */}
      </Routes>
    </BrowserRouter>
  );
};
