import { storage } from "@core/utils";

function toHtml(key) {
  const model = storage(key);
  const id = key.split(":")[1];
  return `
    <li class="db__record">
        <a href="#excel/${id}" class="">${model.title}</a>
        <strong>
            ${new Date(model.openedDate).toLocaleDateString()}
            ${new Date(model.openedDate).toLocaleTimeString()}
        </strong>
    </li>
  `;
}

function getAllKeys() {
  const keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key.includes("excel")) {
      continue;
    } else {
      keys.push(key);
    }
  }
  return keys;
}

export function createRecordsTable() {
  const keys = getAllKeys();

  if (keys.length === 0) {
    return `<p>Таблиц нет</p>`;
  }

  return `
    <div class="db__list-header">
        <span>Название</span>
        <span>Дата открытия</span>
    </div>

    <div class="db__list">
        ${keys.map(toHtml).join("")}
    </div>
  `;
}
