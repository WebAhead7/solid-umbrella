let googlePlace;
let googleHotels;
let newPhoto;
function getPlaces(place) {
  const places = fetch(
    `https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+${place}&key=AIzaSyCCMZkHcfHJhNKBhAOzr9PoAqcetEB3W1A
  `
  );
  places
    .then((promise) => {
      if (!promise.ok) throw new Error(promise.status, "ERROR HERE");
      return promise.json();
    })
    .then((json) => {
      googlePlace = json.results;
      //   console.log(json.results[0].opening_hours.open_now);

      addCards(json.results);
    })
    .catch((error) => console.error(error));
}

function getHotels(place) {
  const places = fetch(
    `https://maps.googleapis.com/maps/api/place/textsearch/json?query=hotels+in+${place}&key=AIzaSyCCMZkHcfHJhNKBhAOzr9PoAqcetEB3W1A
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
    let photo = current.photos[0].photo_reference;
    if (index > 4) return;
    let div = document.createElement("div");
    div.classList.add("card");
    div.type = photo;
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
    let photo = current.photos[0].photo_reference;
    if (index > 4) return;
    let div = document.createElement("div");
    div.classList.add("card");
    div.type = photo;

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

let photos = [];

function getPlaceImage(imgRef) {
  food.childNodes.forEach((cur) => {
    let key = cur.type;
    getImg(key);
  });

  food.childNodes.forEach((cur) => {
    // let imgSrc = cur.childNodes[3].childNodes[1];

    photos.forEach((pic) => {
      console.log(pic);
      cur.childNodes[3].childNodes[1].src = pic;
    });
  });
}
{
  /* <i class="fas fa-star"><h3>${
      current.rating
    }</h3></i> */
}

async function getImg(key) {
  const img = await fetch(
    `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${key}&key=AIzaSyCCMZkHcfHJhNKBhAOzr9PoAqcetEB3W1A`
  );

  photos.push(img.url);
  return photos;
}
