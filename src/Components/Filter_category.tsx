import classNames from "classnames";
import { X } from "phosphor-react";
import { categoriesList } from "../Global/categoriesList";

type FilterProps = {
  ToggleFilterVisibility: any;
  mobileVisiblity: boolean;
  filterByCategory: (category: string) => void;
};
export function Filter_category({
  ToggleFilterVisibility,
  mobileVisiblity,
  filterByCategory,
}: FilterProps) {
  return (
    <div
      className={classNames(" transition-all", {
        "block fixed right-[-2rem] top-[0] min-h-screen h-auto w-[90%] z-10 py-4 px-2 bg-white  shadow-md shadow-gray-400":
          mobileVisiblity,
        "hidden md:block md:w-1/4 border-[1px] border-palm-700 rounded px-4 py-2":
          !mobileVisiblity,
      })}
    >
      <X
        size={32}
        color="#789B3D"
        className="md:hidden absolute left-1 top-1"
        onClick={() => ToggleFilterVisibility(!mobileVisiblity)}
      />

      <h3 className="w-full text-center text-lg text-palm-700">Filtre Por:</h3>

      <div className="w-full my-4">
        <li className="w-full  text-sm my-1 list-none">
          <button
            onClick={() => filterByCategory("Produtos")}
            className="w-full text-left text-sm font-semibold text-palm-700 mb-4 "
          >
            Todos
          </button>
        </li>
        <h5 className="w-full text-left text-sm font-semibold text-palm-700 mb-4">
          Agricultura
        </h5>
        <ul className="w-full text-left ">
          {categoriesList.Agricultura.map((category) => (
            <li className="w-full  text-sm my-1 " key={category}>
              <button
                onClick={() => filterByCategory(category)}
                className="w-full h-full text-left py-3 hover:border-b-2 border-palm-500 hover:text-palm-500 hover:text-[1.063rem]  pl-2 rounded"
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full my-4">
        <h5 className="w-full text-left text-sm font-semibold text-palm-700 mb-4">
          Derivados
        </h5>
        <ul className="w-full text-left pl-2">
          {categoriesList.Derivados.map((category) => (
            <li className="w-full  text-sm my-1 " key={category}>
              <button
                onClick={() => filterByCategory(category)}
                className="w-full h-full text-left py-3 hover:border-b-2 border-palm-500 hover:text-palm-500 hover:text-[1.063rem]  pl-2 rounded"
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full my-4">
        <h5 className="w-full text-left text-sm font-semibold text-palm-700 mb-4">
          Pecuária
        </h5>
        <ul className="w-full text-left pl-2">
          {categoriesList.Pecuaria.map((category) => (
            <li className="w-full  text-sm my-1 " key={category}>
              <button
                onClick={() => filterByCategory(category)}
                className="w-full h-full text-left py-3 hover:border-b-2 border-palm-500 hover:text-palm-500 hover:text-[1.063rem]  pl-2 rounded"
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
