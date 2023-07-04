import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";

type Props = {
  id: string;
  mask: string;
  onChange: (e: any) => void;
  texthelp: string;
};
export function MaskedInput({ mask, texthelp, id }: Props) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  return (
    <>
      <InputMask
        id={id}
        mask={mask}
        placeholder={texthelp}
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
          focus:text-gray-700 
          focus:bg-white 
          focus:border-blue-600 
          focus:outline-none"
        required
        {...register("u_full_name", {
          required: "Campo obrigatório",
          minLength: {
            value: 6,
            message: "Este campo deve ter mais de 6 caracteres",
          },
        })}
      />
      <ErrorMessage
        errors={errors}
        name="u_entity_name"
        render={({ message }) => (
          <small className="text-red-500 text-xs">{message}</small>
        )}
      />
    </>
  );
}
