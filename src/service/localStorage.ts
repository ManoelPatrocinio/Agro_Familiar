import { Product } from "../Types/product.type";

interface IPuchaseList {
  product: Product;
  quantity: number;
}
export const CheckLocalStorage = {
  // Purchase list
  // Função para salvar produto no local storage
  setItemOnPurchaseList(data: IPuchaseList[]) {
    let parsedData = JSON.stringify(data);
    localStorage.setItem("@PAF:purchase", parsedData);
  },

  // Função responsável por recuperar lista de productos local storage
  getItemPurchaseList() {
    let data = localStorage.getItem("@PAF:purchase");
    if (!data) return [];
    try {
      let parsedData = JSON.parse(data);
      return parsedData;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
};
