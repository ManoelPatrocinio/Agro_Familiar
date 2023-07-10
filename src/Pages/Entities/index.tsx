import { useState } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { CardEntity } from '../../Components/CardEntity';
import { Carrousel } from '../../Components/Carrousel';
import { Dropdrown } from '../../Components/Dropdrown';
import { Empty_search } from '../../Components/Empty_search';
import { Footer } from '../../Components/Footer';
import { Header } from '../../Components/Header';
import { Pagination } from '../../Components/Pagination';
import { SectionTitle } from '../../Components/SectionTitle';
import { Load_spinner } from '../../Components/load_spinner';
import { User } from '../../Types/user.type';
import entitiesPromotionImage1 from '../../assets/images/banner_joinUs.jpeg';
import iconFarmeWhite from '../../assets/images/icon-farmer-white.png';
import iconEntityWhite from '../../assets/images/icone-entity-white.png';
import { api } from '../../hook/useApi';
let total: number = 0; //number of products in the list, to calculate the number must be  pages shown

export function Entities() {
  const [search, setSearch] = useState<string>('');
  const [entitiesData, setEntitiesData] = useState<User[]>([]);
  const [city, setCity] = useState<string | null>(null);
  const [offSet, setOffSet] = useState<number>(0);

  const Limit_perPage = 9; //cards number shown per page

  const {
    data: entitiesAPi,
    isFetching,
    error,
  } = useQuery<User[]>(
    ['entitiesPages', city],
    async () => {
      const response = await api.get(`/all-entity/?city=${city}`);
      filterByTypeEntity('assoc', response.data.entities);
      return response.data.entities;
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  if (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oppss',
      text: 'Desculpe, não foi possível  exibir as organizações cadastradas, tente novamente.',
    });
  }
  function setPagination(offset: number, entityArray?: User[]) {
    setOffSet(offset);
    entityArray
      ? filterByPagination(entityArray, offset)
      : entitiesAPi && filterByPagination(entitiesAPi, offset);
  }
  function filterByPagination(entitys: User[], off: number) {
    let page = off / Limit_perPage + 1 - 1;
    let start = page * Limit_perPage;
    let end = start + Limit_perPage;
    let list = entitys ? entitys.slice(start, end) : [];
    list.length > 0 && setEntitiesData(list);
  }

  function filterByTypeEntity(entityType: string = 'assoc', entities?: User[]) {
    setSearch('');
    setOffSet(0);
    let filtedList: User[] = [];
    if (entities) {
      filtedList = entities.filter((entity) => entity.u_type === entityType);
      filterByPagination(filtedList!, offSet);
      total = filtedList?.length!;
    } else {
      filtedList = entitiesAPi!.filter(
        (entity) => entity.u_type === entityType
      );

      total = filtedList?.length!;

      filtedList?.length! > 0
        ? setPagination(offSet, filtedList)
        : setEntitiesData([]);
    }
  }
  const filtedEntityListBySearch =
    search.length > 0
      ? entitiesAPi?.filter((entity) =>
          entity.u_full_name?.toLowerCase().includes(search.toLowerCase())
        )
      : [];

  function filteredProdListByOrderType(orderType: string) {
    let filtedList: User[] = [];
    setOffSet(0);

    if (orderType === 'De A a Z') {
      filtedList = entitiesAPi!.sort((prev, next) => {
        let prevUpperCase = prev.u_full_name?.toUpperCase(),
          nextUpperCase = next.u_full_name?.toUpperCase();
        return prevUpperCase == nextUpperCase
          ? 0
          : prevUpperCase! > nextUpperCase!
          ? 1
          : -1;
      });
    } else if (orderType == 'De Z a A') {
      filtedList = entitiesAPi!.sort((prev, next) => {
        let prevUpperCase = prev.u_full_name?.toUpperCase(),
          nextUpperCase = next.u_full_name?.toUpperCase();
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

  return (
    <>
      <Header
        setSearch={setSearch}
        ItemSearched={search}
        filterByCity={setCity}
      />
      <Carrousel />
      <main className=' w-full flex items-start flex-col px-6 md:px-20'>
        <SectionTitle title='Entidades' className={'my-6 w-full'} />

        <div className='w-full flex justify-around py-3 '>
          <button
            onClick={() => filterByTypeEntity('assoc')}
            className='mx-2 md:mx-0 text-sm md:text-lg font-display text-center text-gray-800 hover:text-palm-700 focus:text-palm-700 transition-all'
          >
            Associações
          </button>

          <button
            onClick={() => filterByTypeEntity('coop')}
            className='mx-2 md:mx-0  text-sm md:text-lg font-display text-center text-gray-800 hover:text-palm-700 focus:text-palm-700 transition-all'
          >
            Cooperativas
          </button>
        </div>
        <Dropdrown
          items={['De A a Z', 'De Z a A']}
          setOptionOrder={filteredProdListByOrderType}
        />

        <div className='w-full h-auto min-h-[50vh] flex flex-wrap justify-around mb-4 '>
          {isFetching ? (
            <Load_spinner
              adicionalClass='w-screen h-screen'
              message='Carregando Organizações ...'
            />
          ) : (
            <>
              {search?.length > 0 && (
                <>
                  {filtedEntityListBySearch?.map((entity) => (
                    <CardEntity entity={entity} key={entity._id} />
                  ))}
                </>
              )}

              {search?.length === 0 && (
                <>
                  {' '}
                  {entitiesData.length === 0 ? (
                    <Empty_search
                      text='Ainda não temos esse tipo de organização nessa região '
                      classAdicinonal='h-screen w-full justify-center'
                    />
                  ) : (
                    <>
                      {entitiesData?.map((entity) => (
                        <CardEntity entity={entity} key={entity._id} />
                      ))}
                    </>
                  )}
                </>
              )}
            </>
          )}
        </div>
        {entitiesData.length > 0 && (
          <Pagination
            total={total}
            offSet={offSet}
            setOffSet={setPagination}
            limit={Limit_perPage}
          />
        )}
        <div
          className='w-full  h-auto  bg-no-repeat bg-[length:100%_100%]  mt-8 rounded'
          style={{ backgroundImage: `url(${entitiesPromotionImage1})` }}
        >
          <div className='bg-[rgba(0,0,0,0.7)] w-full h-auto px-2 py-8 rounded '>
            <h3 className='w-full text-center text-md text-white font-bold mb-4'>
              Faça parte do Portal Agro Familiar
            </h3>
            <p className='w-full text-justify md:text-center text-sm text-white mb-8 leading-6'>
              Esse portal foi criado como objetivo de aumentar a visibilidade e
              os meios de divulgação das Associações, Cooperativas e produtores
              individuais, além de trazer maior proximidade com o consumidor
              interessado em produtos da agricultura familiar da sua região.
              <br />
              <span className='underline decoration-1 '>
                {' '}
                Cadastre-se, e faça parte dessa iniciativa !
              </span>
            </p>
            <div className='w-full h-auto flex  flex-wrap justify-around items-center'>
              <Link
                to='/Register-entity'
                className='w-[17rem] h-[8.5rem] border border-white flex flex-col justify-center items-center  rounded hover:scale-110 transition duration-300 ease-in-out'
              >
                <img
                  src={iconEntityWhite}
                  alt='icon Cadastro como Associação'
                  className='h-[5.5rem] max-h-24 mx-auto'
                  loading='lazy'
                />
                <span className='w-full text-center text-sm text-white font-bold'>
                  Cadastro de Assoc/Coop
                </span>
              </Link>
              <Link
                to='/Register-farmer'
                className='w-[17rem] h-[8.5rem] border border-white flex flex-col justify-center items-center py-4 my-6 md:my-0 rounded hover:scale-110 transition duration-300 ease-in-out'
              >
                <img
                  src={iconFarmeWhite}
                  alt='icon Cadastro como Associação'
                  className='h-[5.5rem] max-h-24 mx-auto'
                  loading='lazy'
                />
                <span className='w-full text-center text-sm text-white font-bold'>
                  Cadastro como Produtor Individual
                </span>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
