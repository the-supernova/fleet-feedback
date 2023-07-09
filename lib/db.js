import { collection, addDoc, deleteDoc, doc, setDoc } from 'firebase/firestore'
import db from './firebase'

const sitesDB = collection(db, 'sites');
const feedbackDB = collection(db, 'feedback')

export async function createSite(data) {
    const siteRef = doc(sitesDB);
    await setDoc(siteRef, data);
    return siteRef;
}

export async function createFeedback(data) {
    return await addDoc(feedbackDB, data)
}

export async function deleteFeedback(id) {
    return await setDoc(doc(db, 'feedback', id), { status: 'removed' }, { merge: true })
}

export async function updateFeedback(id, newValues) {
    return await setDoc(doc(db, 'feedback', id), newValues, { merge: true })
}
