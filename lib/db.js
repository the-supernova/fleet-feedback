import { collection, addDoc } from 'firebase/firestore'
import db from './firebase'

const sitesDB = collection(db, 'sites');

export async function createSite(data) {
    return await addDoc(sitesDB, data);
}
