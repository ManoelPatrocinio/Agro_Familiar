import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AboutUs } from "../Pages/AboutUs";
import { ContactUs } from "../Pages/ContactUs";
import { CreateProduct } from "../Pages/Dashboard/CreateProduct";
import { Entities } from "../Pages/Entities";
import { Entity } from "../Pages/Entity";
import { Farmers } from "../Pages/Farmers";
import { Home } from "../Pages/Home";
import { InfoEntity } from "../Pages/InfoEntitty/InfoEntity";
import { ProductDetail } from "../Pages/ProductDetail";
import { Products } from "../Pages/Products";
import { RegisterEntity } from "../Pages/RegisterEntity";
import { RegisterFarmer } from "../Pages/RegisterFarmer";
import { WaitPage } from "../Pages/WaitPage";

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
        <Route path="/Farmers" element={<Farmers />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/Register-entity" element={<RegisterEntity />} />
        <Route path="/Register-farmer" element={<RegisterFarmer />} />
        <Route path="/WaitPage" element={<WaitPage />} />
        <Route path="/Admin/create-product" element={<CreateProduct />} />
        {/* <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
   */}
      </Routes>
    </BrowserRouter>
  );
};
