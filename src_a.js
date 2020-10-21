let allData;
function DayCard() {
  this.day;
  this.imagSrc;
  this.temp;
  this.hoursTemp;
  this.feels;
  this.humidity;
  this.windSpeed;
  this.status;
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
DayCard.prototype.getHoursTemperature = function () {
 return this.hoursTemp;
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
/**Setters */
DayCard.prototype.setDay= function (day) {
  this.day = day;
};
DayCard.prototype.setImageSrc = function (imgSrc) {
  this.imagSrc = imgSrc;
};
DayCard.prototype.setTemperature = function (temp) {
  this.temp = temp;
};
DayCard.prototype.setHoursTemperature = function (arr) {
  this.hoursTemp = arr;
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
const feels = document.getElementById('feels');
const speed = document.getElementById('speed');
const humidity = document.getElementById('humidity');
const daylinks = document.querySelectorAll('.day-link');

function updateDayCards() {
  dayCards.forEach((day, index) => {
    let dayCardElements = document.getElementById(`day${index + 1}`).children;
    dayCardElements[0].innerText = day.getDay().toString().split(" ")[0];
    dayCardElements[1].src = day.getImageSrc();
    dayCardElements[2].firstChild.innerText = day.getTemperature();
  });

  // daysHolder.forEach((card, index) => {
  //   // card.value = index + 1;
  //   console.log(card);
  // });
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
      // console.log(response);
     return response.json();
    })
    .then((jsn) => {
      allData = jsn;
      console.log(jsn.forecast.forecastday);
      jsn.forecast.forecastday.forEach((day, index) => {
        eachDayForcastAPI(day, index);
      });
      console.log(dayCards)
      eachDayForcastHTML(jsn);
      updateDayCards();
      secondapi(cityName);
    })
    .catch((err) => {
      console.log(err);
    });
}

function eachDayForcastAPI(day, index) {
  dayCards[index].setDay(new Date(day.date_epoch * 1000));
  dayCards[index].setTemperature(Math.round(day.day.avgtemp_c));
  dayCards[index].setImageSrc(`http:${day.day.condition.icon}`);
  dayCards[index].setHoursTemperature(day.hour.map((h) => h.temp_c));
  dayCards[index].setHumidity(day.day.avghumidity);
  dayCards[index].setFeels(Math.round(day.hour.map(h => h.feelslike_c).reduce((a,b)=> a+b)/24));
  dayCards[index].setWindSpeed(Math.round(day.hour.map(h => h.wind_kph).reduce((a,b)=> a+b)/24));
  dayCards[index].setStatus(day.day.condition.text)
}
function eachDayForcastHTML(jsn) {
  city.innerText = jsn.location.name;
  dayClicked(0);
  
}

function dayClicked(index){
  weatherStatus.innerText = dayCards[index].getStatus();
  let date = dayCards[index].getDay();
  dateStr.innerText = date.toDateString();
  todayImage.src = dayCards[index].getImageSrc();
  todayTemp.innerText = dayCards[index].getTemperature();
  feels.innerText = dayCards[index].getFeels();
  speed.innerText = dayCards[index].getWindSpeed();
  humidity.innerText = dayCards[index].getHumidity();
}

// fetchWeatherData("London");
searchForm.addEventListener("click", (event) => {
  fetchWeatherData(searchValue.value);
});

daylinks.forEach(daylink => daylink.addEventListener('click',
(event)=>{
  event.preventDefault();
  let index = event.target.id.split('day')[1]-1;
  dayClicked(index);
  console.log(event.target.id.split('day')[1]);
}))

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
   return  response.json();
    })
    .then((info) => {

      citypic.src = info.results[0].urls.regular;
      citypic.alt = "";
      let arr = [];

      for (let i = 1; i < info.results.length; i++) {
        arr.push(i);
      }

  

      function createShuffledArray(level) {
     return  Array.from({ length: level }, (_, index) => index + 1).sort(
          (a, b) => {
         return  Math.random() - 0.5;
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

fetchWeatherData('Tokyo');
// function secondapi(){
//     fetch(`https://rapidapi.p.rapidapi.com/cities/search/${searchValue.value}`, {
//         "method": "GET",
//         "headers": {
//             "x-rapidapi-host": "geohub3.p.rapidapi.com",
//             "x-rapidapi-key": "cc8d27a48fmsh2ce2496a5d9cff9p1dc8c3jsn19e314aa0ae3"
//         }
//     })
//         .then(response => {
//             if (!response.ok) throw new Error(response.status);
//             response.json();
//         })
//         .then(info => {
//             cityalter.innerText = "";
//             // console.log(info.data.cities.alternateNames);
//             // console.log(searchValue.value);
//             // console.log(info);
//             // console.log(info.data.cities);
//             info.data.cities.forEach((data) => {
//                 console.log(data.alternateNames);
//                 cityalter.innerText += data.alternateNames + "<br>";
//             })
//         })
//         .catch(err => {
//             console.error(err);
//         });
// }

// ***************************
