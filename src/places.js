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

function getPlaceImage(imgRef) {
  const imgs = fetch(
    `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${imgRef}&key=AIzaSyCCMZkHcfHJhNKBhAOzr9PoAqcetEB3W1A`
  );

  imgs
    .then((promise) => {
      console.log(promise.url);
    })
    .catch((err) => console.error(err));
}

function addCards(data) {
  let cards = data.map((current) => {
    console.log(current.name, current.rating);
    // `
    //       <div class="card">
    //       <div class="header">${current.name}</div>
    //       <div class="body">
    //       <div class="first-section">
    //       <div class="rating"><i class="fas fa-star"><h3>${
    //         current.rating
    //       }</h3></i><div>
    //       <div class="icon">${current.icon}</div>
    //       </div>
    //       </div>
    //       <div class="open">${"Open now"}</div>
    //       </div>
    //       `;
  });

  console.log(cards);
}
