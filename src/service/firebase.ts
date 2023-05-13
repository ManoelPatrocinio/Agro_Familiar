import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage';
import { v4 as createId } from 'uuid';
import { storage } from '../libs/firebase';

export async function FirebaseUploadFile(file: File, firebasePaste: string) {
  // verifica se é uma imagem do tipo permitido
  if (file) {
    const fileExtension = file.name?.split('.').pop();
    let randomName = createId();
    let newFile = ref(
      storage,
      `${firebasePaste}/${randomName}.${fileExtension}`
    );

    let upload = await uploadBytes(newFile, file); // faz o upload
    let photoUrl = await getDownloadURL(upload.ref);

    return {
      name: upload.ref.name,
      url: photoUrl,
    };
  } else {
    return {
      name: null,
      url: null,
    };
  }
}

export async function FirebaseDeleteFile(
  imgName: string,
  firebasePaste: string
) {
  // Create a reference to the file to delete
  const desertRef = ref(storage, `${firebasePaste}/${imgName}`);

  // Delete the file
  deleteObject(desertRef)
    .then(() => {
      console.log('success on delete:', imgName);
    })
    .catch((error) => {
      console.log('erro on delete Object', error);
    });
}
