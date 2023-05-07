import { getAllFeedback } from "../../../lib/db-admin";

export default async (req, res) => {
  const siteId = req.query.siteId;
  const { feedback, err } = await getAllFeedback(siteId);
  if (err) {
    res.status(500).json({ err });
  }
  res.status(200).json({ feedback });
};
