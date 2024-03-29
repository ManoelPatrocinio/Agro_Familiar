import classNames from 'classnames';
import {
  ClipboardText,
  List,
  MagnifyingGlass,
  User,
  UserCircle,
} from 'phosphor-react';
import Cookies from 'js-cookie';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { locationsList } from '../Global/locationsList';
import Logo from '../assets/images/Logo.png';
import exemple_user_profile from '../assets/images/exemple_user_profile.png';
import { AuthContext } from '../context/AuthContext';
import { PuchaseListContext } from '../context/PuchaseListContext';
import { FormUserAccess } from './FormUserAccess';
import { Menu_Sidebar } from './Menu_Sidebar';
import { PurchaseList } from './PurchaseList';

interface Iprop {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  ItemSearched: string;
  filterByCity?: React.Dispatch<React.SetStateAction<string | null>>;
}

export function Header({ setSearch, ItemSearched, filterByCity }: Iprop) {
  const { purchaseList } = useContext(PuchaseListContext);
  const { userLogged } = useContext(AuthContext);
  const CheckLogout = () => {
    Swal.fire({
      icon: 'question',
      title: 'Sair',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      text: 'Deseja mesmo finalizar a sessão ?',
    }).then((result) => {
      if (result.isConfirmed) {
        Cookies.remove('token');
        setTimeout(()=>{
          window.location.reload();
        },1200)
      }
    });
  };

  return (
    <header className='relative w-full px-5 md:px-14'>
      <nav className='navbar py-2  bg-white relative flex items-end w-full justify-between'>
         <div className='block lg:hidden'>

          <Menu_Sidebar type='default' setFilterByCity={filterByCity}/>
         </div>
       
        <div className='header-form-search hidden lg:flex items-end w-[25%]'>
          <div className='w-10 h-10 flex items-end'>
            <MagnifyingGlass size={32} color='#789B3D' mirrored />
          </div>
          <input
            onChange={(e) => setSearch(e.target.value)}
            value={ItemSearched}
            type='search'
            placeholder='Busque Aqui...'
            className='w-10/12 p-2 border-b-[1px] border-palm-700 rounded-br focus:outline-none'
          />
        </div>
        <Link to='/' className='w-[9rem] md:w-[11rem]  mt-2'>
          {' '}
          <img
            src={Logo}
            alt='Logo'
            className='w-full object-cover'
            loading='lazy'
          />
        </Link>
        <div className='header-icons-right w-10 lg:w-[25%] flex  justify-end items-end'>
          <div className='dropdown relative  h-auto min-h-10 mr-6 hidden lg:flex items-center'>
            <button
              className='
                text-left
                font-body
                text-xs 
                font-semibold
                text-palm-700 ml-2  
     
            '
              type='button'
              id='dropdownLogin'
              data-bs-toggle='dropdown'
              aria-expanded='false'
            >
              {userLogged ? (
                <div className='w-full h-full flex flex-col justify-center  items-center text-[12px]'>
                  <UserCircle size={38} />
                  <p className='w-full flex '>
                    Minha Conta{' '}
                    <svg
                      aria-hidden='true'
                      focusable='false'
                      data-prefix='fas'
                      data-icon='caret-down'
                      className='w-2 ml-2'
                      role='img'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 320 512'
                    >
                      <path
                        fill='currentColor'
                        d='M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z'
                      ></path>
                    </svg>
                  </p>
                </div>
              ) : (
                <div className='w-full h-full flex items-end'>
                  <User size={32} color='#789B3D' className='mr-2' />
                  Login / <br /> Registre-se
                </div>
              )}
            </button>
            <div
              className={classNames(
                ' dropdown-menu min-w-max absolute  top-[3.5rem]   bg-white z-50 float-left  text-left  rounded-lg  shadow-lg mt-1  hidden   m-0   bg-clip-padding                border                border-gray-200               ',
                {
                  ' w-[20rem]  min-h-[26rem] h-auto left-[-8rem] px-4  py-8':
                    !userLogged,
                  ' w-[10rem]   h-auto left-[-30%] py-2': userLogged,
                }
              )}
              aria-labelledby='dropdownLogin'
            >
              {userLogged ? (
                <div className='w-full h-full '>
                  <div className='w-full h-full flex flex-col justify-center items-center'>
                    {userLogged?.u_img_profile &&
                    userLogged?.u_img_profile.length > 0 ? (
                      <img
                        src={userLogged.u_img_profile}
                        className='w-12 h-12 rounded-[50%]'
                      />
                    ) : (
                      <img
                        src={exemple_user_profile}
                        className='w-12 h-12 rounded-[50%]'
                      />
                    )}
                    <span className='w-full text-center text-[12px] text-gray-600 my-2'>
                      {userLogged.u_email}
                    </span>
                  </div>
                  <div className='w-full h-full'>
                    {userLogged?.u_type !== 'customer' ? (
                      <>
                        <Link
                          to='/Admin/create-product'
                          className='block w-max mx-auto text-center text-palm-700 text-sm pt-2 mb-2 relative border-animated hover:text-palm-900 transition-all '
                        >
                          {' '}
                          Dashboard
                        </Link>
                        <Link
                          to={`/my-shop/${userLogged?._id}`}
                          className='block w-max mx-auto text-center text-palm-700 text-sm pt-2 mb-2 relative border-animated hover:text-palm-900 transition-all '
                        >
                          {' '}
                          Meu Espaço
                        </Link>
                      </>
                    ):(
                      <Link
                          to={`/my-profile/${userLogged?._id}`}
                          className='block w-max mx-auto text-center text-palm-700 text-sm pt-2 mb-2 relative border-animated hover:text-palm-900 transition-all '
                        >
                          {' '}
                          Minha conta
                        </Link>
                    )}

                   

                    <button
                      className='block mx-auto text-center text-palm-700 text-sm pt-2 mb-2 relative border-animated hover:text-palm-900 transition-all '
                      onClick={() => CheckLogout()}
                    >
                      {' '}
                      Sair da conta
                    </button>
                  </div>
                </div>
              ) : (
                <FormUserAccess type='userLogin' />
              )}
            </div>
          </div>

          <button
            className='w-10 h-auto min-h-9 relative mb-[1rem] md:mb-0'
            type='button'
            data-bs-toggle='offcanvas'
            data-bs-target='#PurchaseList'
            aria-controls='PurchaseList'
          >
            <ClipboardText size={40} color='#789B3D' />
            <span className='w-5 h-5 rounded-2xl bg-palm-700 text-white text-xs text-center leading-5 absolute top-[-6px] right-[-2px]'>
              {purchaseList ? purchaseList?.length : 0}
            </span>{' '}
          </button>
          <PurchaseList />
        </div>
      </nav>
      <ul className='w-full hidden max-h-8 h-8 lg:flex items-center justify-evenly mt-8'>
        <li>
          {' '}
          <Link
            to='/'
            className='text-lg text-palm-700 font-normal font-display ml-16 relative border-animated hover:text-palm-900'
          >
            Início
          </Link>
        </li>
        <li>
          {' '}
          <Link
            to='/Products'
            className='text-lg text-palm-700 font-normal font-display relative border-animated hover:text-palm-900'
          >
            Produtos
          </Link>
        </li>
        <li>
          {' '}
          <Link
            to='/Entities'
            className='text-lg text-palm-700 ml-[2.313rem] font-normal font-display relative border-animated hover:text-palm-900'
          >
            Associações/Cooperativas
          </Link>
        </li>
        <li>
          <Link
            to='/Farmers'
            className='text-lg text-palm-700 font-normal font-display relative border-animated hover:text-palm-900'
          >
            Produtores
          </Link>
        </li>

        <li className='relative border-animated '>
          <select
            className='
                appearance-none
                block
                w-full
                text-center
                text-lg 
                font-normal
                font-display
                text-palm-700 
                bg-white 
                bg-clip-padding 
                bg-no-repeat
                transition
                ease-in-out
                duration-150
                border-none
                border-0
                focus:border-none 
                focus:outline-none
                '
            aria-label=' select city'
            id='selectCity'
            onChange={(e) => filterByCity && filterByCity(e.target.value)}
          >
            <option value={'null'}>Territórios</option>
            <optgroup
              label='Bahia'
              className='text-gray-600 font-body text-sm text-left'
            >
              {locationsList.Bahia.map((city) => (
                <option value={city} key={city} className='my-4'>
                  {city}
                </option>
              ))}
            </optgroup>
          </select>
        </li>
      </ul>

      <div className='relative w-full h-12 mt-4 md:hidden '>
        <input
          onChange={(e) => setSearch(e.target.value)}
          value={ItemSearched}
          type='search'
          placeholder='Busque Aqui...'
          className='w-full h-full pl-2  border-[1px] rounded border-palm-700  focus:outline-none'
        />
        {ItemSearched !== '' && (
          <button className='w-[15%] h-full absolute top-0 right-0 flex justify-end items-center '>
            <MagnifyingGlass size={32} color='#789B3D' className='mr-3' />
          </button>
        )}
      </div>
    </header>
  );
}
