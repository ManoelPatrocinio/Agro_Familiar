import { ErrorMessage } from "@hookform/error-message";
import { Question } from "phosphor-react";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useQueryClient } from "react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { DropzoneInput } from "../../../Components/Dropzone";
import { ImgPreview } from "../../../Components/ImgPreview";
import { MenuOfDashboard } from "../../../Components/MenuOfDashboard";
import { Menu_Sidebar } from "../../../Components/Menu_Sidebar";
import { Load_spinner } from "../../../Components/load_spinner";
import { categoriesList } from "../../../Global/categoriesList";
import { FileUploaded } from "../../../Types/fileUploaded.types";
import { Product } from "../../../Types/product.type";
import Logo from "../../../assets/images/Logo.png";
import { AuthContext } from "../../../context/AuthContext";
import { api } from "../../../hook/useApi";
import {
  FirebaseDeleteFile,
  FirebaseUploadFile,
} from "../../../service/firebase";
import ReactInputMask from "react-input-mask";
import Icon_money from "../../../assets/images/icon-money.png";
import Icon_pix from "../../../assets/images/icon-pix.png";
import Icon_cart from "../../../assets/images/icon-cart.png";


interface FormEdit {
  product: Product;
  imgUrlList?: string[];
}
export function EditProduct() {
  const { productId } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { userLogged } = useContext(AuthContext);
  const [filesUpload, setFilesUpload] = useState<File[]>([]);
  const [isLoading, setIsloading] = useState<boolean>(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<Product>();

  const {
    data: product,
    isFetching,
    error,
  } = useQuery<Product>(
    [`editProduct`, productId],
    async () => {
      const response = await api.get(`/product/${productId}`);
      return response.data.entityAndproduct.product;
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oppss",
      text: "Desculpe, não foi possível  exibir as informações desse produto, tente novamente.",
    });
  }

  //receive the file from dropzone component
  const handleUpload = (file: File) => {
    if (product!.p_images!.length + filesUpload.length <= 4) {
      setFilesUpload((old) => [...old, file]);
    }
  };
  const handleDelete = (url: string) => {
    return setFilesUpload(
      filesUpload.filter((file: FileUploaded) => file.preview !== url)
    );
  };
  async function handleSendForm(data: Product) {
    sendProductUpdated(data);
  }
  async function handleDeleteFromFirebase(url: string) {
    let imgName: string[];
    const img_url = product?.p_images!.filter((img_url) => img_url === url);
    if (img_url) {
      const splits = img_url[0].split("%2F");
      imgName = splits[1].split("?alt");

      await FirebaseDeleteFile(imgName![0], "products").then(() => {
        const imgUrlListUpdaded = product?.p_images!.filter(
          (img_url) => img_url !== url
        );
        sendProductUpdated(product!, imgUrlListUpdaded);
      });
    }
  }

  async function sendProductUpdated(formData: Product, prodUrlList?: string[]) {
    setIsloading(true);
    let imgUrlsList =
      prodUrlList && prodUrlList?.length > 0 ? prodUrlList : product?.p_images;
    const priceFormated = formData.p_price?.toString().replace(",", ".");
    const oldPriceFormated = formData.p_old_price?.toString().replace(",", ".");

    if (filesUpload.length > 0) {
      for (const img of filesUpload) {
        const { url } = await FirebaseUploadFile(img, "/products");
        if (url) {
          imgUrlsList!.push(url);
        }
      }
    }
    const newProductFormated: Product = {
      farmer_id: userLogged?._id,
      p_name: formData.p_name,
      p_category: formData.p_category,
      p_price: priceFormated ? parseFloat(priceFormated) : 0,
      p_old_price: oldPriceFormated ? parseFloat(oldPriceFormated) : 0,
      p_stock: formData.p_stock,
      p_n_contact: formData.p_n_contact?.replace(/[^0-9]+/g, ""),
      p_description: formData.p_description,
      p_images: imgUrlsList,
      p_payments:formData.p_payments,

      p_status: true,
    };
    await api
      .put(`/admin/update-product/${productId}`, newProductFormated)
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "Success !",
          text: response.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          queryClient.invalidateQueries(["editProduct"]);
        }, 1700);
      })
      .catch((error) => {
        console.error("edite product error", error);
        Swal.fire({
          icon: "error",
          title: "Oppss..",
          text: error.response.data.message,
          showConfirmButton: true,
        });
      })
      .finally(() => {
        setIsloading(false);
        setFilesUpload([]);
        reset();
      });
  }

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
          {isFetching || isLoading ? (
            <Load_spinner
              adicionalClass="w-full h-screen bg-white "
              message={"Processando, aguarde ..."}
            />
          ) : (
            <>
              <h1 className="w-full text-center md:text-left text-md md:text-xl text-palm-700 font-semibold my-8 ">
                Editar Informações do Produto
              </h1>
              <form
                onSubmit={handleSubmit(handleSendForm)}
                className="w-full  h-full   md:py-10  md:mx-auto"
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
                      defaultValue={product?.p_name}
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
                        defaultValue={product?.p_category}
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
                        defaultValue={product?.p_price}
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
                        defaultValue={product?.p_old_price}
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
                        defaultValue={product?.p_stock}
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

                    <ReactInputMask
                      type="text"
                      className="
                      form-control  
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
                      id="inputEntityMainPhone"
                      mask="(99) 99999-9999"
                      placeholder="(XX) 9XXXX-XXXX"
                      defaultValue={product?.p_n_contact}
                      {...register("p_n_contact", {
                        required: "Campo Obrigatório",
                        minLength: {
                          value: 11,
                          message: "Contato incompleto",
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
                      defaultValue={product?.p_description}
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
                  <div className="form-group mb-6 w-full md:w-[30%] md:ml-[3%]">
                    <label className="form-label inline-block mb-2 text-palm-700 ">
                      Formas de pagamento:
                    </label>
                    
                    <div className="w-full flex items-start  space-x-8">
                      <div className="w-12 h-16 flex flex-col justify-center items-center ">
                        <label
                          htmlFor="paymanent_money"
                          className="form-label w-10 h-12 mb-1 cursor-pointer"
                        >
                          <img
                            src={Icon_money}
                            alt="Dinheiro"
                            className="w-full h-full"
                          />
                        </label>
                        <input
                          type="checkbox"
                          value="money"
                          id="paymanent_money"
                          className="w-4 h-4 cursor-pointer"
                          defaultChecked={product?.p_payments?.includes("money")}
                          {...register("p_payments", {
                            required: {
                              value: true,
                              message: "Selecione no minímo uma forma",
                            },
                          })}
                        />
                      </div>
                      <div className="w-12 h-16 flex flex-col justify-center items-center">
                        <label
                          htmlFor="paymanent_pix"
                          className="form-label w-12 h-10 mb-1 cursor-pointer"
                        >
                          <img
                            src={Icon_pix}
                            alt="Pix"
                            className="w-full h-full"
                          />
                        </label>
                        <input
                          type="checkbox"
                          value="pix"
                          id="paymanent_pix"
                          className="w-4 h-4 cursor-pointer"
                          defaultChecked={product?.p_payments?.includes("pix")}
                          {...register("p_payments", {
                            required: {
                              value: true,
                              message: "Selecione no minímo uma forma",
                            },
                          })}
                        />
                      </div>
                      <div className="w-12 h-16 flex flex-col justify-center items-center">
                        <label
                          htmlFor="paymanent_cart"
                          className="form-label w-8 h-8 mb-1 cursor-pointer"
                        >
                          <img
                            src={Icon_cart}
                            alt="cartão"
                            className="w-full h-full"
                          />
                        </label>
                        <input
                          type="checkbox"
                          value="cart"
                          id="paymanent_cart"
                          className="w-4 h-4 cursor-pointer"
                          defaultChecked={product?.p_payments?.includes("cart")}

                          {...register("p_payments", {
                            required: {
                              value: true,
                              message: "Selecione no minímo uma forma",
                            },
                          })}
                        />
                      </div>
                    </div>
                    <ErrorMessage
                      errors={errors}
                      name="p_payments"
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
                    {product?.p_images!.map((imgUrl: string, index) => (
                      <div
                        className="relative w-4/5 md:w-1/5 h-[14rem] rounded mb-4 md:mb-0 md:mr-6 "
                        key={index}
                      >
                        <ImgPreview
                          imgName={imgUrl!}
                          url={imgUrl}
                          deleteFile={handleDeleteFromFirebase}
                          classNameAdditionalForImg={"w-full h-full rounded  "}
                        />
                      </div>
                    ))}

                    {filesUpload.map((item: FileUploaded, index) => (
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

                    {product!.p_images!.length + filesUpload.length < 4 && (
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
                  className=" block w-[90%] md:w-1/4 mx-auto md:mx-0 my-8 py-3 px-3 text-white text-md font-semibold  bg-palm-700 rounded "
                >
                  Atualizar produto
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}
