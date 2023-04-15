import { useEffect, useState } from "react";

import { Funnel } from "phosphor-react";
import Swal from "sweetalert2";
import { CardProduct } from "../../Components/CardProduct";
import { Carrousel } from "../../Components/Carrousel";
import { Dropdrown } from "../../Components/Dropdrown";
import { Filter_category } from "../../Components/Filter_category";
import { Footer } from "../../Components/Footer";
import { Header } from "../../Components/Header";
import { SectionTitle } from "../../Components/SectionTitle";
import { Load_spinner } from "../../Components/load_spinner";
import { Product } from "../../Types/product.type";
import { api } from "../../hook/useApi";

export function Products() {
  const [toggleFilterVisibility, SetToggleFilterVisibility] =
    useState<boolean>(false);

  const [productData, setProductData] = useState<Product[]>();
  const [productFiltedByCategory, setProductFiltedByCategory] = useState<
    Product[]
  >([]);

  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    api
      .get("/all-enable-products")
      .then((response) => {
        setProductData(response.data.products);
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Oppss",
          text: "Desculpe, não foi possível  exibir as informações do produto.",
        });
      });
  }, []);

  function filterByCategory(category: string) {
    setSearch("");

    const filtedList = productData?.filter(
      (item) => item.p_category === category
    );
    setProductFiltedByCategory(filtedList!);
  }

  const filteredProdList =
    search.length > 0
      ? productData?.filter((product) =>
          product.p_name?.toLowerCase().includes(search.toLowerCase())
        )
      : [];

  return (
    <>
      <Header setSearch={setSearch} ItemSearched={search} />
      <Carrousel />

      <main className="flex items-start flex-col px-8 md:px-20">
        <SectionTitle title={"Destaques"} className={"my-6"} />
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
            <div className="w-full flex flex-wrap justify-around mt-4">
              {!productData && (
                <Load_spinner
                  adicionalClass="w-screen h-screen"
                  message="Carregando Produtos ..."
                />
              )}

              {search?.length > 0 && (
                <>
                  {filteredProdList?.map((product) => (
                    <CardProduct product={product} key={product._id} />
                  ))}
                </>
              )}

              {productFiltedByCategory.length > 0 &&
                search?.length === 0 &&
                productFiltedByCategory?.map((product) => (
                  <CardProduct product={product} key={product._id} />
                ))}

              {productFiltedByCategory.length === 0 &&
                search?.length === 0 &&
                productData?.map((product) => (
                  <CardProduct product={product} key={product._id} />
                ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
