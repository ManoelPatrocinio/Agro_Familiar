import axios from 'axios';
import { DotsThreeVertical, Funnel } from 'phosphor-react';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { CardProduct } from '../../Components/CardProduct';
import { Dropdrown } from '../../Components/Dropdrown';
import { Empty_search } from '../../Components/Empty_search';
import { Filter_category } from '../../Components/Filter_category';
import { Footer } from '../../Components/Footer';
import { Header } from '../../Components/Header';
import { Pagination } from '../../Components/Pagination';
import { Load_spinner } from '../../Components/load_spinner';
import { Comment } from '../../Types/comment.type';
import { Product } from '../../Types/product.type';
import { User } from '../../Types/user.type';
import exemple_user_profile from '../../assets/images/exemple_user_profile.png';
import Icon_WhatsApp from '../../assets/images/icon-whatsapp.svg';
import Star from '../../assets/images/star_icon.png';
import exemple_user_cover_background from '../../assets/images/user_cover_background.jpg';
import Cookies from 'js-cookie';
import { api } from '../../hook/useApi';

let total: number = 0; //number of products in the list, to calculate the number must be  pages shown
let categorySelected: string = 'Produtos';
const backendUrl = import.meta.env.VITE_BACKEND_PORT;
export function Entity() {
  const { userId } = useParams();
  const [productData, setProductData] = useState<Product[]>([]);
  const [entityData, setEntityData] = useState<User>();
  const [commentsList, setCommentsList] = useState<Comment[]>([]);
  const [search, setSearch] = useState<string>('');
  const [offSet, setOffSet] = useState<number>(0);

  const [toggleFilterVisibility, SetToggleFilterVisibility] =
    useState<boolean>(false);

  const Limit_perPage = 9; //cards number shown per page

  const {
    data: productAPi,
    isFetching,
    error,
  } = useQuery<Product[]>(
    ['myShop', userId],
    async () => {
      const response = await api.get(`${backendUrl}/entity-enable-products/${userId}`)
      await api.get(`${backendUrl}/get-farmer-comments/${userId}`).then((response)=>{
        setCommentsList(response.data.comments);
      })
      setEntityData(response.data.entity)
      total = response.data.products.length;
      setPagination(offSet, response.data.products);

      return response.data.products
      
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  if (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oppss',
      text: 'Desculpe, não foi possível  essa informação, tente novamente, por favor',
    });
  }



  function setPagination(offset: number, productArray?: Product[]) {
    setOffSet(offset);
    productArray
      ? filterByPagination(productArray, offset)
      : productAPi && filterByPagination(productAPi, offset);
  }
  function filterByPagination(products: Product[], off: number) {
    setProductData([]);
    let page = off / Limit_perPage + 1 - 1;
    let start = page * Limit_perPage;
    let end = start + Limit_perPage;
    let list = products ? products.slice(start, end) : [];
    list.length > 0 && setProductData(list);
  }

  function filterByCategory(category: string) {
    console.log("category",category)
    setSearch('');
    setOffSet(0);
    categorySelected = category;
    if (category === 'Produtos') {
      setPagination(offSet, productAPi);
      total = productAPi?.length!;
    } else {
      const filtedList = productAPi?.filter(
        (item) => item.p_category === category
      );
      total = filtedList?.length!;
      filtedList?.length! > 0
        ? setPagination(offSet, filtedList)
        : setProductData([]);
    }
  }
 
  function raitingCalculate(comments: Comment[]) {
    // Na escala de 1 a 5, as notas 1 e 2 são negativas(detractors), 4 e 5 são positivas(promoters), e 3 é neutro.
    var promoters = 0;
    var detractors = 0;
    var soma = 0;
    for (var i = 0, l = comments.length; i < l; i++) {
      soma += comments[i].c_raiting;
      if (comments[i].c_raiting >= 4) promoters++;
      if (comments[i].c_raiting <= 2) detractors++;
    }

    const nps = ((promoters - detractors) / comments.length) * 100;
    const media = soma / comments.length;
    return media < 0 ? 0 : media;
  }

  const filteredProdList =
    search.length > 0
      ? productAPi?.filter((product) =>
          product.p_name?.toLowerCase().includes(search.toLowerCase())
        )
      : [];

  function filteredProdListByOrderType(orderType: string) {
    let filtedList: Product[] = [];
    setOffSet(0);

    if (orderType === 'Menor Preço') {
      filtedList = productAPi!.sort((prev, next) => {
        return prev.p_price! - next.p_price!;
      });
    } else if (orderType === 'Maior Preço') {
      filtedList = productAPi!.sort((prev, next) => {
        return next.p_price! - prev.p_price!;
      });
    } else if (orderType === 'De A a Z') {
      filtedList = productAPi!.sort((prev, next) => {
        let prevUpperCase = prev.p_name?.toUpperCase(),
          nextUpperCase = next.p_name?.toUpperCase();
        return prevUpperCase == nextUpperCase
          ? 0
          : prevUpperCase! > nextUpperCase!
          ? 1
          : -1;
      });
    } else if (orderType == 'De Z a A') {
      filtedList = productAPi!.sort((prev, next) => {
        let prevUpperCase = prev.p_name?.toUpperCase(),
          nextUpperCase = next.p_name?.toUpperCase();
        return prevUpperCase == nextUpperCase
          ? 0
          : nextUpperCase! > prevUpperCase!
          ? 1
          : -1;
      });
    }
    total = filtedList.length;
    setPagination(offSet, filtedList);
  }
  async function deleteUserAcount() {
    Swal.fire({
      icon: 'question',
      title: 'Sair',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      text: 'Ao excluir essa conta, todos seus dados e informações serão perdidas, tem certeza ?',

    }).then((result) => {
      if (result.isConfirmed) {

        Cookies.remove('token');

        window.location.reload();
      }
    });
  }
  return (
    <>
      <Header setSearch={setSearch} ItemSearched={search} />
      <div className='w-full h-40 md:h-[23rem] md:min-h-[50vh] relative mt-4'>
        {entityData && entityData.u_cover_photo ? (
          <img
            src={entityData?.u_cover_photo}
            alt='foto de capa'
            className='w-full h-full '
          />
        ) : (
          <img
            src={exemple_user_cover_background}
            alt='foto de perfil'
            className='w-full h-full object-cover'
          />
        )}
        <div className='w-full absolute top-[7rem] md:top-[87%] flex flex-col md:flex-row  justify-between items-center  md:px-16 '>
          <div className='flex flex-col md:flex-row items-center md:items-end'>
            <div className='w-[7rem] h-[7rem] md:w-[9.5rem] md:h-[9.5rem] rounded-[50%] '>
              {entityData && entityData.u_img_profile ? (
                <>
                  {entityData.u_img_profile.length > 0 ? (
                    <img
                      src={entityData.u_img_profile}
                      alt='foto de perfil'
                      className='w-full h-full rounded-[50%]'
                    />
                  ) : (
                    <img
                      src={exemple_user_profile}
                      alt='foto de perfil'
                      className='w-full h-full  rounded-[50%]'
                    />
                  )}
                </>
              ) : (
                <img
                  src={exemple_user_profile}
                  alt='foto de perfil'
                  className='w-full h-full rounded-[50%]'
                />
              )}
            </div>
            <div className='flex flex-col items-center md:items-start justify-evenly px-4 pb-4'>
              <h4 className='text-sm md:text-lg text-center md:text-left text-palm-700 font-display font-semibold pt-3 md:pt-0'>
                {entityData?.u_full_name}
              </h4>
              <p className='text-xs md:text-sm text-gray-400 font-semibold my-2'>
                {' '}
                {entityData?.u_city}
              </p>

              <div className='flex md:w-1/4 items-center justify-start'>
                <span className='text-xs md:text-sm text-gray-400'>
                  {' '}
                  {commentsList.length === 0
                    ? 0
                    : raitingCalculate(commentsList)}
                </span>
                <img
                  src={Star}
                  className='w-4 h-4 md:w-[17px] md:h-[17px] ml-1 mr-2'
                />
                <span className='text-xs md:text-xs text-gray-400'>
                  ({commentsList.length})
                </span>
              </div>
            </div>
          </div>
          <div className='hidden md:flex justify-center '>
            <div className='dropstart relative'>
              <button
                className='
                    dropdown-toggle
                    py-2.5
                    flex
                    items-center
                    whitespace-nowrap
                  '
                type='button'
                id='dropdownMenuButton1s'
                data-bs-toggle='dropdown'
                aria-expanded='false'
              >
                <DotsThreeVertical size={38} weight='bold' color='#789B3D' />
              </button>
              <ul
                className='
                    dropdown-menu
                    min-w-max
                    absolute
                    hidden
                    bg-white
                    text-base
                    z-50
                    float-left
                    py-2
                    list-none
                    text-left
                    rounded-lg
                    shadow-lg
                    mt-1
                    m-0
                    bg-clip-padding
                    border-none
                  '
                aria-labelledby='dropdownMenuButton1s'
              >
                <li>
                  <Link
                    className='
                        dropdown-item
                        text-sm
                        py-2
                        px-4
                        font-normal
                        block
                        w-full
                        whitespace-nowrap
                        bg-transparent
                        text-gray-700
                        hover:bg-gray-100
                      '
                    to={`/Entity-info/${entityData?._id}`}
                  >
                    Sobre
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className='px-1 md:px-20 mt-[12rem] md:mt-[10rem]'>
        <div className='w-full flex justify-between items-center px-2 md:px-0 mb-6 md:mb-8 '>
          <div>
            <h4 className='w-full text-sm md:text-left md:text-lg text-gray-800  font-medium mb-1'>
              {categorySelected === 'Produtos'
                ? 'Todos os Podutos'
                : categorySelected}
            </h4>
            <p className='w-full mx-auto   text-xs md:text-left md:text-sm text-gray-400'>
              {' '}
              {productData?.length === 0
                ? '0 Itens'
                : `${productData?.length} Itens`}
            </p>
          </div>
          <div className='flex md:hidden  justify-center '>
            <div className='dropstart relative'>
              <button
                className='
                    dropdown-toggle
                    py-2.5
                    flex
                    items-center
                    whitespace-nowrap
                  '
                type='button'
                id='dropdownMenuButton1s'
                data-bs-toggle='dropdown'
                aria-expanded='false'
              >
                <DotsThreeVertical size={38} weight='bold' color='#789B3D' />
              </button>
              <ul
                className='
                    dropdown-menu
                    min-w-max
                    absolute
                    hidden
                    bg-white
                    text-base
                    z-50
                    float-left
                    py-2
                    list-none
                    text-left
                    rounded-lg
                    shadow-lg
                    mt-1
                    m-0
                    bg-clip-padding
                    border-none
                  '
                aria-labelledby='dropdownMenuButton1s'
              >
                <li>
                  <Link
                    className='
                        dropdown-item
                        text-sm
                        py-2
                        px-4
                        font-normal
                        block
                        w-full
                        whitespace-nowrap
                        bg-transparent
                        text-gray-700
                        hover:bg-gray-100
                      '
                    to={`/Entity-info/${entityData?._id}`}
                  >
                    Sobre
                  </Link>
                </li>
                <li>
                  <button
                    type="button"
                    className='
                        dropdown-item
                        text-sm
                        py-2
                        px-4
                        font-normal
                        block
                        w-full
                        whitespace-nowrap
                        bg-transparent
                        text-gray-700
                        hover:bg-gray-100
                      '
                    onClick={()=>deleteUserAcount()}  
                  >
                    Exluir conta
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className='relative w-full flex items-start justify-between '>
          <Filter_category
            ToggleFilterVisibility={SetToggleFilterVisibility}
            mobileVisiblity={toggleFilterVisibility}
            filterByCategory={filterByCategory}
          />
          <div className='w-full md:w-3/4 flex flex-col  items-start'>
            <div className='w-full flex justify-between md:justify-start pr-2'>
              <Dropdrown
                items={['Menor Preço', 'Maior Preço', 'De A a Z', 'De Z a A']}
                setOptionOrder={filteredProdListByOrderType}
              />
              <button
                onClick={() =>
                  SetToggleFilterVisibility(!toggleFilterVisibility)
                }
                className=' md:hidden text-xs text-gray-800 flex items-center whitespace-nowrap '
              >
                <Funnel size={20} className='mr-2' />
                Filtrar
              </button>
            </div>
            <div className='w-full min-h-screen flex flex-wrap justify-around pt-6'>
              {isFetching ? (
                <Load_spinner
                  adicionalClass='w-screen h-screen'
                  message='Carregando Produtos ...'
                />
              ) : (
                <>
                  {search?.length > 0 && (
                    <div className='w-full flex flex-wrap  justify-around gap-4 pt-4 '>
                      {filteredProdList?.map((product) => (
                        <CardProduct product={product} key={product._id} />
                      ))}
                    </div>
                  )}

                  {search?.length === 0 && (
                    <>
                      {' '}
                      {productData?.length === 0 ? (
                        <Empty_search
                          text='Ainda não temos itens '
                          classAdicinonal='h-screen w-full justify-center'
                        />
                      ) : (
                        <div className='w-full flex flex-wrap  justify-around gap-4 pt-4 '>
                          {productData?.map((product) => (
                            <CardProduct product={product} key={product._id} />
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
            {productData && productData.length > 0 && (
              <Pagination
                total={total}
                offSet={offSet}
                setOffSet={setPagination}
                limit={Limit_perPage}
              />
            )}
          </div>

          <a
            href={`http://api.whatsapp.com/send?l=pt_BR&phone=+55${entityData?.u_main_contact}&text=Olá, tudo bem ? Encontrei seu contato no Portal Agro Familiar `}
            className='fixed bottom-6 right-7 w-[3.5rem] h-[3.5rem] md:w-[4rem] md:h-[4rem]'
            target='_blank'
          >
            <img src={Icon_WhatsApp} className='w-full h-full scale-x-[-1]' />
          </a>
        </div>
      </div>
      <Footer />
    </>
  );
}
