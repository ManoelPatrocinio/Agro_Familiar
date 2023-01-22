import { FileUploaded } from "../Types/fileUploaded.types";

type Props = {
  filesUploaded: FileUploaded 
  deleteFile: (id: string) => void;
};
export function ImgPreview({ filesUploaded, deleteFile }: Props) {
  console.log("kjj",filesUploaded)
  return (
    <div className="w-4/5 md:w-1/5 h-[14rem] rounded mb-4 md:mb-0">
      <li
        key={filesUploaded.id}
        className=" w-full h-full flex justify-between align-center rounded "
      >
        <img
          src={filesUploaded.preview}
          alt={filesUploaded.name}
          className="w-full h-full rounded"
        />
      </li>
    </div>
  );
}
