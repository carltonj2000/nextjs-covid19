import React from "react";
import { useRouter } from "next/router";

const Tbody = ({ body }) => (
  <tbody>
    {(body || []).map((tr, i) => (
      <tr key={i}>
        {tr.map((td, j) => (
          <td key={j}>{td}</td>
        ))}
      </tr>
    ))}
  </tbody>
);
const Thead = ({ head }) => (
  <thead>
    <tr>
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

const ButtonNavHandle = (handleClick) => ({ name }) => (
  <button onClick={() => handleClick(name)}>{name}</button>
);

const getTableFrom = (navState, tables) => {
  let table = null;
  switch (navState) {
    case USA_ALL:
      table = tables.USA;
      break;
    case World_ALL:
      table = tables.World;
      break;
    default:
      table = table.World;
      break;
  }
  return table.table;
};

export default function Home({ tables }) {
  const router = useRouter();
  const { query } = router;
  const [navState, navStateSet] = React.useState(USA_ALL);
  const ButtonNav = ButtonNavHandle(navStateSet);
  const table = getTableFrom(navState, tables);
  return (
    <div>
      <ButtonNav name={USA_ALL} />
      <ButtonNav name={World_ALL} />
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
