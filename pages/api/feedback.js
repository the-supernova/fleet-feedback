import { getAllFeedbackForSites } from "../../lib/db-admin";
import { getToken } from "next-auth/jwt";

export default async function handler(req, res) {
  try {
    const token = await getToken({ req, secret: process.env.JWT_SECRET });
    const uid = token?.sub;
    const { feedback } = await getAllFeedbackForSites(uid);
    res.status(200).json({ feedback });
  } catch (err) {
    res.status(500).json({ err });
  }
};
