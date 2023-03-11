import { Trash } from "phosphor-react";

type Props = {
  url: string;
  imgName: string;
  classNameAdditionalForImg?: string;
  deleteFile: (fileRef: string) => void;
};
export function ImgPreview({
  url,
  imgName,
  classNameAdditionalForImg,
  deleteFile,
}: Props) {
  return (
    <div className="relative w-full  h-full rounded ">
      <img
        src={url}
        alt={imgName}
        className={
          classNameAdditionalForImg
            ? "relative w-full  h-full " + classNameAdditionalForImg
            : "relative w-full  h-full "
        }
        loading="lazy"
      />
      <div
        className="absolute bottom-0 left-0 w-full h-full flex flex-col items-center justify-center bg-black opacity-0 hover:opacity-80 rounded transition
          ease-in-out "
      >
        <button
          onClick={() => deleteFile(imgName)}
          className="text-sm text-center font-semibold text-palm-700 flex flex-col items-center justify-center   "
        >
          <Trash size={42} color="#789B3D" weight="light" />
          Excluir
        </button>
      </div>
    </div>
  );
}
