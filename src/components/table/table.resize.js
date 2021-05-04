import { $ } from "@core/dom";

export function resizeHandler($root, event) {
  return new Promise((resolve) => {
    const $resizer = $(event.target);
    const resizerDataset = event.target.dataset.resize;
    const $parent = $resizer.closest('[data-type="resizable"]');
    const coords = $parent.getCoords();
    const sideProp = resizerDataset === "col" ? "bottom" : "right";
    let value;

    $resizer.css({
      opacity: 1,
      [sideProp]: "-5000px",
    });

    document.onmousemove = (e) => {
      if (resizerDataset === "col") {
        const delta = e.pageX - coords.right;
        value = coords.width + delta;
        $resizer.css({
          right: -delta + "px",
        });
      } else {
        const delta = e.pageY - coords.bottom;
        value = coords.height + delta;
        $resizer.css({
          bottom: -delta + "px",
        });
      }
    };

    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;

      if (resizerDataset === "col") {
        $parent.css({ width: value + "px" });
        $root
          .findAll(`[data-col="${$parent.data.col}"]`)
          .forEach((el) => (el.style.width = value + "px"));
      } else {
        $parent.css({ height: value + "px" });
      }

      resolve({
        value,
        // id: resizerDataset === "col" ? $parent.data.col : $parent.data.row,
        type: resizerDataset,
        id: $parent.data[resizerDataset],
      });

      $resizer.css({
        opacity: 0,
        bottom: 0,
        right: 0,
      });
    };
  });
}
