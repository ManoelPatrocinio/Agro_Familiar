export type Comment = {
  _id?: string;
  c_comment: string;
  c_raiting: number;
  c_customer_id: string;
  c_customer_name: string;
  c_customer_email: string;
  c_user_img_profile: string;
  id_product?: string;
  id_farmer?: string;
  createdAt?: Date;
};
