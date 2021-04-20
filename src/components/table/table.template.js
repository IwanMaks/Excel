const CODES = {
  A: 65,
  Z: 90,
};

// function toCell(row, col) {
//   return `<div class="cell" contenteditable="true" data-col="${col}"></div>`;
// }

function toCell(row) {
  return function (_, col) {
    return `<div class="cell" contenteditable="true" data-col="${col}" data-id="${row}:${col}" data-type="cell"></div>`;
  };
}

function toColumn(col, index) {
  return `<div class="column" data-type="resizable" data-col="${index}">
            ${col}
            <div class="col-resize" data-resize="col"></div>
          </div>`;
}

function toChar(_, i) {
  return String.fromCharCode(CODES.A + i);
}

function createRow(content, key = "") {
  const resizer = key ? '<div class="row-resize" data-resize="row"></div>' : "";
  return `
  <div class="row" data-type="resizable">
    <div class="row-info">
        ${key}
        ${resizer}
    </div>
    <div class="row-data">${content}</div>
  </div>
  `;
}

export function createTable(rowsCount = 45) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const cols = new Array(colsCount)
    .fill(" ")
    .map(toChar)
    .map(toColumn)
    .join("");

  rows.push(createRow(cols));

  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount)
      .fill("")
      // .map(toCell)
      .map(toCell(i))
      .join("");
    rows.push(createRow(cells, i + 1));
  }

  return rows.join("");
}
