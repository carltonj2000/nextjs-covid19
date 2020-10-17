import { getTableQuick } from "../lib/api";

export default async (req, res) => {
  const table = await getTableQuick();
  res.statusCode = 200;
  res.json(table);
};
