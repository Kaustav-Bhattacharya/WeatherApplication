import React, { useState, useEffect } from "react";
import "./App.css";
import WeatherCard from "./Components/WeatherCard";
import AddWeather from "./Components/AddWeather";
import Welcome from "./Components/Welcome";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import WeatherIcons from "./Components/WeatherIcons";
import NotFound from "./Components/NotFound";

function App() {
  const [data, setData] = useState([]);
  const [searching, setSearching] = useState("");
  const [fetched, setFetched] = useState(true);

  const params = {
    access_key: "12413d12510d42113973019d39df135c",
    query: searching,
  };

  useEffect(() => {
    const fetching = async () => {
      try {
        let response = await axios.get("http://api.weatherstack.com/current", {
          params,
        });
        if (response.data.success === false) setFetched(false);
        else {
          let newArr = [...data, response];
          setFetched(true);
          setData(newArr);
        }
      } catch (error) {
        console.log("error");
      }
    };

    fetching();
  }, [searching]);

  function search(city) {
    setSearching(city);
  }

  function removeCard(lat) {
    let newArr = data.filter((item) => item.data.location.lat !== lat);
    setData(newArr);
  }
  return (
    <>
      {data.length <= 0 ? (
        <>
          <Welcome />
          <AddWeather city={search} />
          <WeatherIcons />
        </>
      ) : !fetched ? (
        <div style={{ marginTop: "10rem" }}>
          <NotFound />
        </div>
      ) : (
        <div>
          <AddWeather city={search} />
          <div className="cards">
            {data.map((item) => (
              <div>
                <WeatherCard
                  key={uuidv4()}
                  data={item.data}
                  deleteCard={removeCard}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
