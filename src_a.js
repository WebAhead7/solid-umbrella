
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
                eachDayForcastAPI(day, index);
            })
            eachDayForcastHTML(jsn);
            updateDayCards();
            secondapi();
        })
        .catch(err => {
            console.log(err);
        });

}

function eachDayForcastAPI(day, index) {
    dayCards[index].setDay(new Date(day.date_epoch * 1000));
    dayCards[index].setTemperature(Math.round(day.day.avgtemp_c));
    dayCards[index].setImageSrc(`http:${day.day.condition.icon}`);
    dayCards[index].setHoursTemperature(day.hour.map(h => h.temp_c));
}
function eachDayForcastHTML(jsn) {
    city.innerText = jsn.location.name;
    dateStr.innerText = dayCards[0].getDay().toDateString();
    weatherStatus.innerText = jsn.current.condition.text;
    todayImage.src = dayCards[0].getImageSrc();
    todayTemp.innerText = dayCards[0].getTemperature();
}


// fetchWeatherData("London");
var globalname = "";
searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    globalname = event.target.elements.cityname.value;
    fetchWeatherData(event.target.elements.cityname.value);

})
// ***************************
const cityname = document.getElementById('location2');
const cityalter = document.getElementById('alternms');
const citypic = document.getElementById('picfetch');

const pics = [0,0,0,0].map((_,index)=> document.getElementById(`img${index+1}`));
console.log(pics);
function secondapi() {
    fetch(`https://api.unsplash.com/search/photos/?client_id=Ix_JPaBdDffoVCKd5Dd4YuorLvJNxn3yUg2sS6GQrz8&query=${globalname}`)
        .then(response => {
            if (!response.ok) throw new Error(response.status);
            return response.json();
        })
        .then(info => {
            console.log(info.results.length);

            citypic.src = info.results[0].urls.regular;
            citypic.alt = "";
            let arr = [];

            for (let i = 1; i < info.results.length; i++) {
                arr.push(i);
            }

            console.log(arr);
            console.log(arr.splice(2, 1));
            console.log(arr);

            function createShuffledArray(level) {
                return Array.from({ length: level }, (_, index) => index + 1).sort((a, b) => {
                    return Math.random() - 0.5;
                });
            }

            const test = createShuffledArray(info.results.length-1);
            console.log(test);

            for (let i = 0; i < 4; i++) {
                console.log(`pic${i + 1}`, test[i]);
                let x=test[i];
                pics[i].src = info.results[x].urls.small;
                pics[i].alt = "";
            }

        })
        .catch(err => {
            console.error(err);
        });
}

// function secondapi(){
//     fetch(`https://rapidapi.p.rapidapi.com/cities/search/${globalname}`, {
//         "method": "GET",
//         "headers": {
//             "x-rapidapi-host": "geohub3.p.rapidapi.com",
//             "x-rapidapi-key": "cc8d27a48fmsh2ce2496a5d9cff9p1dc8c3jsn19e314aa0ae3"
//         }
//     })
//         .then(response => {
//             if (!response.ok) throw new Error(response.status);
//             return response.json();
//         })
//         .then(info => {
//             cityalter.innerText = "";
//             // console.log(info.data.cities.alternateNames);
//             // console.log(globalname);
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




