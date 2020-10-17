const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");
const { JSDOM } = require("jsdom");

const getHtml = async () => {
  const html = fs
    .readFileSync(
      path.join(
        process.cwd(),
        "./data/coronaVirusStatsWorld202010_15Oct_mod1.html"
      )
    )
    .toString();
  return { html };
};

const getTable = async () => {
  const { html } = await getHtml();
  let $ = cheerio.load(html);

  const trHead = $("#main_table_countries_today > thead > tr");
  const head = trHead[0].children.map((child) => child.children[0].data);

  const trBody = $("#main_table_countries_today > tbody").html();

  const htmlTable = `<!DOCTYPE html>
  <html>
    <head></head>
    <body>
      <table>
        <tbody>
          ${trBody}
        </tbody>
      </table>
    </body>
  </html>`;
  const { document } = new JSDOM(htmlTable).window;
  const trs = document.querySelectorAll("tr");
  const body = [];
  trs.forEach((tr) => {
    const tds = Array.prototype.slice.apply(tr.children);
    const row = [];
    tds.forEach((td) => {
      if (tr.rowIndex < 2)
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
  return { table: { head, body } };
};

getTable()
  .then(({ table }) =>
    fs.writeFileSync("./data/coronaWorld.json", JSON.stringify(table, null, 2))
  )
  .catch((e) => console.error("error", e));
