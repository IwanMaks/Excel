// Observer pattern
export class Emitter {
  constructor() {
    this.listeners = {};
  }

  // dispatch, fire, trigger
  // Уведомляем слушателей если они есть
  emit(eventName, ...args) {
    if (!Array.isArray(this.listeners[eventName])) {
      return false;
    }
    this.listeners[eventName].forEach((listener) => {
      listener(...args);
    });
    return true;
  }

  // on, listen
  // Подписываемся на уведомления
  // Добавляем нового слушателя
  subscribe(eventName, func) {
    this.listeners[eventName] = this.listeners[eventName] || [];
    this.listeners[eventName].push(func);
    return () => {
      this.listeners[eventName] = this.listeners[eventName].filter(
        (listener) => listener !== func
      );
    };
  }
}

// Example
// const emitter = new Emitter();
//
// const unsub = emitter.subscribe("iwan", (data) => {
//   console.log("sub:", data);
// });
//
// emitter.emit("iwan", 42);
//
// setTimeout(() => {
//   emitter.emit("iwan", 44);
// }, 2000);
//
// setTimeout(() => {
//   unsub();
// }, 3000);
//
// setTimeout(() => {
//   emitter.emit("iwan", 46);
// }, 4000);
