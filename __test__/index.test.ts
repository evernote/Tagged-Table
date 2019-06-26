import taggedTable from "../src/index";

const rootTable = taggedTable`
  id   | name   | value      | date
  ${1} | first  | ${false}   | 1/1/1970
  ${2} | second | ${true}    | 1/1/2000
  ${3} | third  | ${false}   | 3/5/2005
`;

describe("taggedTable", () => {
  it("expects an empty table if no rows", () => {
    const table = taggedTable`
      prop1 | prop2 | prop3
    `;

    expect(table.length).toBe(0);
  });

  it("handles an unindented table", () => {
    expect(rootTable.length).toBe(3);
  })

  it("builds arrays of objects, with keys being column headers and values the row cell", () => {
    const table = taggedTable`
      prop1         |  prop2          | prop3
      ${"row1val1"} |  ${"row1val2"}  | ${"row1val3"}
      ${"row2val1"} |  ${"row2val2"}  | ${"row2val3"}
      ${"row3val1"} |  ${"row3val2"}  | ${"row3val3"}
    `;

    expect(table).toEqual([
      { prop1: "row1val1", prop2: "row1val2", prop3: "row1val3" },
      { prop1: "row2val1", prop2: "row2val2", prop3: "row2val3" },
      { prop1: "row3val1", prop2: "row3val2", prop3: "row3val3" }
    ]);
  });

  it("handles large objects", () => {
    const table = taggedTable`
      prop1 | prop2 | prop3 | prop4 | prop5 | prop6 | prop7 | prop8 | prop9 | prop10 | prop11 | prop12 | prop13 | prop14 | prop15
      ${1}  |  ${2} | ${3}  | ${4}  | ${5}  | ${6}  | ${7}  | ${8}  | ${9}  | ${10}  | ${11}  | ${12}  | ${13}  | ${14}  | ${15}
    `;

    expect(table).toEqual([
      {
        prop1: 1,
        prop2: 2,
        prop3: 3,
        prop4: 4,
        prop5: 5,
        prop6: 6,
        prop7: 7,
        prop8: 8,
        prop9: 9,
        prop10: 10,
        prop11: 11,
        prop12: 12,
        prop13: 13,
        prop14: 14,
        prop15: 15
      }
    ]);
  });

  it("handles strings as values", () => {
    const table = taggedTable`
      prop1  | prop2  | prop3
      one    | ${2}   | three
      four   | ${5}   | six
    `;

    expect(table).toEqual([
      { prop1: "one", prop2: 2, prop3: "three" },
      { prop1: "four", prop2: 5, prop3: "six" }
    ]);
  });

  it("handles multi-word string values", () => {
    const table = taggedTable`
      prop1  | prop2       | prop3
      ${1}   | two two     | ${3}
      ${4}   | five five   | ${6}
      ${7}   | eight eight | ${9}
    `;

    expect(table).toEqual([
      { prop1: 1, prop2: "two two", prop3: 3 },
      { prop1: 4, prop2: "five five", prop3: 6 },
      { prop1: 7, prop2: "eight eight", prop3: 9 }
    ]);
  });

  it("handles a table with a single string prop", () => {
    const table = taggedTable`
      prop1
      one
      two
      three
    `;

    expect(table).toEqual([
      { prop1: "one" },
      { prop1: "two" },
      { prop1: "three" }
    ]);
  });

  it("throws an error if cell left blank", () => {
    function makeTable() {
      taggedTable`
      prop1  | prop2  | prop3
      one    |        | three
      four   | five   | six
    `;
    }

    expect(makeTable).toThrowError()
  });
});
