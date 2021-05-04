/**
 * Данный класс создан для возвращения компонентов в HTML формате внутрь div#app
 */
import { $ } from "@core/dom";
import { Emitter } from "@core/Emmiter";
import { StoreSubscriber } from "@core/StoreSubscriber";

export class Excel {
  /**
   * Конструктор создаёт локальные переменные.
   * $el - компонент, в который нужно вернуть HTML
   * components - набор компонентов, которые нужно отрендерить
   * @param {string} selector Селектор родительского элемента, куда возвращается HTML
   * @param {Object} options Набор компонентов, которые необходимо конвертировать в HTML
   */
  constructor(selector, options) {
    this.$el = $(selector);
    this.components = options.components || [];
    this.store = options.store;
    this.emitter = new Emitter();
    this.subscriber = new StoreSubscriber(this.store);
  }

  /**
   * Метод создаёт корневой div, куда складывает все компоненты в HTML формате
   * @see $ - метод, который позволяет создать dom элемент и добавить нужные классы
   * @return {HTMLDivElement} $root сформированный HTML из переданных компонентов
   */
  getRoot() {
    const $root = $.create("div", "excel");

    const componentOptions = {
      emitter: this.emitter,
      store: this.store,
    };

    this.components = this.components.map((Component) => {
      const $el = $.create("div", Component.className);
      const component = new Component($el, componentOptions);
      $el.html(component.toHTML());
      $root.append($el);
      return component;
    });
    return $root;
  }

  /**
   * Основной метод, который добавляет сформированный HTML в элемент,
   * селектор которого был передан в конструктор класса
   */
  render() {
    this.$el.append(this.getRoot());
    this.subscriber.subscribeComponents(this.components);
    this.components.forEach((component) => component.init());
  }

  destroy() {
    this.subscriber.unsubscribeFromStore();
    this.components.forEach((component) => component.destroy());
  }
}
