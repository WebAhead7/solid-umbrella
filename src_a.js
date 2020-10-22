let allData;
function DayCard() {
  this.day;
  this.imagSrc;
  this.temp;
  this.hours;
  this.feels;
  this.humidity;
  this.windSpeed;
  this.status;
  this.currenthour;
}

/**
 * getters
 */
DayCard.prototype.getDay = function () {
  return this.day;
};
DayCard.prototype.getImageSrc = function () {
  return this.imagSrc;
};
DayCard.prototype.getTemperature = function () {
  return this.temp;
};
DayCard.prototype.gethourserature = function () {
  return this.hours;
};
DayCard.prototype.getFeels = function () {
  return this.feels;
};
DayCard.prototype.getHumidity = function () {
  return this.humidity;
};
DayCard.prototype.getWindSpeed = function () {
  return this.windSpeed;
};
DayCard.prototype.getStatus = function () {
  return this.status;
};
DayCard.prototype.gethour = function () {
  return this.currenthour;
};

/**Setters */
DayCard.prototype.setDay = function (day) {
  this.day = day;
};
DayCard.prototype.setImageSrc = function (imgSrc) {
  this.imagSrc = imgSrc;
};
DayCard.prototype.setTemperature = function (temp) {
  this.temp = temp;
};
DayCard.prototype.sethourserature = function (arr) {
  this.hours = arr;
};
DayCard.prototype.setFeels = function (feels) {
  this.feels = feels;
};
DayCard.prototype.setHumidity = function (humidity) {
  this.humidity = humidity;
};
DayCard.prototype.setWindSpeed = function (windSpeed) {
  this.windSpeed = windSpeed;
};
DayCard.prototype.setStatus = function (status) {
  this.status = status;
};
DayCard.prototype.sethour = function (hour) {
  this.hour = currenthour;
};
/**
 * in this application we have 5 cards
 */
const dayCards = [
  new DayCard(),
  new DayCard(),
  new DayCard(),
  new DayCard(),
  new DayCard(),
];

const city = document.getElementById("location");
const dateStr = document.getElementById("dayTime");
const weatherStatus = document.getElementById("status");
const searchForm = document.getElementById("searchForm");
const searchValue = document.querySelector("#searchValue");
const todayImage = document.getElementById("todayImage");
const todayTemp = document.getElementById("todaytemp");
const daysHolder = document.querySelector("#days_holder");
const feels = document.getElementById("feels");
const speed = document.getElementById("speed");
const humidity = document.getElementById("humidity");
const daylinks = document.querySelectorAll(".day-link");
var currenttimer = 0;
var currentSelection = 0;
const dayHours = document.getElementById("hookah");

function updateDayCards() {
  dayCards.forEach((day, index) => {
    let dayCardElements = document.getElementById(`day${index + 1}`).children;
    dayCardElements[0].innerText = day.getDay().toString().split(" ")[0];
    dayCardElements[1].src = day.getImageSrc();
    dayCardElements[2].firstChild.innerText = day.getTemperature();
  });
}
function fetchWeatherData(cityName) {
  if (cityName == "" || null) return;
  fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=e042ad289f3947858b4114057202010&q=${cityName}&days=5`,
    {
      method: "GET",
      headers: {},
    }
  )
    .then((response) => {
      if (!response.ok) throw new Error(response.status);
      return response.json();
    })
    .then((jsn) => {
      allData = jsn;
      jsn.forecast.forecastday.forEach((day, index) => {
        eachDayForcastAPI(day, index);
      });
      currenttimer = jsn.location.localtime.split(" ")[1].split(":")[0];
      currenttimer =
        currenttimer.length == 1 ? +"0" + currenttimer : currenttimer;

      eachDayForcastHTML(jsn);
      updateDayCards();
      secondapi(cityName);
      getPlaces(cityName);
      getHotels(cityName);
    })
    .catch((err) => {
      console.log(err);
    });
}

// ICON:  forecast.forecastday[0].hour[0].condition.icon
// TEXT - STATUS: forecast.forecastday[0].hour[0].condition.text
// feels like: forecast.forecastday[0].hour[0].feelslike_c
// humidity: forecast.forecastday[0].hour[0].humidity
// TempC: forecast.forecastday[0].hour[0].temp_c
// windspeed: forecast.forecastday[0].hour[0].wind_kph

function eachDayForcastAPI(day, index) {
  dayCards[index].setDay(new Date(day.date_epoch * 1000));
  dayCards[index].setTemperature(Math.round(day.day.avgtemp_c));
  dayCards[index].setImageSrc(`http:${day.day.condition.icon}`);
  // dayCards[index].sethourserature(day.hour.map((h) => h.temp_c));
  dayCards[index].sethourserature(
    day.hour.map((h) => {
      return {
        status: h.condition.text,
        icon: `http:${h.condition.icon}`,
        temp: h.temp_c,
        humidity: h.humidity,
        windSpeed: h.wind_kph,
        feels: h.feelslike_c,
      };
    })
  );
  dayCards[index].setHumidity(day.day.avghumidity);
  dayCards[index].setFeels(
    Math.round(day.hour.map((h) => h.feelslike_c).reduce((a, b) => a + b) / 24)
  );
  dayCards[index].setWindSpeed(
    Math.round(day.hour.map((h) => h.wind_kph).reduce((a, b) => a + b) / 24)
  );
  dayCards[index].setStatus(day.day.condition.text);
}

function eachDayForcastHTML(jsn) {
  city.innerText = jsn.location.name;
  dayClicked(0);
}

function dayClicked(index) {
  weatherStatus.innerText = dayCards[index].getStatus();
  let date = dayCards[index].getDay();
  dateStr.innerText =
    date.toDateString().split(" ")[0] + " " + currenttimer + ":00";
  // console.log(date.toDateString().split(" ")[0]);
  todayImage.src = dayCards[index].getImageSrc();
  todayTemp.innerText = dayCards[index].getTemperature();
  feels.innerText = dayCards[index].getFeels();
  speed.innerText = dayCards[index].getWindSpeed();
  humidity.innerText = dayCards[index].getHumidity();
}

function hourclicked(hour) {
  weatherStatus.innerText = dayCards[currentSelection].gethourserature()[
    hour
  ].status;
  todayImage.src = dayCards[currentSelection].gethourserature()[hour].icon;
  todayTemp.innerText = dayCards[currentSelection].gethourserature()[hour].temp;
  feels.innerText = dayCards[currentSelection].gethourserature()[hour].feels;
  speed.innerText = dayCards[currentSelection].gethourserature()[
    hour
  ].windSpeed;
  humidity.innerText = dayCards[currentSelection].gethourserature()[
    hour
  ].humidity;
}
// fetchWeatherData("London");
searchForm.addEventListener("click", (event) => {
  fetchWeatherData(searchValue.value);
});

daylinks.forEach((daylink) =>
  daylink.addEventListener("click", (event) => {
    event.preventDefault();
    let index = event.target.id.split("day")[1] - 1;
    currentSelection = index;
    dayClicked(index);
    // console.log(event.target.id.split('day')[1]);
  })
);

// ***************************
const cityname = document.getElementById("location2");
const cityalter = document.getElementById("alternms");
const citypic = document.getElementById("picfetch");

const pics = [0, 0, 0, 0, 0].map((_, index) =>
  document.getElementById(`img${index + 1}`)
);
// console.log(pics);
function secondapi(cityName) {
  fetch(
    `https://api.unsplash.com/search/photos/?client_id=Ix_JPaBdDffoVCKd5Dd4YuorLvJNxn3yUg2sS6GQrz8&query=${cityName}`
  )
    .then((response) => {
      if (!response.ok) throw new Error(response.status);
      return response.json();
    })
    .then((info) => {
      citypic.src = info.results[0].urls.regular;
      citypic.alt = "";
      let arr = [];

      for (let i = 1; i < info.results.length; i++) {
        arr.push(i);
      }

      function createShuffledArray(level) {
        return Array.from({ length: level }, (_, index) => index + 1).sort(
          (a, b) => {
            return Math.random() - 0.5;
          }
        );
      }

      const test = createShuffledArray(info.results.length - 1);

      for (let i = 0; i < 5; i++) {
        let x = test[i];

        pics[i].src = info.results[x].urls.small;
        pics[i].alt = "";
      }
    })
    .catch((err) => {
      console.error(err);
    });
}

fetchWeatherData("Tokyo");
