import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as createId } from "uuid";
import { storage } from "../libs/firebase";

export async function FirebaseUploadFile(file: File, firebasePaste: string) {

 
// verifica se é uma imagem do tipo permitido
  if (file) {
     const fileExtension = file.name?.split(".").pop();
    let randomName = createId();
    let newFile =  ref(
      storage,
      `${firebasePaste}/${randomName}.${fileExtension}`
    );

    let upload = await uploadBytes(newFile, file); // faz o upload
    let photoUrl = await getDownloadURL(upload.ref);

     return {
      name: upload.ref.name,
      url: photoUrl,
    }
    
  } else {
   return {
      name: null,
      url: null,
    }
  }
}

