import { ErrorMessage } from "@hookform/error-message";
import classNames from "classnames";
import { Question } from "phosphor-react";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { DropzoneInput } from "../../../Components/Dropzone";
import { ImgPreview } from "../../../Components/ImgPreview";
import { MenuOfDashboard } from "../../../Components/MenuOfDashboard";
import { Menu_Sidebar } from "../../../Components/Menu_Sidebar";
import { Load_spinner } from "../../../Components/load_spinner";
import { categoriesList } from "../../../Global/categoriesList";
import { Product } from "../../../Types/product.type";
import Logo from "../../../assets/images/Logo.png";
import { AuthContext } from "../../../context/AuthContext";
import { api } from "../../../hook/useApi";
import { FirebaseUploadFile } from "../../../service/firebase";

export function CreateProduct() {
  const [filesData, setFileData] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { userLogged } = useContext(AuthContext);

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<Product>();

  //receive the file from dropzone component
  const handleUpload = (file: File) => {
    if (filesData.length <= 4) {
      setFileData( old => [...old,file]);
    }
  };
  const handleDelete = (url: string) => {
    return setFileData(filesData.filter((file) => file.preview !== url));
  };

  async function sendNewProduct(formaData: Product) {
    setIsLoading(true)
    let  imgUrlArray: string[] | [] = [];
    const priceFormated = formaData.p_price?.toString().replace(",", ".");
    const oldPriceFormated = formaData.p_old_price
      ?.toString()
      .replace(",", ".");

  for(const img of filesData){
    const imgUrl = await FirebaseUploadFile(img, "products")
    if( imgUrl.url){
      imgUrlArray.push(imgUrl.url)
    }
  }
  const newProductFormated: Product = {
    farmer_id: userLogged?._id,
    p_name: formaData.p_name,
    p_category: formaData.p_category,
    p_price: priceFormated ? parseFloat(priceFormated) : 0,
    p_old_price: oldPriceFormated ? parseFloat(oldPriceFormated) : 0,
    p_stock: formaData.p_stock,
    p_n_contact: formaData.p_n_contact,
    p_description: formaData.p_description,
    p_images: imgUrlArray,
    p_status: true,
  };
    await api
      .post("/admin/add-product", newProductFormated)
      .then((response) => {
        setFileData([]);
        Swal.fire({
          icon: "success",
          title: "Success !",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.error("add product erro:", error);
        setIsLoading(false);
        Swal.fire({
          icon: "error",
          title: "Oppss..",
          text: error.response.data.message,
          showConfirmButton: true,
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }).finally(()=>{
        setIsLoading(false)
        setFileData([]);
        reset()
      })
  };

  return (
    <>
      {" "}
      <header className="w-full md:hidden h-auto px-3 flex justify-between items-end">
        <Question size={40} color="#89B045" />

        <Link to="/" className="w-[9rem]  mt-4">
          {" "}
          <img src={Logo} alt="Logo" className="w-full object-cover" />
        </Link>
        <Menu_Sidebar type="admin" />
      </header>
      <div className="flex">
        <div className="hidden md:block w-[25%] min-h-full border-r border-gray-200 ">
          <MenuOfDashboard />
        </div>
        <div className="relative w-full md:w-[75%] h-full px-8">
          {isLoading ? (
            <Load_spinner
              adicionalClass="w-full h-screen bg-white "
              message={"Salvando produto,aguarde ..."}
            />
          ) : (
            <>
              <h1 className="w-full text-center md:text-left text-md md:text-xl text-palm-700 font-semibold my-8 ">
                Cadastro de Produto
              </h1>
              <form onSubmit={handleSubmit(sendNewProduct)} className="w-full  h-full   md:py-10  md:mx-auto">
                <div className="w-full flex flex-col md:flex-row items-center ">
                  <div className="w-full md:w-1/2 md:mr-[3%] form-group mb-6">
                    <label
                      htmlFor="productName"
                      className="form-label inline-block mb-2 text-palm-700 mr-3"
                    >
                      Nome/Título do Produto
                      <span className="text-red-500 font-bold "> *</span>:
                    </label>
                    <input
                      type="text"
                      className="
                        form-control          
                        w-full
                        px-3
                        py-1.5
                        text-base
                        text-gray-700
                        bg-white 
                        border border-solid border-gray-300
                        rounded
                        transition
                        ease-in-out
                        m-0
                      focus:border-blue-600 focus:outline-none"
                      id="productName"
                      aria-describedby="productName"
                      placeholder="Digite aqui"
                      {...register("p_name", {
                        required: "Campo Obrigatório",
                        minLength: {
                          value: 3,
                          message: "O nome deve ter mais de 3 caracteres",
                        },
                        maxLength: {
                          value: 100,
                          message: "Limite de caracteres atinguido",
                        },
                      })}
                    />
                    <ErrorMessage
                      errors={errors}
                      name="p_name"
                      render={({ message }) => (
                        <small className="text-red-500 text-xs">
                          {message}
                        </small>
                      )}
                    />
                  </div>

                  <div className="w-full md:w-[30%]  form-group mb-6">
                    <label
                      htmlFor="productCategory"
                      className="form-label inline-block mb-2 text-palm-700 "
                    >
                      Categoria
                      <span className="text-red-500 font-bold"> *</span>:
                    </label>
                    <div className=" w-full">
                      <select
                        className="form-select appearance-none
                          block
                          w-full
                          px-3
                          py-1.5
                          text-base
                          font-normal
                          text-gray-700
                          bg-white bg-clip-padding bg-no-repeat
                          border border-solid border-gray-300
                          rounded
                          transition
                          ease-in-out
                          m-0
                         focus:border-blue-600 focus:outline-none"
                        aria-label="Default select example"
                        id="productCategory"
                        {...register("p_category", {
                          required: "Campo Obrigatório",
                        })}
                      >
                        <option value="">Selecione</option>
                        <optgroup label="Agricultura">
                          {categoriesList.Agricultura.map((category) => (
                            <option value={category} key={category}>
                              {category}
                            </option>
                          ))}
                        </optgroup>
                        <optgroup label="Deriados">
                          {categoriesList.Derivados.map((category) => (
                            <option value={category} key={category}>
                              {category}
                            </option>
                          ))}
                        </optgroup>
                        <optgroup label="Pecuária">
                          {categoriesList.Pecuaria.map((category) => (
                            <option value={category} key={category}>
                              {category}
                            </option>
                          ))}
                        </optgroup>
                      </select>
                      <ErrorMessage
                        errors={errors}
                        name="p_category"
                        render={({ message }) => (
                          <small className="text-red-500 text-xs">
                            {message}
                          </small>
                        )}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full flex flex-col md:flex-row items-center ">
                  <div className="w-full md:w-1/2 flex flex-col md:flex-row items-center md:justify-between ">
                    <div className="w-full md:w-[33%]  form-group mb-6">
                      <label
                        htmlFor="productPrice"
                        className="form-label inline-block mb-2 text-palm-700 mr-3"
                      >
                        Preço Atual
                        <span className="text-red-500 font-bold"> *</span>:
                      </label>
                      <input
                        type="number"
                        className="form-control
                    
                        w-full
                        px-3
                        py-1.5
                        text-base
                        text-gray-700
                        bg-white bg-clip-padding
                        border border-solid border-gray-300
                        rounded
                        transition
                        ease-in-out
                        m-0
                      focus:border-blue-600 focus:outline-none"
                        id="productPrice"
                        aria-describedby="productPrice"
                        placeholder="R$"
                        {...register("p_price", {
                          required: "Campo Obrigatório",
                          minLength: {
                            value: 1,
                            message: "o Preço deve ter mais de 1 caractere",
                          },
                        })}
                      />
                      <ErrorMessage
                        errors={errors}
                        name="p_price"
                        render={({ message }) => (
                          <small className="text-red-500 text-xs">
                            {message}
                          </small>
                        )}
                      />
                    </div>
                    <div className="w-full md:w-[33%]  form-group mb-6">
                      <label
                        htmlFor="productOldPrice"
                        className="form-label inline-block mb-2 text-palm-700 mr-3"
                      >
                        Preço Antigo
                        <span className=" text-xs text-gray-400"></span>:
                      </label>
                      <input
                        type="number"
                        className="form-control
                        block
                        w-full
                        px-3
                        py-1.5
                        text-base
                        font-normal
                        text-gray-700
                        bg-white bg-clip-padding
                        border border-solid border-gray-300
                        rounded
                        transition
                        ease-in-out
                        m-0
                       focus:border-blue-600 focus:outline-none"
                        id="productOldPrice"
                        placeholder="R$"
                        {...register("p_old_price", {
                          minLength: {
                            value: 1,
                            message: "o Preço deve ter mais de 1 caractere",
                          },
                        })}
                      />
                      <ErrorMessage
                        errors={errors}
                        name="p_old_price"
                        render={({ message }) => (
                          <small className="text-red-500 text-xs">
                            {message}
                          </small>
                        )}
                      />
                    </div>
                    <div className="w-full md:w-[25%]  form-group mb-6">
                      <label
                        htmlFor="productStock"
                        className="form-label inline-block mb-2 text-palm-700 mr-3"
                      >
                        Etoque
                        <span className=" text-xs text-gray-400"></span>:
                      </label>
                      <input
                        type="number"
                        className="form-control
                        block
                        w-full
                        px-3
                        py-1.5
                        text-base
                        font-normal
                        text-gray-700
                        bg-white bg-clip-padding
                        border border-solid border-gray-300
                        rounded
                        transition
                        ease-in-out
                        m-0
                    focus:border-blue-600 focus:outline-none"
                        id="productStock"
                        aria-describedby="product stock"
                        {...register("p_stock", {
                          minLength: {
                            value: 1,
                            message: "Insira algum valor",
                          },
                        })}
                      />
                      <ErrorMessage
                        errors={errors}
                        name="p_stock"
                        render={({ message }) => (
                          <small className="text-red-500 text-xs">
                            {message}
                          </small>
                        )}
                      />
                    </div>
                  </div>
                  <div className="w-full md:w-[30%]  form-group mb-6 md:ml-[3%]">
                    <label
                      htmlFor="productWhatsApp"
                      className="form-label inline-block mb-2 text-palm-700 mr-3"
                    >
                      Nº WhatsApp
                      <span className="text-red-500 font-bold"> *</span>:
                    </label>
                    <input
                      type="text"
                      className="form-control
                        block
                        w-full
                        px-3
                        py-1.5
                        text-base
                        font-normal
                        text-gray-700
                        bg-white bg-clip-padding
                        border border-solid border-gray-300
                        rounded
                        transition
                        ease-in-out
                        m-0
                        focus:border-blue-600 focus:outline-none"
                      id="productWhatsApp"
                      max={12}
                      maxLength={12}
                      aria-describedby="productWhatsApp"
                      placeholder="(DDD)9XXXX-XXXX"
                      {...register("p_n_contact", {
                        required: "Campo Obrigatório",
                        minLength: {
                          value: 12,
                          message: "informe o DDD + Nº do celular",
                        },
                        maxLength: {
                          value: 12,
                          message: "informe apenas o DDD + Nº do celular",
                        },
                        pattern: {
                          value: /^[0-9]+$/,
                          message: "Por favor, apenas números",
                        },
                      })}
                    />
                    <ErrorMessage
                      errors={errors}
                      name="p_n_contact"
                      render={({ message }) => (
                        <small className="text-red-500 text-xs">
                          {message}
                        </small>
                      )}
                    />
                  </div>
                </div>
                <div className="w-full flex flex-col md:flex-row items-center ">
                  <div className="form-group mb-6 w-full md:w-1/2">
                    <label
                      htmlFor="productDescription"
                      className="form-label inline-block mb-2 text-palm-700 mr-3"
                    >
                      Descrição
                      <span className="text-red-500 font-bold"> *</span>:
                    </label>
                    <textarea
                      className="
                      form-control
                      block
                      w-full
                      px-3
                      py-1.5
                      text-base
                      text-gray-700
                      bg-white bg-clip-padding
                      border border-solid border-gray-300
                      rounded
                      transition
                      ease-in-out
                      m-0
                      focus:text-gray-700 focus:outline-none
                     "
                      id="productDescription"
                      rows={3}
                      placeholder="Informe aqui o máximo  de informações sobre o produto."
                      {...register("p_description", {
                        required:
                          "Informe os detalhes do produto para continuar",
                        minLength: {
                          value: 11,
                          message: "O nome deve ter no mínimo caracteres",
                        },
                      })}
                    />
                    <ErrorMessage
                      errors={errors}
                      name="p_description"
                      render={({ message }) => (
                        <small className="text-red-500 text-xs">
                          {message}
                        </small>
                      )}
                    />
                  </div>
                </div>

                <div className="w-full my-4">
                  <h3 className="w-full text-center md:text-left text-palm-700 text-md md:text-lg font-semibold mb-2">
                    Escolha as imagens do produto
                  </h3>
                  <p className="w-full text-center md:text-left text-gray-500 mb-8">
                    Lembre-se, essas imagens serão a primeira visão que os
                    clientes terão desse produto{" "}
                  </p>

                  <div className="w-full flex flex-col md:flex-row justify-start items-center mb-4">
              
                      
                        {filesData.map((item, index) => (
                          <div
                            className="relative w-4/5 md:w-1/5 h-[14rem] rounded mb-4 md:mb-0 md:mr-6 "
                            key={index}
                          >
                            <ImgPreview
                              imgName={item.name!}
                              url={item.preview}
                              deleteFile={handleDelete}
                              classNameAdditionalForImg={
                                "w-full h-full rounded  "
                              }
                            />
                          </div>
                        ))}

                        {!filesData[0] && (
                          <div className="dropzone w-4/5 md:w-1/5 h-[14rem] ">
                            <DropzoneInput
                              onUpload={handleUpload}
                              typeFile="image"
                              text="Imagem de capa"
                              classNameAdditional={
                                " bg-gray-100 border border-dashed border-gray-400 rounded mb-4 md:mb-0 rounded"
                              }
                            />
                          </div>
                        )}

                        {!!filesData[0] && filesData.length < 4 && (
                          <div className="dropzone w-4/5 md:w-1/5 h-[14rem] ">
                            <DropzoneInput
                              onUpload={handleUpload}
                              typeFile="image"
                              text="Adicionar outra imagem"
                              classNameAdditional={
                                " bg-gray-100 border border-dashed border-gray-400 rounded mb-4 md:mb-0  rounded"
                              }
                            />
                          </div>
                        )}
                      
                  
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={filesData.length <= 0 ? true : false}
                  className={classNames(
                    " block w-[90%] md:w-1/4 mx-auto md:mx-0 my-8 py-3 px-3 text-white text-md font-semibold   rounded ",
                    {
                      "bg-palm-700": filesData.length > 0,
                      "bg-palm-900 opacity-80": filesData.length <= 0,
                    }
                  )}
                >
                  Cadastrar produto
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}
