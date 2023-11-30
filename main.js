const url =
  "https://api.weatherapi.com/v1/current.json?key=3f91ca7c887e457f88b145833233011&q=";
const input = document.querySelector("input");
const button = document.querySelector("#button");
const error = document.querySelector("#error");

const container = document.querySelector(".container");
const element = document.createElement("div");
element.classList.add("element");

const city = document.querySelector(".city");
const desc = document.querySelector(".desc");
const temp = document.querySelector("temp");

const weatherForecast = (e) => {  
  e.preventDefault();
  error.textContent = "";
  error.classList.add("hidden");

  if (input.value === "") {
    error.classList.remove("hidden");
    error.textContent = "City not found... Please check the name of the city";
    return;
  }

  let inputCity = input.value.trim().toLowerCase();
  input.value = "";

  fetch(`${url}${inputCity}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Please enter the city");
      }
      return res.json();
    })
    .then((data) => {
      console.log(data);
      weatherData(data);
    })
    .catch((err) => {
      console.log(err);
      error.classList.remove("hidden");
      error.textContent = err.message;
    });
};

weatherData = ({ location, current }) => {

    if (container.children.length > 0) {
        container.innerHTML = ""
    }

    const iconUrl = `https:${current.condition.icon}`;

    element.innerHTML = `
    <h2>${location.name}</h2>
    <img src="${iconUrl}"/>
    <p>${current.temp_c}℃ / ${current.humidity}%</p>
    <p>${current.condition.text}</p>
`

container.appendChild(element);
};

button.addEventListener("click", weatherForecast);