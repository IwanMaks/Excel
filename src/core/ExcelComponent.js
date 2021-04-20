import { DOMListener } from "@core/DOMListener";

export class ExcelComponent extends DOMListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || "";
    this.emitter = options.emitter;
    this.unsubs = [];

    this.prepare();
  }

  // Настраиваем наш компонент до init
  prepare() {}

  // Возвращает шаблон компонента
  toHTML() {
    return "";
  }

  // Фасад паттерн
  // Уведомляем слушателей про событие
  $emit(eventName, ...args) {
    this.emitter.emit(eventName, ...args);
  }

  // Подписываемся на событие
  $on(eventName, func) {
    const unsub = this.emitter.subscribe(eventName, func);
    this.unsubs.push(unsub);
  }

  // Инициализируем компонент
  // Добавляем DOM слушателей
  init() {
    this.initDOMListeners();
  }

  // Удаляем компонент
  // Чистим слушателей и подписки на события
  destroy() {
    this.removeDOMListeners();
    this.unsubs.forEach((unsub) => unsub());
  }
}
