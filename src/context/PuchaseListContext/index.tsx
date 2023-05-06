import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Product } from "../../Types/product.type";
import { api } from "../../hook/useApi";
import { AuthContext } from "../AuthContext";
interface IPuchaseList {
  _id?: string;
  user_id: string;
  products: IProduct[];
}
interface IProduct {
  product: Product;
  quantity: number;
}
interface IPuchaseListProviderProps {
  children: React.ReactNode;
}
export type IPuchaseListContextType = {
  purchaseList: IProduct[];
  AddToPuchaseList: (product: Product, qtd?: number) => void;
  RemoveToPuchaseList: (product: Product, qtd?: number) => void;
  DeleteProductToPuchaseList: (id: string) => void;
  SavePuchaseListOnBd: () => void;
  DeletePurchaseList: () => void;
};

export const PuchaseListContext = createContext({} as IPuchaseListContextType);

export const PuchaseListProvider = ({
  children,
}: IPuchaseListProviderProps) => {
  const { userLogged, isAuthenticated } = useContext(AuthContext);
  const [purchaseList, setProductPurchaseList] = useState<IProduct[]>([]);

  useEffect(() => {
    if (isAuthenticated) {
      api
        .get(`get-purchaseList/${userLogged?._id}`)
        .then((response) => {
          console.log("response.data.purchaseList", response.data.purchaseList);

          setProductPurchaseList(response.data.purchaseList);
        })
        .catch((error) => {
          console.error("erro get-purchaseList: ", error);
          Swal.fire({
            icon: "error",
            title: "Oppss..",
            text: error.response.data.message,
            showConfirmButton: true,
          });
        });
    }
  }, [isAuthenticated]);

  // function to add a product on puchase list if not exist, or, inclement a quantity if already exist
  function AddToPuchaseList(product: Product, qtd?: number): void {
    const alreadyInPuchaseList = purchaseList.find(
      (item) => item.product._id === product._id
    );

    if (alreadyInPuchaseList) {
      const newProductList: IProduct[] = purchaseList.map((item) => {
        if (item.product._id === product._id)
          ({
            ...item,
            quantity: qtd ? qtd : item.quantity++,
          });
        return item;
      });
      setProductPurchaseList(newProductList);
      toast.success("Adicionado com sucesso !");
      return;
    }
    //if product is not already in purchase list
    const newProductItem: IProduct = {
      product: product!,
      quantity: qtd ? qtd : 1,
    };
    const newProductList: IProduct[] = [...purchaseList, newProductItem];
    setProductPurchaseList(newProductList);
    toast.success("Adicionado com sucesso !");
  }
  function RemoveToPuchaseList(product: Product, qtd?: number) {
    const alreadyInPuchaseList = purchaseList.find(
      (item) => item.product._id === product._id
    );

    if (alreadyInPuchaseList?.quantity && alreadyInPuchaseList?.quantity > 1) {
      const newProductList: IProduct[] = purchaseList.map((item) => {
        if (item.product._id === product._id)
          ({
            ...item,
            quantity: qtd ? qtd : item.quantity--,
          });
        return item;
      });
      setProductPurchaseList(newProductList);

      toast.success("Removido com sucesso !");
      return;
    }
  }
  function DeleteProductToPuchaseList(id: string) {
    const newProducList: IProduct[] = purchaseList.filter(
      (item) => item.product._id !== id
    );
    setProductPurchaseList(newProducList);

    toast.success("Apagado com sucesso !");
  }

  async function SavePuchaseListOnBd() {
    const PurchaseList: IPuchaseList = {
      user_id: userLogged?._id!,
      products: purchaseList,
    };

    if (!isAuthenticated) {
      Swal.fire({
        icon: "info",
        title: "Você ainda não está logado ",
        text: "Entre ou crie uma conta no portal, assim você poderá salvar e ter acesso a sua lista de compra em qualquer dispositivo 😀",
        showConfirmButton: true,
      });
    } else {
      if (purchaseList.length > 0) {
        await api
          .post("/CreateOrUpdate-purchaseList", PurchaseList)
          .then((response) => {
            Swal.fire({
              icon: "success",
              title: "Parabéns !",
              text: response.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
            setTimeout(() => {
              window.location.reload();
            }, 1700);
          })
          .catch((error) => {
            console.error("data", error);
            Swal.fire({
              icon: "error",
              title: "Oppss..",
              text: error.response.data.message,
              showConfirmButton: true,
            });
          });
      }
    }
  }

  async function DeletePurchaseList() {
    if (isAuthenticated) {
      await api
        .delete(`/delete-purchaseList/${userLogged?._id}`)
        .then((response) => {
          console.log("retonor api", response.data);
          Swal.fire({
            icon: "success",
            title: "Sucesso !",
            text: response.data.message,
            timer: 1500,
          });
          setProductPurchaseList([]);
          setTimeout(() => {
            window.location.reload();
          }, 1900);
        })
        .catch((error) => {
          console.error("data", error);
          Swal.fire({
            icon: "error",
            title: "Oppss..",
            text: error.response.data.message,
            showConfirmButton: true,
          });
        });
    }
  }
  return (
    <PuchaseListContext.Provider
      value={{
        purchaseList,
        AddToPuchaseList,
        RemoveToPuchaseList,
        DeleteProductToPuchaseList,
        SavePuchaseListOnBd,
        DeletePurchaseList,
      }}
    >
      {children}
    </PuchaseListContext.Provider>
  );
};
