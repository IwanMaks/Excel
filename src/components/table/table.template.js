const CODES = {
  A: 65,
  Z: 90,
};

function toCell() {
  return `<div class="cell" contenteditable="true"></div>`;
}

function toColumn(col) {
  return `<div class="column">${col}</div>`;
}

function toChar(_, i) {
  return String.fromCharCode(CODES.A + i);
}

function createRow(content, key = "") {
  return `
  <div class="row">
    <div class="row-info">${key}</div>
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
    const cells = new Array(colsCount).fill("").map(toCell).join("");
    rows.push(createRow(cells, i + 1));
  }

  return rows.join("");
}
