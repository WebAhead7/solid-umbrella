function getPlaces(place) {
  const places = fetch(
    `${proxyurl}https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+${place}&key=AIzaSyCCMZkHcfHJhNKBhAOzr9PoAqcetEB3W1A`
  );
  places
    .then((promise) => {
      if (!promise.ok) throw new Error(promise.status, "ERROR HERE");
      return promise.json();
    })
    .then((json) => {
      googlePlace = json.results;

      addCards(json.results);
    })

    .catch((error) => console.error(error));
}

function getHotels(place) {
  const places = fetch(
    `${proxyurl}https://maps.googleapis.com/maps/api/place/textsearch/json?query=hotels+in+${place}&key=AIzaSyCCMZkHcfHJhNKBhAOzr9PoAqcetEB3W1A
  `
  );
  places
    .then((promise) => {
      if (!promise.ok) throw new Error(promise.status, "ERROR HERE");
      return promise.json();
    })
    .then((json) => {
      googleHotels = json.results;
      addHotels(json.results);
    })
    .catch((error) => console.error(error));
}

function addCards(data) {
  food.innerHTML = "";
  let cards = data.forEach((current, index) => {
    if (index > 9) return;
    let div = document.createElement("div");
    div.classList.add("card");
    let open;

    if (!current.opening_hours) {
      open = false;
    } else {
      open = current.opening_hours.open_now;
    }

    let newDiv = `
    <h3 class="header">${current.name}</h3>
    <div class="body">
    <img class="rest-img" src="${current.icon}" />
    <div class="flexCenter"><i class="fas fa-star"><span>${
      current.rating
    }</span></i>
    </div>
    <h2>${open ? "Open now" : "Closed"}</h2>
    </div>`;

    div.innerHTML = newDiv;
    food.appendChild(div);
  });
}

function addHotels(data) {
  hotels.innerHTML = "";
  let cards = data.forEach((current, index) => {
    if (index > 4) return;
    let div = document.createElement("div");
    div.classList.add("card");

    let newDiv = `
    <h3 class="header">${current.name}</h3>
    <div class="body">
    <img class="rest-img" src="${current.icon}" />
    <div class="flexCenter"><i class="fas fa-star"><span>${current.rating}</span></i>
    </div>
    <h4>Total rating: ${current.user_ratings_total}</h4>
    </div>`;

    div.innerHTML = newDiv;
    hotels.appendChild(div);
  });
}
