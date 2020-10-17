import { getTable } from "../lib/api";

export default async (req, res) => {
  const table = await getTable();
  res.statusCode = 200;
  res.json(table);
};
