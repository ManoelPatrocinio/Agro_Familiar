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
            ? "relative " + classNameAdditionalForImg
            : "relative w-full  h-full "
        }
        loading="lazy"
      />
      <div
        className={
          classNameAdditionalForImg
            ? "absolute bottom-0 left-0  flex flex-col items-center justify-center bg-black opacity-0 hover:opacity-80  transition ease-in-out " +
              classNameAdditionalForImg
            : "absolute bottom-0 left-0 w-full h-full flex flex-col items-center justify-center bg-black opacity-0 hover:opacity-80 rounded transition  ease-in-out"
        }
      >
        <button
          type="button"
          onClick={() => deleteFile(url)}
          className="text-sm text-center font-semibold text-green-500 flex flex-col items-center justify-center"
        >
          <Trash size={42} color="#51BB7A" weight="light" />
          Alterar
        </button>
      </div>
    </div>
  );
}
