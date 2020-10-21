range_el.addEventListener(
  "change",
  function () {
    this.setAttribute("value", this.value);
  },
  false
);

range_el.addEventListener(
  "input",
  function () {
    this.setAttribute("value", this.value);
  },
  false
);
