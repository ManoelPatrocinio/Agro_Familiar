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
import { Product } from "../../Types/product.type";
import { api } from "../../hook/useApi";

export function Products() {
  const [toggleFilterVisibility, SetToggleFilterVisibility] =
    useState<boolean>(false);

  const [productData, setProductData] = useState<Product[]>();

  useEffect(() => {
    api
      .get("/all-products")
      .then((response) => {
        console.log("response.data", response.data);
        setProductData(response.data);
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

  return (
    <>
      <Header />
      <Carrousel />

      <main className="flex items-start flex-col px-8 md:px-20">
        <SectionTitle title={"Destaques"} className={"my-6"} />
        <div className="relative w-full flex items-start justify-between ">
          <Filter_category
            ToggleFilterVisibility={SetToggleFilterVisibility}
            mobileVisiblity={toggleFilterVisibility}
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
              {productData?.map((product, index) => (
                <CardProduct product={product} key={index} />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
