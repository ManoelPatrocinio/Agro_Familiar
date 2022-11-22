import allFree from "../../assets/images/all_Free.png";
import forClient from "../../assets/images/forClient.png";
import whatWeOffer from "../../assets/images/whatWeOffer.png";
import { Footer } from "../../Components/Footer";
import { Header } from "../../Components/Header";

export function AboutUs() {
  return (
    <>
      <Header />
      <main className="w-full h-full px-8 md:px-20 mt-10 md:mt-20">
        <div className="w-full  text-justify indent-8 md:indent-0 md:text-center font-display mb-10">
          <h3 className="w-full text-xl text-center text-palm-700 mb-8">
            Sobre Nós
          </h3>
          <p className="w-full text-md text-gray-700 ">
            O Portal Agro Familiar foi idealizado com o objetivo de ser mais do
            que um produto, e sim, uma ferramenta social e de transformação.
            trazendo maior visibilidade e competitividade para a agricultura
            familiar.
          </p>
        </div>
        <div className="w-full md:w-1/2   text-justify indent-8 md:indent-0 md:text-center font-display">
          <h3 className="w-full text-xl text-center text-palm-700 mb-8">
            O que fazemos ?
          </h3>
          <p className="w-full text-md text-gray-700 ">
            Aproximamos o consumidor ao que de melhor é produzido pelas
            Associações, Cooperativas e produtores individuais da sua região.
            Possibilitamos que os produtores se cadastrem na plataforma e montem
            o seu próprio catálogo digital com seus melhores produtos, para que
            possam estar acessíveis para clientes de todas as regiões.
          </p>
        </div>
        <div className="w-full md:w-1/2 md:ml-[50%] text-justify indent-8 md:indent-0 md:text-center font-display mb-10">
          <h3 className="w-full text-xl text-center text-palm-700 my-8">
            O que nos motivou ?{" "}
          </h3>
          <p className="w-full text-md text-gray-700 ">
            Mesmo com o aumento da procura por produtos naturais e orgânicos,
            produtores adeptos a esse tipo de cultivo ainda enfrentam algumas
            dificuldades, entre elas, está a distância entre o produtor e o
            consumidor, além de, meios efetivos para anunciar e negociar seus
            produtos. Logo, foi pensando nessas questões, que o Portal Agro
            Familiar foi criado.
          </p>
        </div>
        <div className="w-full  h-full md:h-[22rem] text-justify md:text-center font-display ">
          <h3 className="w-full text-xl text-center text-palm-700 mb-8">
            O que oferecemos ?
          </h3>
          <div className="w-full h-full  flex flex-col md:flex-row">
            <div className="w-full md:w-1/2  px-10 py-2">
              <img
                src={whatWeOffer}
                alt="o que oferecemos"
                className="w-full h-full"
              />
            </div>
            <div className="w-full md:w-1/2 text-left">
              <h4 className="text-md text-palm-700 font-medium my-4">
                Para o Produtor
              </h4>
              <ul className="w-full m-0 p-0 text-md text-gray-700 list-['\2713'] ">
                <li className="pl-2 py-2">
                  Cadastro e anúncio de seus produtos em uma página de vendas.
                </li>
                <li className="pl-2 py-2">
                  Painel administrativo, para gerenciar as informações de seus
                  produtos.
                </li>
                <li className="pl-2 py-2">
                  Contato e negociação simplificada com o cliente pelo whatsapp.
                </li>
                <li className="pl-2 py-2">
                  Acesso a uma lista de clientes e seus produtos de interesse.
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="w-full h-full md:h-[22rem]  text-center font-display my-10 ">
          <div className="w-full h-full  flex  flex-col-reverse md:flex-row">
            <div className="w-full md:w-1/2 text-left md:pt-8">
              <h4 className="text-md text-palm-700 font-medium my-4">
                Para o Cliente
              </h4>
              <ul className="w-full m-0 p-0 text-md text-gray-700 list-['\2713'] ">
                <li className="pl-2 py-2">
                  Plataforma com produtos orgânicos e naturais produzidos em sua
                  região.
                </li>
                <li className="pl-2 py-2">
                  Contato e negociação direto com o produtor.
                </li>
                <li className="pl-2 py-2">
                  Contato e negociação direto com o produtor.
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/2  px-10 py-2">
              <img
                src={forClient}
                alt="o que oferecemos"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
        <div className="w-full text-justify indent-8 md:indent-0 md:text-center font-display ">
          <img
            src={allFree}
            alt="all free"
            className="w-1/2  md:w-[25%] h-1/3 mx-auto mb-4"
          />
          <p className="w-full text-md text-gray-700 ">
            Tudo isso fazendo um simples e rápido cadastro do seu celular ou
            computador, sem precisar pagar nenhuma taxa ou mensalidade para
            utilizar os recursos do portal.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
