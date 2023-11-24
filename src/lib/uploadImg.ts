import { imageDb } from "../API/Firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

export const uploadImg = async (file: File, folder: string): Promise<string> => {
  const imgRef = ref(imageDb, `${folder}/${v4()}`);

  try {
    const uploadTaskSnapshot = await uploadBytes(imgRef, file);
    const imgUrl: string = await getDownloadURL(uploadTaskSnapshot.ref);

    return imgUrl;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};
