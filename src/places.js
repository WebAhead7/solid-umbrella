function getPlaces(place) {
  fetch(
    `https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+${place}&key=AIzaSyCCMZkHcfHJhNKBhAOzr9PoAqcetEB3W1A
  `
  )
    .then((promise) => {
      if (!promise.ok) throw new Error(promise.status, "ERROR HERE");
      return promise.json();
    })
    .then((json) => {
      googlePlace = json.results;
    })
    .catch((error) => console.error(error));
}
