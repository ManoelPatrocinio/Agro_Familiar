import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AboutUs } from "../Pages/AboutUs";
import { ContactUs } from "../Pages/ContactUs";
import { Entities } from "../Pages/Entities";
import { Entity } from "../Pages/Entity";
import { Home } from "../Pages/Home";
import { InfoEntity } from "../Pages/InfoEntitty/InfoEntity";
import { ProductDetail } from "../Pages/ProductDetail";
import { Products } from "../Pages/Products";
//   import { Login } from "../Pages/Login";
//   import { Register } from "../Pages/Register";

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
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/ContactUs" element={<ContactUs/>} />
        {/* <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
   */}
      </Routes>
    </BrowserRouter>
  );
};
