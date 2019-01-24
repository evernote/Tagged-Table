"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = taggedTable;

function taggedTable(strings) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  var rowStrings = String.raw(strings).split("\n").filter(function (v) {
    return v;
  });
  var topLine = rowStrings[0];
  var cleanString = topLine.replace(/\s/g, "");
  var fields = cleanString.split("|");
  var argsIdx = 0;
  return rowStrings.slice(1, -1).map(function (row) {
    var rowDataArr = row.split("|").map(function (str) {
      return str.trim();
    });
    return rowDataArr.reduce(function (acc, curr, idx) {
      if (curr === "") {
        acc[fields[idx]] = args[argsIdx];
        argsIdx += 1;
      } else {
        acc[fields[idx]] = curr;
      }

      return acc;
    }, {});
  });
}
//# sourceMappingURL=index.js.map