import ImgHeaderCarousel_1 from "../assets/images/header_slide_1.png"
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
      <div className="carousel-inner relative w-full h-full overflow-hidden rounded">
        <div className="carousel-item active float-left w-full h-full">
          <img
            src={ImgHeaderCarousel_1}
            className="block w-full h-full"
            alt="slide o melhor da agricultura familiar da sua região "
          />
        </div>
        <div className="carousel-item float-left w-full h-full">
          <img
            src="https://mdbcdn.b-cdn.net/img/new/slides/042.webp"
            className="block w-full h-full"
            alt="Camera"
          />
        </div>
        <div className="carousel-item float-left w-full h-full">
          <img
            src="https://mdbcdn.b-cdn.net/img/new/slides/043.webp"
            className="block w-full h-full"
            alt="Exotic Fruits"
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
