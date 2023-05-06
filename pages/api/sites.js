import { collection, getDocs } from 'firebase/firestore';
import db from "../../lib/firebase"

export default async (_, res) => {
    const sitesDB = collection(db, 'sites');
    const snapshot = await getDocs(sitesDB);
    const sites = [];

    snapshot.forEach((doc) => {
        sites.push({ id: doc.id, ...doc.data() });
    });

    res.status(200).json({ sites });
}
