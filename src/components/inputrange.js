let sheet = document.createElement("style"),
  $rangeInput = document.querySelector(".range input"),
  prefs = ["webkit-slider-runnable-track", "moz-range-track", "ms-track"];

$rangeInput.addEventListener("input", function (e) {
  let index = e.target.value;
  if (index !== undefined) {
    hourclicked((index - 1) * 2);
    dateStr.innerText =
      dateStr.innerText.split(" ")[0] +
      " " +
      ((index - 1) * 2 < 10 ? "0" + (index - 1) * 2 : (index - 1) * 2) +
      ":00";
    changeSkyInput(index);
  }
});

// Change input value on label click
document.querySelector(".range-labels").addEventListener("click", (e) => {
  let index;

  index = e.target.dataset.value;
  $rangeInput.value = index;
  if (index !== undefined) {
    console.log("test2 " + index);
    hourclicked((index - 1) * 2);
    dateStr.innerText =
      dateStr.innerText.split(" ")[0] + " " + e.target.innerText;
    changeSkyInput(index);
  }
  // }
});

function changeSkyInput(time) {
  if ((time >= 1 && time <= 4) || (time >= 10 && time <= 12)) {
    sky.style.background = `var(--night-sky)`;
  } else {
    sky.style.background = `var(--day-sky)`;
  }
}
