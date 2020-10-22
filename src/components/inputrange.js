let sheet = document.createElement("style"),
  $rangeInput = document.querySelector(".range input"),
  prefs = ["webkit-slider-runnable-track", "moz-range-track", "ms-track"];

$rangeInput.addEventListener("input", function (e) {
  let index = e.target.value;
  // $rangeInput.value = index;
  if(index!==undefined){
    // console.log("test2 " + index);
    hourclicked((index-1)*2);
    dateStr.innerText = dateStr.innerText.split(" ")[0] + " " +((index-1)*2 < 10 ? "0"+(index-1)*2 : (index-1)*2)  +":00";
  }
});

// Change input value on label click
document.querySelector(".range-labels").addEventListener("click", (e) => {
  let index;
  // if (e.target.nodeName == "SPAN") {
  //   console.log("test1 " + e.target.dataset.value);
  // }
  // if (e.target.dataset) {
    index = e.target.dataset.value;
    $rangeInput.value = index;
    if(index!==undefined){
      console.log("test2 " + index);
      hourclicked((index-1)*2);
      dateStr.innerText = dateStr.innerText.split(" ")[0] + " " + e.target.innerText;
      
    }
  // }
});
