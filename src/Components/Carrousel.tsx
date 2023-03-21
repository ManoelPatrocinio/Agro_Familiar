import ImgHeaderCarousel_1 from "../assets/images/header_slide_1.png";
import ImgHeaderCarousel_2 from "../assets/images/header_slide_2.jpg";

export function Carrousel() {
  return (
    <div
      id="carouselExampleCrossfade"
      className="carousel slide carousel-fade relative w-full h-52 md:h-[27rem] md:min-h-[60vh]  mt-6 mx-auto  "
      data-bs-ride="carousel"
    >
      <div className="carousel-indicators absolute right-0 bottom-0 left-0 flex justify-center p-0 mb-4">
        <button
          type="button"
          data-bs-target="#carouselExampleCrossfade"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCrossfade"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCrossfade"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div className="carousel-inner relative w-full h-full overflow-hidden ">
        <div className="carousel-item active float-left w-full h-full">
          <img
            src={ImgHeaderCarousel_1}
            className="block w-full h-full"
            alt="slide o melhor da agricultura familiar da sua região "
            loading="lazy"
          />
        </div>
        <div className="carousel-item float-left w-full h-full">
          <div
            className="w-full  h-full flex md:flex-col md:justify-start  items-center md:items-start   bg-no-repeat bg-[length:100%_100%] "
            style={{ backgroundImage: `url(${ImgHeaderCarousel_2})` }}
          >
            <div className="w-full md:w-1/2  md:mt-28 md:ml-12 p-4 md:p-0 ">
              <h3 className="w-full  text-left text-sm md:text-4xl text-palm-500 font-display  font-bold mb-4 md:mb-8  drop-shadow-xl">
                Encontre e negocie diretamente com os produtores da sua região
              </h3>

              <p className="w-[80%] text-left text-xs md:text-md  text-white md:leading-8 font-semibold drop-shadow-xl">
                Além de informações e contato direto, para negociar preço e
                entrega. Tudo rápido, fácil e gratuito !
              </p>
            </div>
          </div>
        </div>
        <div className="carousel-item float-left w-full h-full">
          <img
            src="https://mdbcdn.b-cdn.net/img/new/slides/043.webp"
            className="block w-full h-full"
            alt="Exotic Fruits"
            loading="lazy"
          />
        </div>
      </div>
      <button
        className="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
        type="button"
        data-bs-target="#carouselExampleCrossfade"
        data-bs-slide="prev"
      >
        <span
          className="carousel-control-prev-icon inline-block bg-no-repeat"
          aria-hidden="true"
        ></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
        type="button"
        data-bs-target="#carouselExampleCrossfade"
        data-bs-slide="next"
      >
        <span
          className="carousel-control-next-icon inline-block bg-no-repeat"
          aria-hidden="true"
        ></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
