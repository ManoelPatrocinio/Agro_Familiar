import { Route, Routes } from "react-router-dom";
import { AboutUs } from "../Pages/AboutUs";
import { ContactUs } from "../Pages/ContactUs";
import { CreateProduct } from "../Pages/Dashboard/CreateProduct";
import { ManageProducts } from "../Pages/Dashboard/ManageProducts";
import { ManageProfile } from "../Pages/Dashboard/manageProfile";
import { Entities } from "../Pages/Entities";
import { EntityInfo } from "../Pages/EntittyInfo/EntityInfo";
import { Entity } from "../Pages/Entity";
import { Farmers } from "../Pages/Farmers";
import { Home } from "../Pages/Home";
import { ProductDetail } from "../Pages/ProductDetail";
import { Products } from "../Pages/Products";
import { RegisterEntity } from "../Pages/RegisterEntity";
import { RegisterFarmer } from "../Pages/RegisterFarmer";
import { WaitPage } from "../Pages/WaitPage";

export const SystemRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Entities" element={<Entities />} />
      <Route path="/my-shop/:userId" element={<Entity />} />
      <Route path="/Entity-info/:userId" element={<EntityInfo />} />
      <Route path="/Products" element={<Products />} />
      <Route path="/Product-detail/:productId" element={<ProductDetail />} />
      <Route path="/Farmers" element={<Farmers />} />
      <Route path="/AboutUs" element={<AboutUs />} />
      <Route path="/ContactUs" element={<ContactUs />} />
      <Route path="/Register-entity" element={<RegisterEntity />} />
      <Route path="/Register-farmer" element={<RegisterFarmer />} />
      <Route path="/WaitPage" element={<WaitPage />} />
      <Route path="/Admin/create-product" element={<CreateProduct />} />
      <Route
        path="/Admin/create-product/:productId"
        element={<CreateProduct />}
      />
      <Route path="/Admin/manager/:idUserLogged" element={<ManageProducts />} />
      <Route path="/Admin/my-profile/:entityId" element={<ManageProfile />} />
      {/* <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
   */}
    </Routes>
  );
};
