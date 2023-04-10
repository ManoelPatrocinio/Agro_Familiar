import { Product } from "./product.type";
import { UserLoggedType } from "./user.type";

interface IPuchaseList {
  product: Product;
  quantity: number;
}
export type PuchaseListContextType = {
  purchaseList: IPuchaseList[];
  AddToPuchaseList: (product: Product, qtd?: number) => void;
  RemoveToPuchaseList: (product: Product, qtd?: number) => void;
  DeleteProductToPuchaseList: (id: string) => void;
};

export type UserLoggedContextType = {
  userLogged:UserLoggedType,
  UserFirstName:string
};