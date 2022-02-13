import React, { useState } from "react";
import "./styles.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

export default function App() {
  const [location, setLocation] = useState("");
  const [data, setData] = useState({});
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units={imperial}&appid=b210d5c42773b1dd9da7c28610e397f8`;

  const search = async (e) => {
    if (e.key === "Enter") {
      await axios.get(URL).then((response) => {
        setData(response.data);
        console.log(data);
      });
      setLocation("");
    }
  };
  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  var date = new Date(),
    today = date.getDate(),
    mon = date.getMonth() + 1,
    year = date.getFullYear(),
    day = days[date.getDay()];

  return (
    <div className="container">
      <h1>Know the weather</h1>
      <div className="row justify-content-center">
        <div className="col-md-4">
          <input
            type="text"
            value={location}
            placeholder="Enter Location"
            onChange={(e) => setLocation(e.target.value)}
            onKeyPress={search}
          />
          <p>
            {day} - {today}/{mon}/{year}
          </p>

          <p className="multicolortext">
            Location <i class="fas fa-map-marker-alt"></i>
            <span>
              <h1>{data.name}</h1>
            </span>
          </p>
          <p className="multicolortext">
            Temperatre <i className="fa fa-thermometer-empty"></i>
            {data.main ? (
              <h1>{(data.main.temp - 273.15).toFixed(2)}&deg;C</h1>
            ) : null}
            <span>
              {data.main ? (
                <h1>
                  {(data.main.temp_max - 273.15).toFixed(2)}&deg;C |
                  {(data.main.temp_min - 273.15).toFixed(2)}&deg;C
                </h1>
              ) : null}
            </span>
          </p>
          <p className="multicolortext">
            Climate <i class="fa fa-cloud"></i>
            <span>{data.weather ? <h1>{data.weather[0].main}</h1> : null}</span>
          </p>
          <p className="multicolortext">
            Humidity <i class="fas fa-tint"></i>
            <span>{data.main ? <h1>{data.main.humidity}</h1> : null}</span>
          </p>
          <p className="multicolortext">
            Feels Like <i class="fas fa-sun"></i>
            <span>
              {" "}
              {data.main ? <h1>{data.main.feels_like}&deg;F</h1> : null}
            </span>
          </p>
          <p className="multicolortext">
            Wind Speed <i class="fas fa-wind"></i>
            <span> {data.main ? <h1>{data.wind.speed}MPH</h1> : null}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
