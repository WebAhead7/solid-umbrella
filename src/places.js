function getPlaces(place) {
  fetch(
    `https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+${place}&key=AIzaSyCCMZkHcfHJhNKBhAOzr9PoAqcetEB3W1A
`,
    { mode: "no-cors" }
  )
    .then((promise) => promise.json())
    .then((json) => {
      console.log(json);
      return json;
    })
    .catch((error) => console.error(error));
}
