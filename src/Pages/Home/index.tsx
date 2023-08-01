import axios from "axios";
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
import Logo_Barra from "../../assets/images/barra_logo.png";
import Logo_Irece from "../../assets/images/irece_logo.png";
import Supporters_img_bg from "../../assets/images/supporters.png";
import Logo_Xique from "../../assets/images/xique_logo.png";
import Logo_Embrapa from "../../assets/images/embrapa.png";
import Logo_Buritirama from "../../assets/images/buritirama.png";
import { api } from "../../hook/useApi";

const backendUrl = import.meta.env.VITE_BACKEND_PORT;
export function Home() {
  const [search, setSearch] = useState<string>("");
  const [productsMostRating, setProductMostRating] = useState<Product[]>([]);
  const [productsRecents, setProductRecents] = useState<Product[]>([]);
  const [city, setCity] = useState<string | null>(null);

  const {
    data: allProducts,
    isFetching,
    error,
  } = useQuery<Product[]>(
    ["homeGetAllProd", city],
    async () => {
      //getUserPosition();
      getProductsForSections();
      const response = await api.get(`/all-enable-products/?city=${city}`);
      return response.data.products;
    }
    // {
    //   staleTime: 1000 * 60, // 1 minute
    // }
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
      ? allProducts?.filter((product) =>
          product.p_name?.toLowerCase().includes(search.toLowerCase())
        )
      : [];

  async function getProductsForSections() {
    axios
      .all([
        axios.get(`${backendUrl}/most-rating/?city=${city}`),
        axios.get(`${backendUrl}/racent-added/?city=${city}`),
      ])
      .then(
        axios.spread((productsMostRating, productsRecentAdded) => {
          setProductMostRating(productsMostRating.data.products),
            setProductRecents(productsRecentAdded.data.products);
        })
      );
  }
  async function getUserPosition() {
    if ("geolocation" in navigator) {
      await navigator.geolocation.getCurrentPosition(function (position) {
        const lat: number = position.coords.latitude;
        const long: number = position.coords.longitude;
        if (lat && long) {
          axios
            .get(
              `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${long}&format=json`
            )
            .then((response) => {
              console.log("response", response.data.address.city);
            })
            .catch((err) => {
              console.log("erro get location", err);
            });
        }
      });
    } else {
      alert("Not Available");
    }
  }

  return (
    <>
      <Header
        setSearch={setSearch}
        ItemSearched={search}
        filterByCity={setCity}
      />
      <Carrousel />

      <main className="w-full flex items-start flex-col px-1 lg:px-20 ">
        <SectionTitle title={"Destaques"} className={"my-6 w-full"} />

        <div className="w-full flex flex-wrap justify-around gap-4 pt-4 px-2 ">
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
                  {productsMostRating.map((product) => (
                    <CardProduct product={product} key={product._id} />
                  ))}
                </>
              )}
            </>
          )}
        </div>
        <div
          id="section-separate1"
          className="w-full  h-48 md:h-80  carrousel-with-bgImg my-4 rounded"
        ></div>
        <SectionTitle title={"Recém Adicionados"} className={"my-6 w-full"} />
        <div className="w-full flex flex-wrap  justify-around gap-4 pt-4 px-2 ">
          {isFetching ? (
            <Load_spinner
              adicionalClass="w-screen h-screen"
              message="Carregando Produtos ..."
            />
          ) : (
            <>
              {productsRecents.map((product) => (
                <CardProduct product={product} key={product._id} />
              ))}
            </>
          )}
        </div>
        <div className=" w-full  h-48 md:h-64 bg-[#F1EFE9] flex  justify-between  items-center my-4 rounded">
          <div className="hidden md:block w-1/2 h-full">
            <img
              src={Supporters_img_bg}
              alt="Images backgound apoiadores"
              className="w-full h-full"
            />
          </div>
          <div className="w-full md:w-1/2 h-full flex flex-col justify-center">
            <h3 className="w-full h-[15%]  text-center  text-md md:text-[24px] text-palm-700 font-semibold font-display  ">
              Nossos Apoiadores
            </h3>
            <div
              id="carouselSupportersCrossfade"
              className="carousel slide carousel-fade relative w-full h-[75%]"
              data-bs-ride="carousel"
            >
              <div className="carousel-indicators absolute right-0 bottom-0 left-0 flex justify-center p-0 mt-4 ">
                <button
                  type="button"
                  className="active section_separation__carrousel-indicator "
                  data-bs-target="#carouselSupportersCrossfade"
                  data-bs-slide-to="0"
                  aria-current="true"
                  aria-label="Slide 1"
                ></button>
                <button
                  type="button"
                  className="section_separation__carrousel-indicator"
                  data-bs-target="#carouselSupportersCrossfade"
                  data-bs-slide-to="1"
                  aria-label="Slide 2"
                ></button>
              </div>
              <div className="carousel-inner relative w-full h-full overflow-hidden ">
                <div className="carousel-item  active float-left w-full h-full ">
                  <div className="w-full h-full flex justify-evenly items-center">
                    <img
                      src={Logo_Barra}
                      className=" w-1/3 h-1/2  aspect-[4/3] object-contain"
                      alt="logo"
                    />
                    <img
                      src={Logo_Irece}
                      className=" w-1/3 h-1/2  aspect-[4/3] object-contain"
                      alt="logo"
                    />
                    <img
                      src={Logo_Xique}
                      className=" w-1/3 h-1/2 aspect-[4/3] object-contain"
                      alt="logo"
                    />
                  </div>
                </div>
                <div className="  carousel-item  float-left w-full h-full">
                  <div className="w-full h-full flex justify-evenly items-center">
                    <img
                      src={Logo_Embrapa}
                      className="w-1/3 h-1/2 aspect-[4/3] object-contain"
                      alt="logo"
                    />
                    <img
                      src={Logo_Buritirama}
                      className=" w-1/3 h-1/2 aspect-[4/3] object-contain"
                      alt="logo"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
