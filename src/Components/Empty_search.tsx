import Img_emiji_smile from "../assets/images/emiji_smile.png";
interface IProp {
  text: string;
  classAdicinonal?: string;
}
export function Empty_search({ text, classAdicinonal }: IProp) {
  return (
    <div
      className={
        classAdicinonal
          ? "flex flex-col items-center text-center  " + classAdicinonal
          : "w-full h-full flex flex-col justify-center items-center text-center"
      }
    >
      <div className="img_wrapper w-[9rem] h-[9rem] md:w-[11rem] md:h-[11rem] mb-4">
        <img
          src={Img_emiji_smile}
          className="w-full h-full "
          alt="emoji icon"
        />
      </div>
      <h3 className="w-full text-gray-500 text-2xl  font-display mb-3">
        Ooppss...
      </h3>
      <h4 className="w-full text-gray-500 text-xl  font-display ">{text}</h4>
    </div>
  );
}
