import { useState } from "react";
import { useQuery } from "react-query";
import Swal from "sweetalert2";
import { CardProduct } from "../../Components/CardProduct";
import { Carrousel } from "../../Components/Carrousel";
import { Dropdrown } from "../../Components/Dropdrown";
import { Footer } from "../../Components/Footer";
import { Header } from "../../Components/Header";
import { SectionTitle } from "../../Components/SectionTitle";
import { Load_spinner } from "../../Components/load_spinner";
import { Product } from "../../Types/product.type";
import homePromotionImage1 from "../../assets/images/header_slide_2.jpg";
import { api } from "../../hook/useApi";
interface IPuchaseList {
  product: Product;
  quantity: number;
}
export function Home() {
  const [search, setSearch] = useState<string>("");
  const [productData, setProductData] = useState<Product[]>([]);

  const {
    data: productAPi,
    isFetching,
    error,
  } = useQuery<Product[]>(
    "homeGetAllProd",
    async () => {
      const response = await api.get("/all-enable-products");
      return response.data.products;
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
  const filteredProdList =
    search.length > 0
      ? productAPi?.filter((product) =>
          product.p_name?.toLowerCase().includes(search.toLowerCase())
        )
      : [];

  function filteredProdListByOrderType(orderType: string) {
    let filtedList: Product[] = [];

    if (orderType === "Menor Preço") {
      filtedList = productAPi!.sort((prev, next) => {
        return prev.p_price! - next.p_price!;
      });
    } else if (orderType === "Maior Preço") {
      filtedList = productAPi!.sort((prev, next) => {
        return next.p_price! - prev.p_price!;
      });
    } else if (orderType === "De A a Z") {
      filtedList = productAPi!.sort((prev, next) => {
        let prevUpperCase = prev.p_name?.toUpperCase(),
          nextUpperCase = next.p_name?.toUpperCase();
        return prevUpperCase == nextUpperCase
          ? 0
          : prevUpperCase! > nextUpperCase!
          ? 1
          : -1;
      });
    } else if (orderType == "De Z a A") {
      filtedList = productAPi!.sort((prev, next) => {
        let prevUpperCase = prev.p_name?.toUpperCase(),
          nextUpperCase = next.p_name?.toUpperCase();
        return prevUpperCase == nextUpperCase
          ? 0
          : nextUpperCase! > prevUpperCase!
          ? 1
          : -1;
      });
    }
    setProductData(filtedList);
  }

  return (
    <>
      <Header setSearch={setSearch} ItemSearched={search} />
      <Carrousel />

      <main className="w-full flex items-start flex-col px-1 md:px-20 ">
        <SectionTitle title={"Destaques"} className={"my-6 w-full"} />
        <Dropdrown
          items={["Menor Preço", "Maior Preço", "De A a Z", "De Z a A"]}
          setOptionOrder={filteredProdListByOrderType}
        />

        <div className="w-full flex flex-wrap justify-around pt-4 px-0 ">
          {isFetching && (
            <Load_spinner
              adicionalClass="w-screen h-screen"
              message="Carregando Produtos ..."
            />
          )}
          {search?.length > 0 ? (
            <>
              {filteredProdList?.map((product) => (
                <CardProduct product={product} key={product._id} />
              ))}
            </>
          ) : (
            <>
              {productData?.map((product) => (
                <CardProduct product={product} key={product._id} />
              ))}
            </>
          )}
        </div>
        <div
          className="w-full  h-48 md:h-80 flex md:flex-col md:justify-center  items-center md:items-start  bg-no-repeat bg-[length:100%_100%] rounded"
          style={{ backgroundImage: `url(${homePromotionImage1})` }}
        >
          <div className="w-full md:w-1/2 md:ml-8 p-2 md:p-0 ">
            <h3 className="w-full  text-left text-sm md:text-xl text-palm-500 font-display  font-bold mb-4 md:mb-8  drop-shadow-xl">
              Encontre e negocie diretamente com os produtores da sua região
            </h3>

            <p className="w-[80%] text-left text-xs md:text-md  text-white md:leading-8 font-semibold drop-shadow-xl">
              Além de informações e contato direto, para negociar preço e
              entrega. Tudo rápido, fácil e gratuito !
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
