type FilterProps ={
  mobileVisiblity: boolean
}
export function Filter_category({mobileVisiblity}:FilterProps) {

  return (
    <div className={ 
      mobileVisiblity 
        ? `block absolute right-[-2rem] top-[3.5rem] min-h-screen h-auto w-[90%] z-10 py-4 px-2 bg-white  shadow-md shadow-gray-400`
        : `hidden md:block md:w-1/4 border-[1px] border-palm-700 rounded px-4 py-2`
    }>
      <h3 className="w-full text-center text-lg text-palm-700">Filtre Por:</h3>

      <div className="w-full my-4">
        <h5 className="w-full text-left text-sm font-semibold text-palm-700 mb-4">
          Agricultura
        </h5>
        <ul className="w-full text-left pl-2">
          <li className="w-full text-left text-sm my-1 py-3">Milho</li>
          <li className="w-full text-left text-sm my-1 py-3">Feijão</li>
          <li className="w-full text-left text-sm my-1 py-3">Mandioca</li>
          <li className="w-full text-left text-sm my-1 py-3">Hotaliças</li>
          <li className="w-full text-left text-sm my-1 py-3">Frutas</li>
        </ul>
      </div>
      <div className="w-full my-4">
        <h5 className="w-full text-left text-sm font-semibold text-palm-700 mb-4">
          Derivados
        </h5>
        <ul className="w-full text-left pl-2">
          <li className="w-full text-left text-sm my-1 py-1">
            Pães/Bolos/Biscoitos
          </li>
          <li className="w-full text-left text-sm my-1 py-3">Doces</li>
          <li className="w-full text-left text-sm my-1 py-3">Bebidas</li>
          <li className="w-full text-left text-sm my-1 py-3">Tempores</li>
          <li className="w-full text-left text-sm my-1 py-3">Outros</li>
        </ul>
      </div>
      <div className="w-full my-4">
        <h5 className="w-full text-left text-sm font-semibold text-palm-700 mb-4">
          Pecuária
        </h5>
        <ul className="w-full text-left pl-2">
          <li className="w-full text-left text-sm my-1 py-3">Bovinos</li>
          <li className="w-full text-left text-sm my-1 py-3">Capríno/Ovínos</li>
          <li className="w-full text-left text-sm my-1 py-3">Suínos</li>
          <li className="w-full text-left text-sm my-1 py-3"> Áves</li>
          <li className="w-full text-left text-sm my-1 py-3">Piscícultura</li>
        </ul>
      </div>
    </div>
  );
}
