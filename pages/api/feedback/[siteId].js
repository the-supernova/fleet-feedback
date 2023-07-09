import { getAllFeedback, getSite } from "../../../lib/db-admin";

export default async function handler(req, res) {
  const siteId = req.query.siteId;
  const { feedback, err } = await getAllFeedback(siteId);
  const { site } = await getSite(siteId);

  if (err) {
    res.status(500).json({ err });
  }
  res.status(200).json({ feedback, site });
};
