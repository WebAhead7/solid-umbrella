
function DayCard() {
    this.day;
    this.imagSrc;
    this.temp;
    this.hoursTemp;
}

DayCard.prototype.getDay = function () {
    return this.day;
}
DayCard.prototype.getImageSrc = function () {
    return this.imagSrc;
}
DayCard.prototype.getTemperature = function () {
    return this.temp;
}
DayCard.prototype.getHoursTemperature = function () {
    return this.hoursTemp;
}
DayCard.prototype.setDay = function (day) {
    this.day = day;
}
DayCard.prototype.setImageSrc = function (imgSrc) {
    this.imagSrc = imgSrc;
}
DayCard.prototype.setTemperature = function (temp) {
    this.temp = temp;
}
DayCard.prototype.setHoursTemperature = function (arr) {
    this.hoursTemp = arr;
}

/**
 * in this application we have 5 cards
 */
const dayCards = [new DayCard(), new DayCard(), new DayCard, new DayCard(), new DayCard()],
city = document.getElementById('location'),
dateStr = document.getElementById('dayTime'),
weatherStatus = document.getElementById('status'),
searchForm = document.getElementById('searchForm'),
todayImage = document.getElementById('todayimage'),
todayTemp = document.getElementById('todaytemp')
    ;

function updateDayCards() {
    dayCards.forEach((day, index) => {
        let dayCardElements = document.getElementById(`day${index + 1}`).children;
        dayCardElements[0].innerText = day.getDay().toString().split(' ')[0];
        dayCardElements[1].src = day.getImageSrc();
        dayCardElements[2].firstChild.innerText = day.getTemperature();

    })
}
function fetchWeatherData(cityName) {
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=e042ad289f3947858b4114057202010&q=${cityName}&days=5`, {
        "method": "GET",
        "headers": {}
    })
        .then(response => {
            if (!response.ok) throw new Error(response.status);
            // console.log(response);
            return response.json();
        })
        .then(jsn => {
        
            jsn.forecast.forecastday.forEach((day, index) => {
                dayCards[index].setDay(new Date(day.date_epoch * 1000));
                dayCards[index].setTemperature(Math.round(day.day.avgtemp_c));
                dayCards[index].setImageSrc(`http:${day.day.condition.icon}`);
                dayCards[index].setHoursTemperature(day.hour.map(h => h.temp_c));
            })
            
            city.innerText = jsn.location.name;
            dateStr.innerText = dayCards[0].getDay().toDateString();
            weatherStatus.innerText = jsn.current.condition.text;
            todayImage.src = dayCards[0].getImageSrc();
            todayTemp.innerText = dayCards[0].getTemperature();
            updateDayCards();
        })
        .catch(err => {
            console.log(err);
        });

}

fetchWeatherData("London");

searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    fetchWeatherData(event.target.elements.cityname.value);
})






