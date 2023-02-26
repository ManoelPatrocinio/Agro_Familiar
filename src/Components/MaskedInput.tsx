import InputMask from "react-input-mask";

type Props = {
  id: string;
  mask: string;
  onChange: (e: any) => void;
  texthelp: string;
};
export function MaskedInput({ mask, onChange, texthelp, id }: Props) {
  return (
    <InputMask
      id={id}
      mask={mask}
      onChange={onChange}
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
    />
  );
}
