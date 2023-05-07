import { getAllSites } from '../../lib/db-admin';

export default async (_, res) => {
    const {sites, err} = await getAllSites();

    if (err) {
        res.status(500).json({ err });
    }
    
    res.status(200).json({ sites });
}
