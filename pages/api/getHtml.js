import { getHtml } from "../lib/api";

export default async (req, res) => {
  const html = await getHtml();
  res.statusCode = 200;
  res.json(html);
};
