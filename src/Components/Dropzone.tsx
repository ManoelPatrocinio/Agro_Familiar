import { PlusCircle } from "phosphor-react";
import { useDropzone } from "react-dropzone";
import Swal from "sweetalert2";
import { FileUploaded } from "../Types/fileUploaded.types";

type Props = {
  onUpload: (files: FileUploaded[]) => void;
  typeFile: string;
  text: string;
};
export function DropzoneInput({ onUpload, typeFile, text }: Props) {
  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    typeFile === "image"
      ? useDropzone({
          maxFiles: 1,

          accept: {
            "image/*": [".jpeg", ".png", ".jpg", ".webp"],
          },
          onDrop: (acceptedFiles) => {
            // check if the file is smaller than 2MB
            if (acceptedFiles[0].size <= 2097152) {
              acceptedFiles.map((file) =>
                Object.assign(file, {
                  preview: URL.createObjectURL(file),
                })
              );
              onUpload(acceptedFiles);
            } else {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Arquivo invalido, escolha um menor que 2MB !",
              });
            }
          },
        })
      : useDropzone({
          maxFiles: 5,
          accept: {
            "audio/*": [".mp3", ".mpeg"],
          },
          onDrop: (acceptedFiles) => {
            acceptedFiles.map((file) =>
              Object.assign(file, {
                preview: URL.createObjectURL(file),
              })
            );

            // onUpload(acceptedFiles);
          },
        });

  return (
    <div
      className="
        dropzone w-4/5 md:w-1/5 h-[14rem]  flex justify-center items-center
        bg-gray-100 border border-dashed border-gray-400 rounded
         mb-4 md:mb-0
         cursor-pointer
        "
      {...getRootProps()}
    >
      <input className="w-full h-full" {...getInputProps()} />
      {isDragReject ? (
        <p className="w-full text-center  text-red-500">
          Formato ou quantidade de arquivos não suportado !{" "}
        </p>
      ) : (
        <p className="w-full text-center text-palm-700 flex flex-col justify-center items-center font-semibold">
          <PlusCircle size={40} color="#89B045" />
          {text}
        </p>
      )}
    </div>
  );
}
