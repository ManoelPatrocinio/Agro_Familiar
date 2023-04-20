import { MagnifyingGlass, Question } from "phosphor-react";
import { useState } from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { Empty_search } from "../../../Components/Empty_search";
import { MenuOfDashboard } from "../../../Components/MenuOfDashboard";
import { Menu_Sidebar } from "../../../Components/Menu_Sidebar";
import { Pagination } from "../../../Components/Pagination";
import { ProductInList } from "../../../Components/ProductInList";
import { Load_spinner } from "../../../Components/load_spinner";
import { categoriesList } from "../../../Global/categoriesList";
import { Product } from "../../../Types/product.type";
import { User } from "../../../Types/user.type";
import Logo from "../../../assets/images/Logo.png";
import { api } from "../../../hook/useApi";
import { FirebaseDeleteFile } from "../../../service/firebase";

type productAndEntityInfo = {
  products: Product[];
  entity: User;
};

let total: number = 0; //number of products in the list, to calculate the number must be  pages shown

export function ManageProducts() {
  const { idUserLogged } = useParams();
  const [search, setSearch] = useState<string>("");
  const [productData, setProductData] = useState<Product[]>([]);
  const [offSet, setOffSet] = useState<number>(0);
  const Limit_perPage = 9; //cards number shown per page

  const {
    data: productAPi,
    isFetching,
    error,
  } = useQuery<productAndEntityInfo>(
    "manageProducts",
    async () => {
      const response = await api.get(
        `/admin/entity-all-products/${idUserLogged}`
      );
      filterByPagination(response.data.products, offSet);
      total = response.data.products.length;

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
    Swal.fire({
      icon: "question",
      title: "Deletar produto",
      showCancelButton: true,
      confirmButtonText: "Sim",
      text: "Tem certeja que deseja apagar esse produto ?",
    }).then(async (result) => {
      if (result.isConfirmed) {
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
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          })
          .catch((error) => {
            console.error("data", error);
            Swal.fire({
              icon: "error",
              title: "Oppss..",
              text: error.response.data.message,
              showConfirmButton: true,
            });
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          });
      }
    });
  }

  function setPagination(offset: number, productArray?: Product[]) {
    setOffSet(offset);
    productArray
      ? filterByPagination(productArray, offset)
      : productAPi?.products && filterByPagination(productAPi.products, offset);
  }
  function filterByPagination(products: Product[], off: number) {
    let page = off / Limit_perPage + 1 - 1;
    let start = page * Limit_perPage;
    let end = start + Limit_perPage;
    let list = products ? products.slice(start, end) : [];
    list.length > 0 && setProductData(list);
  }

  function filterByCategory(category: string) {
    setSearch("");
    setOffSet(0);
    if (category === "todos") {
      setPagination(offSet, productAPi?.products);
      total = productAPi?.products?.length!;
    } else {
      const filtedList = productAPi?.products?.filter(
        (item: Product) => item.p_category === category
      );
      total = filtedList?.length!;
      filtedList?.length! > 0
        ? setPagination(offSet, filtedList)
        : setProductData([]);
    }
  }
  const filteredProdList =
    search.length > 0
      ? productAPi?.products.filter((product: Product) =>
          product.p_name?.toLowerCase().includes(search.toLowerCase())
        )
      : [];

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
        <div className="w-full md:w-[75%] h-full px-8 pb-8">
          <h1 className="w-full text-center md:text-left text-md md:text-xl text-palm-700 font-semibold my-8">
            Gerenciar Produtos
          </h1>
          <div className="w-full flex flex-col md:flex-row justify-between items-end mb-4 md:mb-10">
            <div className="form-search hidden w-[33%] md:flex items-end ">
              <div className="w-10 h-10">
                <MagnifyingGlass size={32} color="#789B3D" mirrored />
              </div>
              <input
                type="text"
                placeholder="Busque Aqui..."
                className="w-10/12  text-sm text-gray-400 p-2 border-b-[1px] border-palm-700 rounded-br focus:outline-none"
                onChange={(e) => setSearch(e.target.value)}
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
                defaultValue={"todos"}
                onChange={(e) => filterByCategory(e.target.value)}
              >
                <option value="todos">Todos</option>
                <optgroup label="Agricultura">
                  {categoriesList.Agricultura.map((category: string) => (
                    <option
                      value={category}
                      key={category}
                      className="cursor-pointer"
                    >
                      {category}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Deriados">
                  {categoriesList.Derivados.map((category: string) => (
                    <option
                      value={category}
                      key={category}
                      className="cursor-pointer"
                    >
                      {category}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Pecuária">
                  {categoriesList.Pecuaria.map((category: string) => (
                    <option
                      value={category}
                      key={category}
                      className="cursor-pointer"
                    >
                      {category}
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>
          </div>

          {isFetching ? (
            <Load_spinner
              adicionalClass="w-full h-screen"
              message="Carregando Produtos ..."
            />
          ) : (
            <div className="w-full md:[30%] h-screen overflow-y-auto flex flex-col justify-start items-start pr-2 mb-6">
              {search?.length > 0 && (
                <>
                  {filteredProdList?.map((product: Product) => (
                    <ProductInList
                      product={product}
                      key={product._id}
                      alterStatus={alterProductStatus}
                      deleteProduct={removeProductById}
                    />
                  ))}
                </>
              )}

              {search?.length === 0 && (
                <>
                  {" "}
                  {productData.length === 0 ? (
                    <Empty_search
                      text="Você ainda não tem itens nesta categoria "
                      classAdicinonal="h-screen w-full justify-center"
                    />
                  ) : (
                    <>
                      {productData?.map((product: Product) => (
                        <ProductInList
                          product={product}
                          key={product._id}
                          alterStatus={alterProductStatus}
                          deleteProduct={removeProductById}
                        />
                      ))}
                    </>
                  )}
                </>
              )}
            </div>
          )}
          {productData.length > 0 && (
            <Pagination
              total={total}
              offSet={offSet}
              setOffSet={setPagination}
              limit={Limit_perPage}
            />
          )}
        </div>
      </div>
    </>
  );
}
