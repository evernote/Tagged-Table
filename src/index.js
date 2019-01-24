export default function taggedTable(
  strings: string[],
  ...args: any[]
): Object[] {
  const rowStrings = String.raw(strings)
    .split("\n")
    .filter(v => v);

  const topLine = rowStrings[0];
  const cleanString = topLine.replace(/\s/g, "");
  const fields = cleanString.split("|");
  let argsIdx = 0;

  return rowStrings.slice(1, -1).map(row => {
    const rowDataArr = row.split("|").map(str => str.trim());

    return rowDataArr.reduce((acc, curr, idx) => {
      if (curr === "") {
        const value = args[argsIdx];
        acc[fields[idx]] = args[argsIdx];
        argsIdx += 1;
      } else {
        acc[fields[idx]] = curr;
      }

      return acc;
    }, {});
  });
}
