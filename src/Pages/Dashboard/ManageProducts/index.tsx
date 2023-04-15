import { MagnifyingGlass, Question } from "phosphor-react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { MenuOfDashboard } from "../../../Components/MenuOfDashboard";
import { Menu_Sidebar } from "../../../Components/Menu_Sidebar";
import { ProductInList } from "../../../Components/ProductInList";
import { Load_spinner } from "../../../Components/load_spinner";
import { Product } from "../../../Types/product.type";
import { User } from "../../../Types/user.type";
import Logo from "../../../assets/images/Logo.png";
import { api } from "../../../hook/useApi";
import { FirebaseDeleteFile } from "../../../service/firebase";

type productAndEntityInfo = {
  products: Product[];
  entity: User;
};
export function ManageProducts() {
  const { idUserLogged } = useParams();

  const {
    data: apiProducts,
    isFetching,
    error,
  } = useQuery<productAndEntityInfo>(
    "manageProducts",
    async () => {
      const response = await api.get(
        `/admin/entity-all-products/${idUserLogged}`
      );
      return response.data;
    },
    {
      staleTime: 1000 * 60, // 1 minute
    }
  );

  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oppss",
      text: "Desculpe, não foi possível  exibir os produtos, tente novamente, por favor",
    });
  }

  async function alterProductStatus(productId: string) {
    await api
      .put(`/admin/alter-products-status/${productId}`)
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "Success !",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1700);
      })
      .catch((error) => {
        console.error("data", error);
        Swal.fire({
          icon: "error",
          title: error.response.data.message,
          showConfirmButton: true,
        });
      });
  }
  async function removeProductById(produc: Product) {
    produc.p_images?.forEach(async (ImageUrl) => {
      const splits = ImageUrl.split("%2F");
      const imgName = splits[1].split("?alt");
      await FirebaseDeleteFile(imgName![0], "products");
    });

    await api
      .delete(`/admin/remove-product-byId/${produc._id}`)
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "Success !",
          text: response.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.error("data", error);
        Swal.fire({
          icon: "error",
          title: "Oppss..",
          text: error.response.data.message,
          showConfirmButton: true,
        });
      });
  }
  return (
    <>
      <header className="w-full md:hidden h-auto px-3 flex justify-between items-end">
        <Question size={40} color="#89B045" />
        <Link to="/" className="w-[9rem]  mt-4">
          {" "}
          <img
            src={Logo}
            alt="Logo"
            className="w-full object-cover"
            loading="lazy"
          />
        </Link>
        <Menu_Sidebar type="admin" />
      </header>
      <div className="flex ">
        <div className="hidden md:block w-[25%] min-h-full border-r border-gray-200 ">
          <MenuOfDashboard />
        </div>
        <div className="w-full md:w-[75%] h-full px-8">
          <h1 className="w-full text-center md:text-left text-md md:text-xl text-palm-700 font-semibold my-8">
            Gerenciar Produtos
          </h1>
          <div className="w-full flex flex-col md:flex-row justify-between items-end mb-4 md:mb-10">
            <div className="form-search hidden w-[33%] md:flex items-end ">
              <button className="w-10 h-10">
                <MagnifyingGlass size={32} color="#789B3D" mirrored />
              </button>
              <input
                type="text"
                placeholder="Busque Aqui..."
                className="w-10/12  text-sm text-gray-400 p-2 border-b-[1px] border-palm-700 rounded-br focus:outline-none"
              />
            </div>
            <div className="relative w-full h-12 mb-12 md:mb-8 md:hidden ">
              <input
                type="text"
                placeholder="Busque Aqui..."
                className="w-full h-full pl-2  border-[1px] rounded border-palm-700  focus:outline-none"
              />
              <MagnifyingGlass
                size={24}
                color="#789B3D"
                className="absolute right-2 top-2"
              />
            </div>
            <div className="w-full md:w-[33%] flex items-end justify-start">
              <label
                htmlFor="manageSelectCategory"
                className="form-label inline-block  text-palm-700 mr-2"
              >
                Filtrar por:
              </label>

              <select
                id="manageSelectCategory"
                className="form-select appearance-none
                      block
                      
                      px-3
                      
                      text-base
                      font-normal
                      text-gray-700
                      bg-white bg-clip-padding bg-no-repeat
                      border-b border-solid border-palm-700
                      rounded
                      transition
                      ease-in-out
                      m-0
                      cursor-pointer
                      focus:text-gray-700 focus:bg-white focus:outline-none"
                aria-label="Default select example"
              >
                <option value="">Selecione</option>
                <optgroup label="Agricultura">
                  <option value="Milho">Milho</option>
                  <option value="Feijão">Feijão</option>
                  <option value="Mandioca">Mandioca</option>
                  <option value="Hortaliças">Hortaliças</option>
                  <option value="Frutas">Frutas</option>
                </optgroup>
                <optgroup label="Deriados">
                  <option value="Pães/Bolos/Biscoitos">
                    Pães/Bolos/Biscoitos
                  </option>
                  <option value="Doces">Doces </option>
                  <option value="Bebidas">Bebidas </option>
                  <option value="Temperos">Temperos</option>
                  <option value="Outros">Outros</option>
                </optgroup>
                <optgroup label="Pecuária">
                  <option value="Bovinos">Bovinos </option>
                  <option value="Capríno/Ovínos">Capríno/Ovínos </option>
                  <option value="Suínos">Suínos </option>
                  <option value=" Áves"> Áves</option>
                  <option value="Piscícultura">Piscícultura</option>
                </optgroup>
              </select>
            </div>
          </div>

          {isFetching ? (
            <Load_spinner
              adicionalClass="w-full h-screen"
              message="Carregando Produtos,aguarde ..."
            />
          ) : (
            <div className="w-full md:[30%] h-screen overflow-y-auto flex flex-col justify-start items-start pr-2">
              {apiProducts?.products.map((product, index) => (
                <ProductInList
                  product={product}
                  key={index}
                  alterStatus={alterProductStatus}
                  deleteProduct={removeProductById}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
