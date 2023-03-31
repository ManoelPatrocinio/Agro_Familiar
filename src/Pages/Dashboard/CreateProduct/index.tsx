import { ErrorMessage } from "@hookform/error-message";
import classNames from "classnames";
import { Question } from "phosphor-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { DropzoneInput } from "../../../Components/Dropzone";
import { ImgPreview } from "../../../Components/ImgPreview";
import { MenuOfDashboard } from "../../../Components/MenuOfDashboard";
import { Menu_Sidebar } from "../../../Components/Menu_Sidebar";
import { Load_spinner } from "../../../Components/load_spinner";
import { FileUploaded } from "../../../Types/fileUploaded.types";
import { Product } from "../../../Types/product.type";
import { User } from "../../../Types/user.type";
import Logo from "../../../assets/images/Logo.png";
import { useApiPost } from "../../../hook/useApi";
import { FirebaseUploadFile } from "../../../service/firebase";
import { CheckLocalStorage } from "../../../service/localStorage";

const InitialProductState = {
  id: "",
  farmer_id: "",
  p_name: "",
  p_category: "",
  p_price: "",
  p_old_price: "",
  p_stock: 0,
  p_raiting: 0,
  p_n_contact: "",
  p_description: "",
  p_images: [],
};
export function CreateProduct() {
  //************* start pre config from register form *************
  const [prodData, setProductData] = useState(InitialProductState); //state for add new user
  const [filesData, setFileData] = useState<FileUploaded[]>([]);
  const [userStatus, setUserStatus] = useState<User | null>(null);
  const [isLoading, setIsloading] = useState<boolean>(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  useEffect(() => {
    setUserStatus(CheckLocalStorage.getLoggedUser());
  }, []);

  //function for add value input on state
  const setValueFromFormInput = (newValue: any) => {
    setProductData((inputValue) => ({ ...inputValue, ...newValue }));
  };
  //receive the file from dropzone component and set news props to display on other component ex: ImgPreview
  const handleUpload = (file: File) => {
    let finalListFile = filesData.concat(file);
    if (finalListFile.length <= 4) {
      setFileData(finalListFile);
    }
  };
  function resetFilds() {
    setProductData(InitialProductState);
    setFileData([]);
  }
  const handleDelete = (url: string) => {
    return setFileData(filesData.filter((file) => file.preview !== url));
  };

  async function uploadImgs() {
    let newData: string[] = [];
    setIsloading(true);
    filesData.forEach(async (item) => {
      const { url } = await FirebaseUploadFile(item as File, "/products");
      if (url) {
        newData.push(url);
        check(filesData, newData);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oppss",
          text: "Desculpe, uma imagem não pode ser salva",
        });
      }
    });
  }

  function check(arrayChosenImg: FileUploaded[], arrayUploadedImgs: string[]) {
    if (arrayChosenImg.length === arrayUploadedImgs.length) {
      sendNewProduct(arrayUploadedImgs);
    } else {
      console.log("esperando...");
    }
  }

  const sendNewProduct = async (imgsUrl: string[]) => {
    const priceFormated = prodData.p_price.replace(",", ".");
    const oldPriceFormated = prodData.p_old_price.replace(",", ".");

    const newProductFormated = {
      farmer_id: userStatus?._id,
      p_name: prodData.p_name,
      p_category: prodData.p_category,
      p_price: priceFormated,
      p_old_price: oldPriceFormated,
      p_stock: prodData.p_stock,
      p_n_contact: prodData.p_n_contact,
      p_description: prodData.p_description,
      p_images: imgsUrl,
    };
    console.log("imgsUrl on send", imgsUrl);
    console.log("newProductFormated", newProductFormated);

    const { apiResponse } = await useApiPost<Product>(
      "/admin/add-product",
      newProductFormated
    );

    resetFilds();
    if (apiResponse != null) {
      setIsloading(false);
      Swal.fire({
        icon: "success",
        title: "Success !",
        showConfirmButton: false,
        timer: 1500,
      });

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
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
        <div className="hidden md:block w-[30%] min-h-full border-r border-gray-200 ">
          <MenuOfDashboard userLogged={userStatus!} />
        </div>
        <div className="relative w-full md:w-[70%] h-full px-8">
          {isLoading ? (
            <Load_spinner
              adicionalClass="w-full h-screen bg-white "
              message={"Salvando produto,aguarde ..."}
            />
          ) : (
            <>
              <h1 className="w-full text-center md:text-left text-md md:text-xl text-palm-700 font-semibold my-8 opacity-70">
                Cadastro de Produto
              </h1>
              <form
                className="w-full  h-full   md:py-10  md:mx-auto"
                method="POST"
              >
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
                        bg-white bg-clip-padding
                        border border-solid border-gray-300
                        rounded
                        transition
                        ease-in-out
                        m-0
                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      id="productName"
                      aria-describedby="productName"
                      placeholder="Digite aqui"
                      {...register("productName", {
                        required: "Campo Obrigatório",
                        minLength: {
                          value: 3,
                          message: "O nome deve ter mais de 3 caracteres",
                        },
                      })}
                      onChange={(e) =>
                        setValueFromFormInput({
                          p_name: e.target.value,
                        })
                      }
                    />
                    <ErrorMessage
                      errors={errors}
                      name="productName"
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
                      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        aria-label="Default select example"
                        id="productCategory"
                        {...register("productCategory", {
                          required: "Campo Obrigatório",
                        })}
                        onChange={(e) =>
                          setValueFromFormInput({
                            p_category: e.target.value,
                          })
                        }
                      >
                        <option value="">Selecione</option>
                        <optgroup label="Agricultura">
                          <option value="Feijão">Grãos</option>
                          <option value="Mandioca">Mandioca</option>
                          <option value="Hortaliças">Hortaliças</option>
                          <option value="Frutas">Frutas</option>
                        </optgroup>
                        <optgroup label="Deriados">
                          <option value="Pães/Bolos/Biscoitos">
                            Pães/Bolos/Biscoitos
                          </option>
                          <option value="Doces">Doces </option>
                          <option value="Bebidas">Bebidas </option>
                          <option value="Temperos">Temperos</option>
                          <option value="Outros">Outros</option>
                        </optgroup>
                        <optgroup label="Pecuária">
                          <option value="Bovinos">Bovinos </option>
                          <option value="Capríno/Ovínos">
                            Capríno/Ovínos{" "}
                          </option>
                          <option value="Suínos">Suínos </option>
                          <option value=" Áves"> Áves</option>
                          <option value="Piscícultura">Piscícultura</option>
                        </optgroup>
                      </select>
                      <ErrorMessage
                        errors={errors}
                        name="productCategory"
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
                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        id="productPrice"
                        aria-describedby="productPrice"
                        placeholder="R$"
                        {...register("productPrice", {
                          required: "Campo Obrigatório",
                          minLength: {
                            value: 1,
                            message: "o Preço deve ter mais de 1 caractere",
                          },
                        })}
                        onChange={(e) =>
                          setValueFromFormInput({
                            p_price: e.target.value,
                          })
                        }
                      />
                      <ErrorMessage
                        errors={errors}
                        name="productPrice"
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
                  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        id="entityCnpj"
                        aria-describedby="productOldPrice"
                        placeholder="R$"
                        onChange={(e) =>
                          setValueFromFormInput({
                            p_old_price: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="w-full md:w-[25%]  form-group mb-6">
                      <label
                        htmlFor="productOldPrice"
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
                  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        id="entityCnpj"
                        aria-describedby="productOldPrice"
                        onChange={(e) =>
                          setValueFromFormInput({
                            p_stock: e.target.value,
                          })
                        }
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
                  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      id="productWhatsApp"
                      max={12}
                      maxLength={12}
                      aria-describedby="productWhatsApp"
                      placeholder="(DDD)9XXXX-XXXX"
                      {...register("productWhatsApp", {
                        required: "Campo Obrigatório",
                        minLength: {
                          value: 11,
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
                      onChange={(e) =>
                        setValueFromFormInput({
                          p_n_contact: e.target.value,
                        })
                      }
                    />
                    <ErrorMessage
                      errors={errors}
                      name="productWhatsApp"
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
                      {...register("productDescription", {
                        required:
                          "Informe os detalhes do produto para continuar",
                        minLength: {
                          value: 11,
                          message: "O nome deve ter mais de 1 caracteres",
                        },
                      })}
                      onChange={(e) =>
                        setValueFromFormInput({
                          p_description: e.target.value,
                        })
                      }
                    />
                    <ErrorMessage
                      errors={errors}
                      name="productDescription"
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
                          classNameAdditionalForImg={"w-full h-full rounded  "}
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
                  onClick={handleSubmit(() => uploadImgs())}
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
