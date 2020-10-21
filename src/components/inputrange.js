let sheet = document.createElement("style"),
  $rangeInput = document.querySelector(".range input"),
  prefs = ["webkit-slider-runnable-track", "moz-range-track", "ms-track"];

$rangeInput.addEventListener("input", function (e) {
  // console.log(e.target.value);
});

// Change input value on label click
document.querySelector(".range-labels").addEventListener("click", (e) => {
  let index;
  if (e.target.nodeName == "SPAN") {
    console.log(e.target.dataset.value);
  }

  if (e.target.dataset) {
    index = e.target.dataset.value;
    $rangeInput.value = index;
  }
});
