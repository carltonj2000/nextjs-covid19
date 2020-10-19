import React from "react";

import Tables from "./lib/tables";

const Tbody = ({ body }) => (
  <tbody>
    {(body || []).map((tr, i) => (
      <tr key={i}>
        <td key="1000">{i}</td>
        {tr.map((td, j) => (
          <td key={j}>{typeof td === "number" ? td.toFixed(1) : td}</td>
        ))}
      </tr>
    ))}
  </tbody>
);
const Thead = ({ head }) => (
  <thead>
    <tr>
      <td key="1000">#</td>
      {(head || []).map((td, i) => (
        <th key={i}>{td}</th>
      ))}
    </tr>
  </thead>
);

const Table = ({ head, body }) => (
  <table>
    <Thead {...{ head }} />
    <Tbody {...{ body }} />
  </table>
);

const USA_ALL = "USA All";
const World_ALL = "World All";
const World_Clean = "World Clean";
const USA_Clean = "USA Clean";

const ButtonNavHandle = (handleClick) => ({ name }) => (
  <button onClick={() => handleClick(name)}>{name}</button>
);

const getTableFrom = (navState, tables) => {
  let table = null;
  let head = null;
  let body = null;
  switch (navState) {
    case USA_ALL:
      table = tables.USA.table;
      break;
    case World_ALL:
      table = tables.World.table;
      break;
    case World_Clean:
      table = Tables.world_clean(tables.World.table);
      break;
    case USA_Clean:
      table = Tables.usa_clean(tables.USA.table);
      break;
    default:
      table = table.World.table;
      break;
  }
  return table;
};

export default function Home({ tables }) {
  const [navState, navStateSet] = React.useState(USA_ALL);
  const ButtonNav = ButtonNavHandle(navStateSet);
  const table = getTableFrom(navState, tables);
  return (
    <div>
      <ButtonNav name={USA_ALL} />
      <ButtonNav name={USA_Clean} />
      <ButtonNav name={World_ALL} />
      <ButtonNav name={World_Clean} />
      <Table {...table} />
    </div>
  );
}

export async function getStaticProps(context) {
  const dataWorld = await fetch(`http://localhost:3000/api/getTableQuick`);
  const World = await dataWorld.json();
  const dataUSA = await fetch(
    `http://localhost:3000/api/getTableQuick?from=usa`
  );
  const USA = await dataUSA.json();
  return {
    props: { tables: { USA, World } },
  };
}
