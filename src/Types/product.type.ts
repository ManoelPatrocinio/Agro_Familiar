export type Product = {
    _id: string;
    farmer_id?: string;
    farmer_name?:string;
    p_name?: string;
    p_category?: string;
    p_price?: number;
    p_old_price?: number;
    p_stock?: number;
    p_raiting?:  number;
    p_n_contact?: string;
    p_description?: string;
    p_images?: {
        main:string,
        secondary: string,
        tertiary:string
        quaternary:string

    };
    createdAt?: Date;
}


