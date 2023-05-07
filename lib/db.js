import { collection, addDoc } from 'firebase/firestore'
import db from './firebase'

const sitesDB = collection(db, 'sites');
const feedbackDB = collection(db, 'feedback')

export async function createSite(data) {
    return await addDoc(sitesDB, data);
}

export async function createFeedback(data) {
    return await addDoc(feedbackDB, data)
}
