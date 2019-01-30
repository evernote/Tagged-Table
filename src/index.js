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

  const rowData = rowStrings.slice(1, -1);

  const expectedValueLength = rowData.length * fields.length;
  let valueCount = args.length;

  const result = rowData.map(row => {
    const rowDataArr = row.split("|").map(str => str.trim());
    valueCount += rowDataArr.filter(v => v).length;

    return rowDataArr.reduce((acc, curr, idx) => {
      if (curr === "") {
        const value = args[argsIdx];
        acc[fields[idx]] = value;
        argsIdx += 1;
      } else {
        acc[fields[idx]] = curr;
      }

      return acc;
    }, {});
  });

  if (expectedValueLength !== valueCount) {
    throw new Error("Table formatting error: blank cells");
  } else {
    return result;
  }
}
