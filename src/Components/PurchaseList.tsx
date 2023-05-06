import { Trash } from "phosphor-react";
import { useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";
import { PuchaseListContext } from "../context/PuchaseListContext";

export function PurchaseList() {
  const {
    AddToPuchaseList,
    RemoveToPuchaseList,
    DeleteProductToPuchaseList,
    SavePuchaseListOnBd,
    DeletePurchaseList,
    purchaseList,
  } = useContext(PuchaseListContext);
  const { isAuthenticated } = useContext(AuthContext);
  const TotalPuchaseList = purchaseList?.reduce((total, current) => {
    return total + current?.product.p_price! * current.quantity;
  }, 0);

  function handleDeletePurchaseList() {
    Swal.fire({
      icon: "question",
      title: "Excluir",
      showCancelButton: true,
      confirmButtonText: "Sim",
      text: "Deseja mesmo excluir sua lista de compra ?",
    }).then((result) => {
      if (result.isConfirmed) {
        DeletePurchaseList();
      }
    });
  }

  return (
    <div
      className="  offcanvas offcanvas-end fixed bottom-0 flex flex-col justify-between max-w-full max-h-[100vh] bg-white invisible bg-clip-padding shadow-lg drop-shadow-2xl outline-none transition duration-300 ease-in-out text-gray-700 top-0 right-0 border-none w-[90vw] md:w-[45vw]"
      tabIndex={-1}
      id="PurchaseList"
      aria-labelledby="PurchaseListLabel"
    >
      <div className="offcanvas-header h-[7%] flex items-center justify-between p-4">
        <h5
          className="w-full text-center text-md text-palm-700 mb-0 leading-normal font-semibold my-4"
          id="PurchaseListLabel"
        >
          Lista de Compra
        </h5>

        <button
          type="button"
          className="btn-close box-content w-4 h-4 p-2 -my-5 -mr-2 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body max-h-[70%] flex-grow p-4 overflow-y-auto ">
        {purchaseList && purchaseList.length > 0 && (
          <>
            {purchaseList?.map((item) => (
              <div
                key={item.product._id}
                className="w-full h-auto min-h-[8rem] flex items-center flex-wrap  justify-evenly md:justify-between border-b-2 border-b-green-400 py-3 mb-2"
              >
                <a
                  href={`/Product-detail/${item.product._id}`}
                  className="w-[6.25rem] h-[6.25rem] md:w-[25%] md:h-32 md:max-w-[30%] rounded mr-[1%] md:mr-0 "
                >
                  <img
                    src={item.product.p_images ? item.product.p_images[0] : ""}
                    alt={item.product.p_name}
                    className="w-full h-full rounded"
                    loading="lazy"
                  />
                </a>
                <div className="w-[64%] md:w-[50%] md:min-w-[50%] h-32 flex flex-col justify-around items-start px-2">
                  <h4 className="w-full text-left  text-md text-palm-700 whitespace-nowrap text-ellipsis overflow-hidden">
                    {item.product.p_name}
                  </h4>
                  {/* <p className="w-full text-left text-xs text-gray-400 ">
                      {item.product.farmer_id}
                    </p> */}

                  <span className="w-full text-left text-lg text-green-600">
                    R$: {item?.product.p_price! * item.quantity}
                  </span>
                  {/* <small>QTD: {item.quantity}</small> */}
                </div>
                <div className="w-full md:w-[25%] flex justify-evenly md:justify-between items-center">
                  <div className="w-[35%]  md:w-[57%] md:h-10 flex justify-evenly  items-center rounded border border-palm-700  mt-4 md:mt-0">
                    <button
                      onClick={() => RemoveToPuchaseList(item.product)}
                      className="text-center text-xl text-palm-700 p-2"
                      type="button"
                    >
                      -
                    </button>
                    <div className="w-1/2  text-center text-sm text-palm-700 py-3 ">
                      {item.quantity}
                    </div>

                    <button
                      onClick={() => AddToPuchaseList(item.product)}
                      className="  text-center text-xl text-palm-700 p-2"
                      type="button"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() =>
                      DeleteProductToPuchaseList(item!.product._id!)
                    }
                    className="w-12  h-10  rounded-[100%]  flex justify-center items-center mt-4 md:mt-0"
                  >
                    <Trash size={42} color="#789B3D" weight="light" />
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      {isAuthenticated && purchaseList?.length > 0 && (
        <button
          onClick={() => handleDeletePurchaseList()}
          className="text-gray-500 text-sm font-display py-3 underline underline-offset-4  hover:text-red-500 transition-all"
        >
          Excluir Lista de Compra
        </button>
      )}

      <div className="w-full h-[23%] flex flex-col justify-between border-t border-gray-200">
        <div className="w-full h-[40%] flex justify-between px-3 py-5">
          {" "}
          <h4 className=" text-md md:text-lg text-gray-600 ">Total</h4>{" "}
          <span className="text-md md:text-lg text-green-600 ">
            R$ {TotalPuchaseList}
          </span>
        </div>
        <button
          onClick={() => SavePuchaseListOnBd()}
          className="w-full h-[60%] text-lg  text-white  bg-green-600 py-4 leading-none"
        >
          Salvar Lista de Compra
          <br />
          <span className="d-block w-full text-center text-[12px] text-[#f9f9f9] ">
            {" "}
            Salve e acesse em qualquer dispositivo usuando essa mesma conta
          </span>
        </button>
      </div>
    </div>
  );
}
