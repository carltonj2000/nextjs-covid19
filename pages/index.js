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

export default function Home({ html, table }) {
  return (
    <div>
      data size {html.length}
      <Table {...table} />
    </div>
  );
}

const fetchJson = async (api) => {
  const data = await fetch(`http://localhost:3000/api/${api}`);
  const json = await data.json();
  return json;
};

export async function getStaticProps(context) {
  const { html } = await fetchJson("getHtml");
  const { table } = await fetchJson("getTableQuick");
  return {
    props: { html, table },
  };
}
