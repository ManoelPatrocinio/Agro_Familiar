import { PlusCircle } from "phosphor-react";
import { useDropzone } from "react-dropzone";
import Swal from "sweetalert2";
import { MyFile } from "../Types/fileUploaded.types";

type Props = {
  onUpload: (files: MyFile, whereSave?: string) => void;
  typeFile: string;
  text: string;
  classNameAdditional: string;
  whereSave?: string;
};
export function DropzoneInput({
  onUpload,
  typeFile,
  text,
  classNameAdditional,
  whereSave,
}: Props) {
  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    typeFile === "image"
      ? useDropzone({
          maxFiles: 1,

          accept: {
            "image/*": [".jpeg", ".png", ".jpg", ".webp"],
          },
          onDrop: (acceptedFiles:any) => {
            // check if the file is smaller than 2MB
            if (acceptedFiles[0].size <= 2097152) {
              acceptedFiles.map((file:File) =>
                Object.assign(file, {
                  preview: URL.createObjectURL(file),
                })
              );
              onUpload(acceptedFiles[0], whereSave);
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
      className={
        classNameAdditional
          ? `dropzone w-full h-full  flex justify-center items-center cursor-pointer ` +
            classNameAdditional
          : "dropzone w-full h-full  flex justify-center items-center cursor-pointer right-0"
      }
      {...getRootProps()}
    >
      <input className="w-full h-full" {...getInputProps()} />
      {isDragReject ? (
        <p className="w-full text-center  text-red-500">
          Não suportado !{" "}
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
