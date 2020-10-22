class DayCard {
  constructor() {
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
  getDay() {
    return this.day;
  }
  getImageSrc() {
    return this.imagSrc;
  }
  getTemperature() {
    return this.temp;
  }
  gethourserature() {
    return this.hours;
  }
  getFeels() {
    return this.feels;
  }
  getHumidity() {
    return this.humidity;
  }
  getWindSpeed() {
    return this.windSpeed;
  }
  getStatus() {
    return this.status;
  }
  gethour() {
    return this.currenthour;
  }
  /**Setters */
  setDay(day) {
    this.day = day;
  }
  setImageSrc(imgSrc) {
    this.imagSrc = imgSrc;
  }
  setTemperature(temp) {
    this.temp = temp;
  }
  sethourserature(arr) {
    this.hours = arr;
  }
  setFeels(feels) {
    this.feels = feels;
  }
  setHumidity(humidity) {
    this.humidity = humidity;
  }
  setWindSpeed(windSpeed) {
    this.windSpeed = windSpeed;
  }
  setStatus(status) {
    this.status = status;
  }
  sethour(hour) {
    this.hour = currenthour;
  }
}

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
    `https://api.weatherapi.com/v1/forecast.json?key=e042ad289f3947858b4114057202010&q=${cityName}&days=5`,
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
      changeSky();
    })
    .catch((err) => {
      console.log(err);
    });
}

function eachDayForcastAPI(day, index) {
  dayCards[index].setDay(new Date(day.date_epoch * 1000));
  dayCards[index].setTemperature(Math.round(day.day.avgtemp_c));
  dayCards[index].setImageSrc(`http:${day.day.condition.icon}`);
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

searchForm.addEventListener("click", (event) => {
  fetchWeatherData(searchValue.value);
});

daylinks.forEach((daylink) =>
  daylink.addEventListener("click", (event) => {
    event.preventDefault();
    let index = event.target.id.split("day")[1] - 1;
    currentSelection = index;
    dayClicked(index);
    changeSky();
    $rangeInput.value = 1;
  })
);

// ***************************


function secondapi(cityName) {
  fetch(
    `https://api.unsplash.com/search/photos/?client_id=Ix_JPaBdDffoVCKd5Dd4YuorLvJNxn3yUg2sS6GQrz8&query=${cityName}`
  )
    .then((response) => {
      if (!response.ok) throw new Error(response.status);
      return response.json();
    })
    .then((info) => {
      // citypic.src = info.results[0].urls.regular;
      // citypic.alt = "";
      let arr = [];

      for (let i = 0; i < info.results.length; i++) {
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
      setTimeout(() => {
        
        Array.from(order).sort((b, a) => a.height - b.height).forEach((el,i) =>el.style.order = i)
      }, 50);
    })
    .catch((err) => {
      console.error(err);
    });
}

function changeSky() {
  if (allData.current.is_day) {
    sky.style.background = `var(--day-sky)`;
  } else {
    sky.style.background = `var(--night-sky)`;
  }
}

fetchWeatherData("Tokyo");

