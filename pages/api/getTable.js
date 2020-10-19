import { getTable, worldOrUsa } from "../lib/api";

export default async (req, res) => {
  const table = await getTable(worldOrUsa(req.query));
  res.statusCode = 200;
  res.json(table);
};
