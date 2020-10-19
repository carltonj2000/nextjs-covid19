const world_clean_all_cols = [1, 2, 4];

const getInt = (str) =>
  str.trim().length ? parseInt(str.replace(/,/g, "")) : 0;

export const world_clean = ({ head: oldHead, body: oldBody }) => {
  const rPOPULATION = 13;
  const keepIdx = [1, 2, 4, rPOPULATION];
  const smallLocationLimit = 50e6;
  const sortIdx = 2;
  const insertPerCasesDeadAt = 1;
  const headFiltered = [...oldHead.filter((_, idx) => keepIdx.includes(idx))];
  const head = [
    ...headFiltered.slice(0, insertPerCasesDeadAt),
    "% infected dead",
    "deads per 1M",
    ...headFiltered.slice(insertPerCasesDeadAt),
  ];
  const bodyPreSort = oldBody
    .filter((tr) => getInt(tr[rPOPULATION]) > smallLocationLimit)
    .map((tr) => tr.filter((_, idx) => keepIdx.includes(idx)))
    .map((tr) => [
      ...tr.slice(0, insertPerCasesDeadAt),
      (100 * getInt(tr[2])) / getInt(tr[1]),
      (1e6 * getInt(tr[2])) / getInt(tr[3]),
      ...tr.slice(insertPerCasesDeadAt),
    ]);

  const body = bodyPreSort.sort((a, b) =>
    a[sortIdx] === b[sortIdx] ? 0 : a[sortIdx] < b[sortIdx] ? 1 : -1
  );
  return { head, body };
};

export const usa_clean = ({ head: oldHead, body: oldBody }) => {
  const rPOPULATION = 12;
  const keepIdx = [1, 2, 4, rPOPULATION];
  const sortIdx = 2;
  const insertPerCasesDeadAt = 1;
  const headFiltered = [...oldHead.filter((_, idx) => keepIdx.includes(idx))];
  const head = [
    ...headFiltered.slice(0, insertPerCasesDeadAt),
    "% infected dead",
    "deads per 1M",
    ...headFiltered.slice(insertPerCasesDeadAt),
  ];
  const bodyPreSort = oldBody
    .filter((tr) => !tr[1].toLowerCase().includes("total"))
    .map((tr) => tr.filter((_, idx) => keepIdx.includes(idx)))
    .map((tr) => [
      ...tr.slice(0, insertPerCasesDeadAt),
      (100 * getInt(tr[2])) / getInt(tr[1]),
      (1e6 * getInt(tr[2])) / getInt(tr[3]),
      ...tr.slice(insertPerCasesDeadAt),
    ]);

  const body = bodyPreSort.sort((a, b) =>
    a[sortIdx] === b[sortIdx] ? 0 : a[sortIdx] < b[sortIdx] ? 1 : -1
  );
  return { head, body };
};

export default {
  world_clean,
  usa_clean,
};
