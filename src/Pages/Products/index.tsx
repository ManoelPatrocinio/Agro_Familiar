import { useState } from "react";

import { Funnel } from "phosphor-react";
import { useQuery } from "react-query";
import Swal from "sweetalert2";
import { CardProduct } from "../../Components/CardProduct";
import { Carrousel } from "../../Components/Carrousel";
import { Dropdrown } from "../../Components/Dropdrown";
import { Empty_search } from "../../Components/Empty_search";
import { Filter_category } from "../../Components/Filter_category";
import { Footer } from "../../Components/Footer";
import { Header } from "../../Components/Header";
import { Pagination } from "../../Components/Pagination";
import { SectionTitle } from "../../Components/SectionTitle";
import { Load_spinner } from "../../Components/load_spinner";
import { Product } from "../../Types/product.type";
import { api } from "../../hook/useApi";

let total: number = 0; //number of products in the list, to calculate the number must be  pages shown

export function Products() {
  const [toggleFilterVisibility, SetToggleFilterVisibility] =
    useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [productData, setProductData] = useState<Product[]>([]);
  const [offSet, setOffSet] = useState<number>(0);
  const Limit_perPage = 9; //cards number shown per page
  const {
    data: productAPi,
    isFetching,
    error,
  } = useQuery<Product[]>(
    ["productsPage"],
    async () => {
      const response = await api.get("/all-enable-products");
      filterByPagination(response.data.products, offSet);
      console.log(
        "response.data.products.length",
        response.data.products.length
      );

      total = response.data.products.length;
      return response.data.products;
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oppss",
      text: "Desculpe, não foi possível  exibir suas informações, tente novamente, por favor",
    });
  }

  function setPagination(offset: number, productArray?: Product[]) {
    setOffSet(offset);
    productArray
      ? filterByPagination(productArray, offset)
      : productAPi && filterByPagination(productAPi, offset);
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
      setPagination(offSet, productAPi);
      total = productAPi?.length!;
    } else {
      const filtedList = productAPi?.filter(
        (item) => item.p_category === category
      );
      total = filtedList?.length!;
      filtedList?.length! > 0
        ? setPagination(offSet, filtedList)
        : setProductData([]);
    }
  }

  const filteredProdList =
    search.length > 0
      ? productData?.filter((product) =>
          product.p_name?.toLowerCase().includes(search.toLowerCase())
        )
      : [];
  console.log("total", total);
  return (
    <>
      <Header setSearch={setSearch} ItemSearched={search} />
      <Carrousel />

      <main className="flex items-start flex-col px-8 md:px-20">
        <SectionTitle title={"Produtos"} className={"my-6"} />
        <div className="relative w-full flex items-start justify-between ">
          <Filter_category
            ToggleFilterVisibility={SetToggleFilterVisibility}
            mobileVisiblity={toggleFilterVisibility}
            filterByCategory={filterByCategory}
          />
          <div className="w-full md:w-3/4 flex flex-col  items-start">
            <div className="w-full flex justify-between md:justify-start ">
              <Dropdrown
                items={["Menor Preço", "Maior Preço", "De A a Z", "De Z a A"]}
              />
              <button
                onClick={() =>
                  SetToggleFilterVisibility(!toggleFilterVisibility)
                }
                className=" md:hidden text-xs text-gray-800 flex items-center whitespace-nowrap "
              >
                <Funnel size={20} className="mr-2" />
                Filtrar
              </button>
            </div>
            <div className="w-full min-h-screen flex flex-wrap justify-around my-4 pt-6">
              {isFetching ? (
                <Load_spinner
                  adicionalClass="w-screen h-screen"
                  message="Carregando Produtos ..."
                />
              ) : (
                <>
                  {search?.length > 0 && (
                    <>
                      {filteredProdList?.map((product) => (
                        <CardProduct product={product} key={product._id} />
                      ))}
                    </>
                  )}

                  {search?.length === 0 && (
                    <>
                      {" "}
                      {productData.length === 0 ? (
                        <Empty_search
                          text="Ainda não temos itens nesta categoria "
                          classAdicinonal="h-screen w-full justify-center"
                        />
                      ) : (
                        <>
                          {productData?.map((product) => (
                            <CardProduct product={product} key={product._id} />
                          ))}
                        </>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
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
      </main>
      <Footer />
    </>
  );
}
