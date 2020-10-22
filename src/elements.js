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

const range_el = document.querySelector("input");
const sky = document.querySelector("#sky");
const food = document.querySelector(".inner-section-4");
const foodPictures = document.querySelectorAll("img.rest-img");
const hotels = document.querySelector(".inner-section-5");
const proxyurl = "https://cors-anywhere.herokuapp.com/";
let photos = [];

let googlePlace;
let googleHotels;
let newPhoto;
var order = document.querySelector('.inner-section-3').children
