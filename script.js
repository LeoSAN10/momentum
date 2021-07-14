const time = document.querySelector('.time'),
  greeting = document.querySelector('.greeting'),
  name = document.querySelector('.name'),
  focus = document.querySelector('.focus'),
  day = document.querySelector('.day');
  const emptyRegExp = /^\s*?$/;
const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
let timeOfDay;
const base = 'assets/images/';
const images = [
  '01.jpg',
  '02.jpg',
  '03.jpg',
  '05.jpg',
  '06.jpg',
  '07.jpg',
  '08.jpg',
  '09.jpg',
  '10.jpg',
  '11.jpg',
  '12.jpg',
  '13.jpg',
  '14.jpg',
  '15.jpg',
  '16.jpg',
  '17.jpg',
  '18.jpg',
  '19.jpg',
  '20.jpg',
];
const imagesTime = [
  'night',
  'morning',
  'day',
  'evening',
  'night',
  'morning',
  'day',
  'evening',
  'night',
  'morning',
  'day',
  'evening',
];
let i = 0;
const quoteText = document.querySelector('.quote');
const newQuoteBtn = document.querySelector('.new-quote');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const weather = document.querySelector('.weather-container');
const city = document.querySelector('.city');
const humidity = document.querySelector('.humidity');
const speed = document.querySelector('.speed');

function showTime() {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds(),
    weekDay = today.getDay(),
    month = today.getMonth(),
    dayNumber = today.getDate();

  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(
    sec
  )}`;
  day.innerHTML = `${days[weekDay]}<span>, </span>${months[month]}<span> </span>${dayNumber}`;

  setTimeout(showTime, 1000);
}

// 0
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// bg

function setBgGreet() {
  let today = new Date(),
    hour = today.getHours();
  if (hour < 6) {
    timeOfDay = 'night';
    greeting.textContent = 'Good Night, ';
  } else if (hour < 12) {
    timeOfDay = 'morning';
    greeting.textContent = 'Good Morning, ';
  } else if (hour < 18) {
    timeOfDay = 'day';
    greeting.textContent = 'Good Afternoon,';
  } else {
    timeOfDay = 'evening';
    greeting.textContent = 'Good Evening,';
  }
}

const getName = () => {
  if (localStorage.getItem("name") === null) {
    name.textContent = "[What is your name?]";
  } else {
    name.textContent = localStorage.getItem("name");
  }
};


  
const setName = (e) => {
  if (e.type === "keypress") {
    if (e.which === 13 || e.keyCode === 13) {
      if (
        e.target.innerText === "" ||
        e.target.innerText === "[What is your name?]" ||
        emptyRegExp.test(e.target.innerText)
      ) {
        getName();
        name.blur();
        return;
      }
      localStorage.setItem("name", e.target.innerText);
      name.blur();
    }
  } else {
    if (
      e.target.innerText === "" ||
      e.target.innerText === "[What is your name?]" ||
      emptyRegExp.test(e.target.innerText)
    ) {
      getName();
      return;
    }
    localStorage.setItem("name", e.target.innerText);
  }
};

const getFocus = () => {
  if (localStorage.getItem("focus") === null) {
    focus.textContent = "[Enter The Focus]";
  } else {
    focus.textContent = localStorage.getItem("focus");
  }
};
const setFocus = (e) => {
  if (e.type === "keypress") {
    if (e.which === 13 || e.keyCode === 13) {
      if (
        e.target.innerText === "" ||
        e.target.innerText === "[What is your name?]" ||
        emptyRegExp.test(e.target.innerText)
      ) {
        getFocus();
        focus.blur();
        return;
      }
      localStorage.setItem("focus", e.target.innerText);
      focus.blur();
    }
  } else {
    if (
      e.target.innerText === "" ||
      e.target.innerText === "[Enter The Focus]" ||
      emptyRegExp.test(e.target.innerText)
    ) {
      getFocus();
      return;
    }
    localStorage.setItem("focus", e.target.innerText);
  }
};

function viewBgImage(data) {
  const body = document.querySelector('body');
  const src = data;
  const img = document.createElement('img');
  img.src = src;
  img.onload = () => {
    body.style.backgroundImage = `url(${src})`;
  };
}

let day2 = new Date(),
  hour = day2.getHours();
if (hour < 6) {
  time2 = 'night';
} else if (hour < 12) {
  time2 = 'morning';
} else if (hour < 18) {
  time2 = 'day';
} else {
  time2 = 'evening';
}
let c = 0;
let initial = imagesTime.indexOf(time2);
newImages = (() => {
  let tempArr = [];

  for (let i = 0; i < 2; i++) {
    const newI = images;

    for (let j = images.length; j >= 0; j--) {
      let randInd = Math.floor(Math.random() * j);
      const randElem = newI.splice(randInd, 1)[0];
      newI.push(randElem);
    }

    tempArr = [...tempArr, ...newI];
  }
  return tempArr;
})();
function getImage() {
  newImages = newImages.slice(0, 24);

  if ((i + 1) % 6 == 0) {
    if (c < 5) {
      initial++;
    } else {
      c = 0;
    }
  }

  const index = i % newImages.length;
  const imageSrc = `${base}${imagesTime[initial]}/${newImages[index]}`;
  viewBgImage(imageSrc);
  i++;
  if (index == 23) {
    i = 0;
    initial = 0;
  }
  btn.disabled = true;
  setTimeout(function () {
    btn.disabled = false;
  }, 1000);
  window.setTimeout(getImage, 60 * 60 * 1000);
}

window.addEventListener('load', getImage);
const btn = document.querySelector('.btn');
btn.addEventListener('click', getImage);

async function getQuote() {
  try {
    const response = await fetch('https://api.adviceslip.com/advice');
    const data = await response.json();
    quoteText.innerText = data.slip.advice;
  } catch (e) {
    getQuote();
  }
}

async function getWeather() {
  
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=en&appid=925963dd47efc95ec43b719b32a361db&units=metric`;
    const res = await fetch(weatherUrl);
    const data = await res.json();

    weatherIcon.className = 'weather-icon owf';

    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp}°C`;
    weatherDescription.textContent = data.weather[0].description;
    humidity.textContent = `Humidity: ${data.main.humidity}`;
    speed.textContent = `Wind: ${data.wind.speed} km/h`;
    if (localStorage.getItem('city') === null) {
      document.querySelector('.icons').style.display = 'none';
      document.querySelector('.weather-description').style.display = 'none';
      document.querySelector('.humidity').style.display = 'none';
      document.querySelector('.speed').style.display = 'none';
      city.textContent = 'ur city?';
    } else {
      city.textContent = localStorage.getItem('city');
      city.blur();
    }
  } 


let backCity = '';







const getCity = () => {
  if (localStorage.getItem("city") === null) {
    city.textContent = "[Enter city]";
  } else {
    city.textContent = localStorage.getItem("city");
  }
};
const setCity = (e) => {
  if (e.type === "keypress") {
    if (e.which === 13 || e.keyCode === 13) {
      if (
        e.target.innerText === "" ||
        e.target.innerText === "[What is your city?]" ||
        emptyRegExp.test(e.target.innerText)
      ) {
        getCity();
        city.blur();
        return;
      }
      localStorage.setItem("city", e.target.innerText);
      city.blur();
    }
  } else {
    if (
      e.target.innerText === "" ||
      e.target.innerText === "[Enter The city]" ||
      emptyRegExp.test(e.target.innerText)
    ) {
      getCity();
      return;
    }
    localStorage.setItem("city", e.target.innerText);
  }
    getWeather(); 
};






const clickField = (e) => {
  e.target.textContent = "";
};

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
name.addEventListener("click", clickField);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);
focus.addEventListener("click", clickField);

newQuoteBtn.addEventListener('click', getQuote);
document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);
city.addEventListener('blur', setCity);
city.addEventListener("click", clickField);

getName();
getFocus();
showTime();
setBgGreet();
getQuote();
