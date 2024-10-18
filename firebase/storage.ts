import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { base64ToBytes } from "./utils";
import {storage} from '.'


export async function uploadImage(bytes: Blob,path: string) {

    const r = ref(storage, `images/${path}`)
    const response = await uploadBytes(r, bytes)
    const url = await getDownloadURL(r)
    return url
}