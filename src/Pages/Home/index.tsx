import { useEffect, useState } from "react";
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
import { CheckLocalStorage } from "../../service/localStorage";
interface IPuchaseList {
  product: Product;
  quantity: number;
}
export function Home() {
  const [purchaseList, setPurchaseList] = useState<IPuchaseList[]>([]);
  const [search, setSearch] = useState<string>("");

  const {
    data: apiProducts,
    isFetching,
    error,
  } = useQuery<Product[]>(
    "homeGetAllProd",
    async () => {
      const response = await api.get("/all-products");
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
  const filteredProdList =
    search.length > 0
      ? apiProducts?.filter((product) =>
          product.p_name?.toLowerCase().includes(search.toLowerCase())
        )
      : [];

  useEffect(() => {
    setPurchaseList(CheckLocalStorage.getItemPurchaseList());
  }, []);
  const useAddToPuchaseList = (product: Product) => {
    // const item = products.find((product) => product._id === id);

    const alreadyInPuchaseList = purchaseList.find(
      (item) => item.product._id === product._id
    );

    if (alreadyInPuchaseList) {
      const newPuchaseList: IPuchaseList[] = purchaseList.map((item) => {
        if (item.product._id === product._id)
          ({
            ...item,
            quantity: item.quantity++,
          });
        return item;
      });
      setPurchaseList(newPuchaseList);
      localStorage.setItem("@PAF:purchase", JSON.stringify(newPuchaseList));
      return;
    }
    //if product is not already in puchase list
    const listItem: IPuchaseList = {
      product: product!,
      quantity: 1,
    };
    const newPuchaseList: IPuchaseList[] = [...purchaseList, listItem];
    setPurchaseList(newPuchaseList);
    localStorage.setItem("@PAF:purchase", JSON.stringify(newPuchaseList));
  };
  return (
    <>
      <Header setSearch={setSearch} ItemSearched={search} />
      <Carrousel />

      <main className="w-full flex items-start flex-col px-1 md:px-20 ">
        <SectionTitle title={"Destaques"} className={"my-6 w-full"} />
        <Dropdrown
          items={["Menor Preço", "Maior Preço", "De A a Z", "De Z a A"]}
        />
        {isFetching && (
          <div className="w-full h-[50vh] flex flex-col justify-center items-center">
            <div className="flex items-center justify-center">
              <div
                className="inline-block h-20 w-20 animate-spin rounded-full text-palm-700 border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] mb-8"
                role="status"
              >
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                  Loading...
                </span>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-palm-700">
              Carregando produtos
            </h3>
          </div>
        )}
        <div className="w-full flex flex-wrap justify-around pt-4 px-0 ">
          {!apiProducts && <Load_spinner adicionalClass="w-screen h-screen" />}
          {search?.length > 0 ? (
            <>
              {filteredProdList?.map((product, index) => (
                <CardProduct
                  product={product}
                  key={index}
                  addPurchaseList={useAddToPuchaseList}
                />
              ))}
            </>
          ) : (
            <>
              {apiProducts?.map((product, index) => (
                <CardProduct
                  product={product}
                  key={index}
                  addPurchaseList={useAddToPuchaseList}
                />
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
