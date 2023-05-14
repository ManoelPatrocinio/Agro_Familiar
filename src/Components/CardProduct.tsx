import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../Types/product.type';
import { PuchaseListContext } from '../context/PuchaseListContext';
import { IconAddList } from './IconAddList';

type Prop = {
  product: Product;
};

export function CardProduct({ product }: Prop) {
  const { AddToPuchaseList } = useContext(PuchaseListContext);
  return (
    <div className='w-[10rem] h-[13rem] md:w-[15rem] md:h-[18rem] flex flex-col  hover:scale-110 transition duration-300 ease-in-out rounded-lg shadow-lg bg-white '>
      <Link
        to={`/Product-detail/${product._id}`}
        className='block h-1/2 md:h-[57%] w-full'
      >
        <img
          className='rounded-t-lg w-full h-full'
          src={product.p_images![0]}
          alt={product.p_name}
          loading='lazy'
        />
      </Link>
      <div className='py-2 px-3 w-full h-1/2 md:h-[43%] flex flex-col justify-between'>
        <h5 className='w-full h-6 text-center text-gray-700 text-xs md:text-sm font-medium text-ellipsis whitespace-nowrap overflow-hidden    '>
          {product.p_name}
        </h5>

        <div className='w-full h-6 flex justify-center items-center text-base'>
          <span className=' text-sm text-green-600'> R$ {product.p_price}</span>
          <span className=' text-sm text-gray-400 line-through ml-3 '>
            {' '}
            R$ {product.p_old_price}
          </span>
        </div>
        <button
          type='button'
          className='checked:bg-blue-500 w-full flex items-center justify-center py-2 md:py-2.5 bg-green-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-500 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-600 active:shadow-lg transition duration-150 ease-in-out'
          onClick={() => AddToPuchaseList(product)}
        >
          <IconAddList w={'20'} h={'20'} color='#fff' className='mr-1' />
          Adicionar
        </button>
      </div>
    </div>
  );
}
