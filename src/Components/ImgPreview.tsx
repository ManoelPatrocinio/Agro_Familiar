import { Trash } from "phosphor-react";
import { FileUploaded } from "../Types/fileUploaded.types";

type Props = {
  filesUploaded: FileUploaded;
  deleteFile: (id: string) => void;
};
export function ImgPreview({ filesUploaded, deleteFile }: Props) {
  console.log("filesUploaded.id!", filesUploaded!);

  return (
    <div className="relative w-4/5 md:w-1/5 h-[14rem] rounded mb-4 md:mb-0 md:mr-6">
      <li
        key={filesUploaded.id}
        className=" w-full h-full flex justify-between align-center rounded "
      >
        <img
          src={filesUploaded.preview}
          alt={filesUploaded.name}
          className="w-full h-full rounded"
          loading="lazy"
        />
      </li>
      {/* <button className="w-full text-center text-sm text-red-600 font-normal py-1 my-3">
        Excluir
      </button> */}

      <div
        className="absolute bottom-0 left-0 w-full h-full flex flex-col items-center justify-center bg-black opacity-0 hover:opacity-80 rounded transition
          ease-in-out animation animate-spin"
      >
        <button
          onClick={() => deleteFile(filesUploaded.name!)}
          className="text-sm text-center font-semibold text-palm-700 flex flex-col items-center justify-center   "
        >
          <Trash size={42} color="#789B3D" weight="light" />
          Excluir
        </button>
      </div>
    </div>
  );
}
