import fs from "fs";
import path from "path";
import cheerio from "cheerio";
import pkg from "jsdom";
const { JSDOM } = pkg;

const htmlTable = (bdyHd, guts) => `<!DOCTYPE html>
  <html>
    <head></head>
    <body>
      <table>
        <${bdyHd}>
          ${guts}
        </${bdyHd}>
      </table>
    </body>
  </html>`;

export const worldOrUsa = (query) => {
  const frm = (query.from || "world").toLowerCase();
  const from = frm === "usa" ? "USA" : "World";
  const table_id =
    frm === "usa" ? "usa_table_countries_today" : "main_table_countries_today";
  return { from, table_id };
};
export const getHtml = async (from) => {
  const html = fs
    .readFileSync(
      path.join(
        process.cwd(),
        `./data/coronaVirusStats${from}202010_15Oct_mod1.html`
      )
    )
    .toString();
  return { html };
};

export const getTable = async ({ from, table_id }) => {
  const { html } = await getHtml(from);
  let $ = cheerio.load(html);

  const trHead = $(`#${table_id} > thead`).html();
  const { document: docHead } = new JSDOM(htmlTable("thead", trHead)).window;
  const ths = docHead.querySelectorAll("th");
  const head = [];
  ths.forEach((th) => head.push(th.innerHTML.replace("<br>", "\n")));

  const trBody = $(`#${table_id} > tbody`).html();
  const { document } = new JSDOM(htmlTable("tbody", trBody)).window;
  const trs = document.querySelectorAll("tr");
  const body = [];
  trs.forEach((tr) => {
    const tds = Array.prototype.slice.apply(tr.children);
    const row = [];
    tds.forEach((td) => {
      if (tr.rowIndex < 1)
        console.log(
          tr.rowIndex,
          td.cellIndex,
          td.children.length,
          td.children.item(0) ? td.children.item(0).innerHTML : "",
          td.innerHTML
        );
      row.push(
        td.children.item(0) ? td.children.item(0).innerHTML : td.innerHTML
      );
    });
    body.push(row);
  });
  return { table: { head, body }, from };
};

const worldUsa = worldOrUsa({});
const table = async (worldUsa) =>
  getTable(worldUsa)
    .then(({ table, from }) =>
      fs.writeFileSync(
        `./data/coronaVirusStats${from}202010_15Oct_mod1.json`,
        JSON.stringify(table, null, 2)
      )
    )
    .catch((e) => console.error("error", e));

table(worldOrUsa({ from: "USA" }))
  .then(() => console.log("finished USA"))
  .then(() => table(worldOrUsa({ from: "World" })))
  .then(() => console.log("finished World"));
