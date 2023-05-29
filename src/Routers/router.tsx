import { useContext } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AboutUs } from '../Pages/AboutUs';
import { ContactUs } from '../Pages/ContactUs';
import { CreateProduct } from '../Pages/Dashboard/CreateProduct';
import { EditProduct } from '../Pages/Dashboard/EditProduct';
import { ManageProducts } from '../Pages/Dashboard/ManageProducts';
import { ManageProfile } from '../Pages/Dashboard/manageProfile';
import { Entities } from '../Pages/Entities';
import { EntityInfo } from '../Pages/EntittyInfo/EntityInfo';
import { Entity } from '../Pages/Entity';
import { Farmers } from '../Pages/Farmers';
import { Home } from '../Pages/Home';
import { ProductDetail } from '../Pages/ProductDetail';
import { Products } from '../Pages/Products';
import { RegisterEntity } from '../Pages/RegisterEntity';
import { RegisterFarmer } from '../Pages/RegisterFarmer';
import { WaitPage } from '../Pages/WaitPage';
import { AuthContext } from '../context/AuthContext';
interface IprotectedRoute {
  isAllowed: boolean;
  redirectPath: string;
  children: JSX.Element;
}
const ProtectedRoute = ({
  isAllowed,
  redirectPath = '/',
  children,
}: IprotectedRoute) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export const SystemRoutes = () => {
  const { isAuthenticated, userLogged } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Entities' element={<Entities />} />
        <Route path='/my-shop/:userId' element={<Entity />} />
        <Route path='/Entity-info/:userId' element={<EntityInfo />} />
        <Route path='/Products' element={<Products />} />
        <Route path='/Product-detail/:productId' element={<ProductDetail />} />
        <Route path='/Farmers' element={<Farmers />} />
        <Route path='/AboutUs' element={<AboutUs />} />
        <Route path='/ContactUs' element={<ContactUs />} />
        <Route path='/Register-entity' element={<RegisterEntity />} />
        <Route path='/Register-farmer' element={<RegisterFarmer />} />
        <Route path='/WaitPage' element={<WaitPage />} />
        <Route
          path='/Admin/create-product'
          element={
            <ProtectedRoute
              isAllowed={!!isAuthenticated && userLogged?.u_type !== 'customer'}
              redirectPath='/'
            >
              <CreateProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path='/Admin/edit-product/:productId'
          element={
            <ProtectedRoute
              isAllowed={!!isAuthenticated && userLogged?.u_type !== 'customer'}
              redirectPath='/'
            >
              <EditProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path='/Admin/manager/:idUserLogged'
          element={
            <ProtectedRoute
              isAllowed={!!isAuthenticated && userLogged?.u_type !== 'customer'}
              redirectPath='/'
            >
              <ManageProducts />
            </ProtectedRoute>
          }
        />
        <Route
          path='/Admin/my-profile/:entityId'
          element={
            <ProtectedRoute
              isAllowed={!!isAuthenticated && userLogged?.u_type !== 'customer'}
              redirectPath='/'
            >
              <ManageProfile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
