import React, { useEffect, useState } from "react";
import { Button, CircularProgress, TextField } from "@material-ui/core";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import axios from "axios";
import moment from "moment-timezone";

import styles from "./card.module.scss";

import RainIcon from "../../icons/rain";
import TemperatureIcon from "../../icons/temperature";
import Table from "../table/table";

const Card = () => {
  const [hourWeather, setHourWeather] = useState([]);
  const [timezone, setTimezone] = useState("America/Los_Angeles");
  const [lat, setLat] = useState(37.8267);
  const [lon, setLon] = useState(-122.4233);
  const [formComplete, setFormComplete] = useState(false);
  const [fethcingWeather, setfethcingWeather] = useState(false);
  const [activeToggleButton, setActiveToggleButton] = useState(1);
  const [activeToggleValue, setactiveToggleValue] = useState("temperature");

  useEffect(() => {
    getForcast(lat, lon);
  }, []);

  function getForcast(lat, lon) {
    setfethcingWeather(true);

    axios(
      `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/32cf9191192c7e52a2ccf85e835453c9/${lat},${lon}?exclude=[currently, minutely, daily, alerts, flags]`
    )
      .then((response) => {
        console.log(response);
        console.log(response.data.timezone);
        response.data.hourly.data.map((hour) =>
          console.log(
            moment(hour.time * 1000)
              .tz(response.data.timezone)
              .format("ha z")
          )
        );

        setHourWeather(response.data.hourly.data);
        setTimezone(response.data.timezone);
        setfethcingWeather(false);
        setFormComplete(false);
      })
      .catch((error) => console.log(error));
  }

  function handleToggle(toggleValue) {
    setactiveToggleValue(toggleValue);
  }

  return (
    <div className={styles.Card}>
      <h1>Tomorrow's Weather</h1>

      <div className={styles.Toolbar}>
        <TextField
          id="outlined-basic"
          label="Lat (Number)"
          required={true}
          size="small"
          type="number"
          variant="outlined"
          value={lat}
          onChange={(e) => {
            setLat(parseFloat(e.target.value));

            if (lat !== null && lon !== null) {
              setFormComplete(true);
            }
          }}
        />

        <TextField
          id="outlined-basic"
          label="Lon (Number)"
          required={true}
          size="small"
          type="number"
          variant="outlined"
          value={lon}
          onChange={(e) => {
            setLon(parseFloat(e.target.value));

            if (lat !== null && lon !== null) {
              setFormComplete(true);
            }
          }}
        />

        <Button
          variant="outlined"
          size="medium"
          disabled={!formComplete}
          onClick={() => getForcast(lat, lon)}
        >
          {fethcingWeather === true ? <CircularProgress /> : "Find"}
        </Button>

        <ToggleButtonGroup
          className={styles.Toggle}
          exclusive
          onChange={(e, value) => handleToggle(value)}
        >
          <ToggleButton
            key={1}
            onClick={() => setActiveToggleButton(1)}
            selected={activeToggleButton === 1}
            value="temperature"
          >
            <TemperatureIcon />
          </ToggleButton>

          <ToggleButton
            key={2}
            onClick={() => setActiveToggleButton(2)}
            selected={activeToggleButton === 2}
            value="rain"
          >
            <RainIcon />
          </ToggleButton>
        </ToggleButtonGroup>

        <Table
          activeToggleValue={activeToggleValue}
          timezone={timezone}
          weather={hourWeather}
        />
      </div>
    </div>
  );
};

export default Card;
