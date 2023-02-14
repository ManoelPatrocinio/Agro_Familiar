import { ErrorMessage } from "@hookform/error-message";
import { Question } from "phosphor-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { MenuOfDashboard } from "../../../Components/MenuOfDashboard";
import { DropzoneInput } from "../../../Components/Dropzone";
import { ImgPreview } from "../../../Components/ImgPreview";
import { Menu_Sidebar } from "../../../Components/Menu_Sidebar";
import { FileUploaded } from "../../../Types/fileUploaded.types";
import Logo from "../../../assets/images/Logo.png";
import { useApiPost } from "../../../hook/useApi";
import Swal from "sweetalert2";

const InitialUserState = { 
  id: "",
  farmer_id: "",
  p_name: "",
  p_category: "",
  p_price: "",
  p_old_price: "",
  p_raiting: 0,
  p_n_contact: "",
  p_description: "",
  p_images: [],

};
export function CreateProduct(){
  //************* start pre config from register form *************
  const [prodData, setProductData] = useState(InitialUserState); //state for add new user
  const [filesData, setFileData] = useState<FileUploaded[]>([]);
  let filesArray: FileUploaded[] = [];

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  //function for add value input on state
  const setValueFromFormInput = (newValue: any) => {
    setProductData((inputValue) => ({ ...inputValue, ...newValue }));
  };
  //receive the file from dropzone component and set news props to display on other component ex: ImgPreview
  const handleUpload = (files: FileUploaded[]) => {
    const uploadedFiles = files.map((file) => ({
      file,
      name: file.name,
      preview: file.preview,
      isUploaded: true,
      itsError: false,
    }));
    let finalListFile = filesData.concat(uploadedFiles);
    if (finalListFile.length <= 4) {
      setFileData(finalListFile);
    }
  };
  function resetFileData() {
    setProductData(InitialUserState);
    setFileData([]);
  }
  const handleDelete = (id: string) => {
    return setFileData(filesData.filter((file) => file.id !== id));
  };

  const sendNewProduct = async () => {
    const data: any = new FormData();

    // set all images on prop uploads
    filesData.forEach((file, index) => {
      data.append("uploads", file.file);
    });
    data.append("p_name", prodData.p_name);
    data.append("p_category", prodData.p_category);
    data.append("p_price", prodData.p_price);
    data.append("p_old_price", prodData.p_old_price);
    data.append("p_n_contact", prodData.p_n_contact);
    data.append("p_description", prodData.p_description);

    console.log("filesArray", filesArray);
    console.log("filesData", filesData);

    const { apiResponse } = await useApiPost<any>("upload-files/image", data);

    if (apiResponse) {
      Swal.fire({
        icon: "success",
        title: "Success !",
        showConfirmButton: false,
        timer: 1500,
      });
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
          <MenuOfDashboard />
        </div>
        <div className="w-full md:w-[70%] h-full px-8">
          <h1 className="w-full text-center md:text-left text-md md:text-xl text-palm-700 font-semibold my-8">
            Cadastro de Produto
          </h1>
          <form className="w-full  h-full   md:py-10  md:mx-auto" method="POST">
            <div className="w-full flex flex-col md:flex-row items-center ">
              <div className="w-full md:w-1/2 md:mr-[3%] form-group mb-6">
                <label
                  htmlFor="productName"
                  className="form-label inline-block mb-2 text-palm-700 mr-3"
                >
                  Nome/Título do Produto
                  <span className="text-red-500 font-bold"> *</span>:
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
                    required: "Informe o nome do produto para continuar",
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
                    <small className="text-red-500 text-xs">{message}</small>
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
                    defaultValue={"default"}
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
                      required: "Informe a categoria do produto para continuar",
                    })}
                    onChange={(e) =>
                      setValueFromFormInput({
                        p_category: e.target.value,
                      })
                    }
                  >
                    <option selected value="default">
                      Selecione
                    </option>
                    <optgroup label="Agricultura">
                      <option value="Milho">Milho</option>
                      <option value="Feijão">Feijão</option>
                      <option value="Mandioca">Mandioca</option>
                      <option value="Hotaliças">Hotaliças</option>
                      <option value="Frutas">Frutas</option>
                    </optgroup>
                    <optgroup label="Deriados">
                      <option value="Pães/Bolos/Biscoitos">
                        Pães/Bolos/Biscoitos
                      </option>
                      <option value="Doces">Doces </option>
                      <option value="Bebidas">Bebidas </option>
                      <option value="Tempores">Tempores</option>
                      <option value="Outros">Outros</option>
                    </optgroup>
                    <optgroup label="Pecuária">
                      <option value="Bovinos">Bovinos </option>
                      <option value="Capríno/Ovínos">Capríno/Ovínos </option>
                      <option value="Suínos">Suínos </option>
                      <option value=" Áves"> Áves</option>
                      <option value="Piscícultura">Piscícultura</option>
                    </optgroup>
                  </select>
                  <ErrorMessage
                    errors={errors}
                    name="productCategory"
                    render={({ message }) => (
                      <small className="text-red-500 text-xs">{message}</small>
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col md:flex-row items-center ">
              <div className="w-full md:w-1/2 flex flex-col md:flex-row items-center ">
                <div className="w-full md:w-[33%] md:mr-[15%] form-group mb-6">
                  <label
                    htmlFor="productPrice"
                    className="form-label inline-block mb-2 text-palm-700 mr-3"
                  >
                    Preço Atual
                    <span className="text-red-500 font-bold"> *</span>:
                  </label>
                  <input
                    type="text"
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
                      required: "Informe o atual preço do produto",
                      minLength: {
                        value: 1,
                        message: "O nome deve ter mais de 1 caracteres",
                      },
                      maxLength: 10,
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
                      <small className="text-red-500 text-xs">{message}</small>
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
                  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="productWhatsApp"
                  max={12}
                  maxLength={12}
                  aria-describedby="productWhatsApp"
                  placeholder="Digite aqui"
                  {...register("productWhatsApp", {
                    required: "Informe um número p/ contato para continuar",
                    minLength: {
                      value: 11,
                      message: "informe o DDD + Nº do celular",
                    },
                    maxLength: {
                      value: 12,
                      message: "informe apenas o DDD + Nº do celular",
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
                    <small className="text-red-500 text-xs">{message}</small>
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
                  required
                  {...register("productDescription", {
                    required: "Informe os detalhes do produto para continuar",
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
                    <small className="text-red-500 text-xs">{message}</small>
                  )}
                />
              </div>
            </div>

            <div className="w-full my-4">
              <h3 className="w-full text-center md:text-left text-palm-700 text-md md:text-lg font-semibold mb-2">
                Escolha as imagens do produto
              </h3>
              <p className="w-full text-left text-gray-500 mb-8">
                Lembre-se, essas imagens serão a primeira visão que os clientes
                terão desse produto{" "}
              </p>

              <div className="w-full flex flex-col md:flex-row justify-start items-center">
                {filesData.map((item, index) => (
                  <ImgPreview
                    key={index}
                    filesUploaded={item}
                    deleteFile={handleDelete}
                  />
                ))}

                {!filesData[0] && (
                  <DropzoneInput
                    onUpload={handleUpload}
                    typeFile="image"
                    text="Imagem de capa"
                  />
                )}

                {!!filesData[0] && filesData.length < 4 && (
                  <DropzoneInput
                    onUpload={handleUpload}
                    typeFile="image"
                    text="Adicionar outra imagem"
                  />
                )}
              </div>
            </div>
            <button
              onClick={handleSubmit(() => sendNewProduct())}
              type="submit"
              className="w-[60%] md:w-1/4 mx-[20%] md:mx-0 my-4 py-3 px-3 text-white text-md font-semibold  bg-palm-700 rounded "
            >
              Cadastrar produto
            </button>
          </form>
        </div>
      </div>
    </>
  );
}