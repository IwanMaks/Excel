import { stylesToString } from "@core/utils";
import { defaultStyles } from "@/constans";
import { parse } from "@core/parse";

const CODES = {
  A: 65,
  Z: 90,
};
const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

function toCell(state, row) {
  return function (_, col) {
    const id = `${row}:${col}`;
    const data = state.dataState[id] ? state.dataState[id] : "";
    const styles = stylesToString({
      ...defaultStyles,
      ...state.stylesState[id],
    });
    return `<div 
              class="cell" 
              contenteditable="true" 
              data-col="${col}" 
              data-id=${id} 
              data-type="cell" 
              data-value="${data || ""}"
              style="${styles}; width: ${getWidth(state.colState, col)}"
            > ${parse(data) || ""}
            </div>`;
  };
}

function toColumn({ col, index, width }) {
  return `<div 
            class="column" 
            data-type="resizable" 
            data-col="${index}" 
            style="width: ${width}"
          >
            ${col}
            <div class="col-resize" data-resize="col"></div>
          </div>`;
}

function toChar(_, i) {
  return String.fromCharCode(CODES.A + i);
}

function createRow(content, key = "", state = {}) {
  const resizer = key ? '<div class="row-resize" data-resize="row"></div>' : "";
  const height = getHeight(state, key);
  return `
  <div class="row" data-type="resizable" data-row="${key}" style="height: ${height}">
    <div class="row-info">
        ${key}
        ${resizer}
    </div>
    <div class="row-data">${content}</div>
  </div>
  `;
}

function getWidth(state, index) {
  return (state[index] || DEFAULT_WIDTH) + "px";
}

function getHeight(state, index) {
  return (state[index] || DEFAULT_HEIGHT) + "px";
}

function widthFrom(state) {
  return function (col, index) {
    return {
      col,
      index,
      width: getWidth(state.colState, index),
    };
  };
}

export function createTable(rowsCount = 45, state = {}) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const cols = new Array(colsCount)
    .fill(" ")
    .map(toChar)
    .map(widthFrom(state))
    .map(toColumn)
    .join("");

  rows.push(createRow(cols));

  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount).fill("").map(toCell(state, i)).join("");
    rows.push(createRow(cells, i + 1, state.rowState));
  }

  return rows.join("");
}
