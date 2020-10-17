import fs from "fs";
import path from "path";

const lines = fs
  .readFileSync(
    path.join(process.cwd(), "./data/coronaVirusStatsWorld202010_15Oct.html")
  )
  .toString()
  .split("\n");
const noMtLines = lines.filter((line) => line.trim().length !== 0);
const noMt = noMtLines.join("\n");
fs.writeFileSync(
  path.join(
    process.cwd(),
    "./data/coronaVirusStatsWorld202010_15Oct_mod1.html"
  ),
  noMt
);
