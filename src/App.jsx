import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { WiHumidity, WiStrongWind } from "react-icons/wi";
import { useDispatch, useSelector } from "react-redux";
import { setSearch, fetchWeather } from "./features/weatherSlice";
// import rainyImg from "./assets/rainy.jpeg";
import rainyImg from "./assets/rainnn.gif";
import hazyImg from "./assets/hazz.jpg";
import smokeImg from "./assets/smoke.jpg";
import cloudyImg from "./assets/cloud.gif";
import clearImg from "./assets/clear.jpg";
import InfoCard from "./features/InfoCard";
import { CountryData } from "./features/countryData";
function App() {
  const dispatch = useDispatch();
  const [background, setBackground] = useState("");

  const {
    search,
    loading,
    temp,
    wind,
    humidity,
    city,
    icon,
    pressure,
    visibility,
    coord,
    weather,
    sunrise,
    sunset,
    dt,
    error,
    country,
  } = useSelector((state) => state.weather);

  useEffect(() => {
    if (!weather) {
      setBackground("");
      return;
    }
    const weatherCondition = weather.main.toLowerCase();
    if (weatherCondition.includes("rain")) setBackground(`url(${rainyImg})`);
    else if (weatherCondition.includes("haze"))
      setBackground(`url(${hazyImg})`);
    else if (weatherCondition.includes("smoke"))
      setBackground(`url(${smokeImg})`);
    else if (weatherCondition.includes("cloud"))
      setBackground(`url(${cloudyImg})`);
    else setBackground(`url(${clearImg})`);
  }, [weather]);

  const kelvinToCelsius = (temp) => (temp - 273.15).toFixed(1);
  const formatTime = (unix) => {
    const date = new Date(unix * 1000);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const countryName = CountryData[country];
  return (
    <div
      style={{
        backgroundImage: background || undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "background-image 0.5s ease-in-out",
      }}
      className="text-white flex items-center justify-center h-screen bg-gradient-to-tr from-green-900 via-teal-600 to-violet-700"
    >
      <div className="flex w-full max-w-5xl shadow-xl rounded-lg overflow-hidden">
        <div className="w-full   bg-blue-900/50 p-6 flex flex-col items-center justify-center">
          <div className="flex items-center w-72 bg-white mb-6 px-4 py-2 rounded-full shadow-lg">
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => dispatch(setSearch(e.target.value))}
              onKeyDown={(e) => {
                if (e.key === "Enter") dispatch(fetchWeather(search));
              }}
              className="text-black flex-1 outline-none px-2"
            />
            <FaSearch
              className="text-black cursor-pointer"
              onClick={() => dispatch(fetchWeather(search))}
            />
          </div>
          {error && (
            <h1 className="text-white text-3xl mt-2">City Not Found</h1>
          )}
          <img
            src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
            alt="Weather Icon"
            className="w-24 h-24 mb-2"
          />

          <h1 className="text-4xl font-bold">
            {loading
              ? "Loading..."
              : temp !== null
              ? `${kelvinToCelsius(temp)}°C`
              : "--"}
          </h1>
          <h2 className="text-2xl">
            {error
              ? "-------"
              : city
              ? city
              : "Enter Place name to Check Weather"}
          </h2>
          <h5 className="text-2xl">{error ? "----" : countryName}</h5>

          <div className="flex justify-around w-full mt-4">
            <div className="flex flex-col items-center">
              <WiHumidity className="text-3xl" />
              <span className="text-lg font-medium">
                {humidity !== null ? `${humidity}%` : "--"}
              </span>
              <p className="text-sm">Humidity</p>
            </div>
            <div className="flex flex-col items-center">
              <WiStrongWind className="text-3xl" />
              <span className="text-lg font-medium">
                {wind !== null ? `${wind} m/s` : "--"}
              </span>
              <p className="text-sm">Wind Speed</p>
            </div>
          </div>

          <div className="flex flex-wrap justify-between w-full mt-6 gap-4">
            <InfoCard
              title="Pressure"
              value={pressure ? `${pressure} hPa` : "--"}
            />
            <InfoCard
              title="Visibility"
              value={visibility ? `${(visibility / 1000).toFixed(1)} km` : "--"}
            />
            <InfoCard
              title="Coordinates"
              value={coord ? `Lat: ${coord.lat}\nLon: ${coord.lon}` : "--"}
            />
            <InfoCard
              title="Sunrise"
              value={sunrise ? formatTime(sunrise) : "--"}
            />
            <InfoCard
              title="Sunset"
              value={sunset ? formatTime(sunset) : "--"}
            />
            <InfoCard title="Last Updated" value={dt ? formatTime(dt) : "--"} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
