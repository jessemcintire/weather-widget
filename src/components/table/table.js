import React from "react";
import { TextField } from "@material-ui/core";
import moment from "moment-timezone";

import styles from "./table.module.scss";

const Table = (props) => {
  return (
    <div className={styles.Clock}>
      <ol className={styles.TimeValueList}>
        {props.weather.map((hour) => (
          <li key={hour.time}>
            <h1>
              {moment(hour.time * 1000)
                .tz(props.timezone)
                .format("ha z")}
            </h1>

            <h2>
              {props.activeToggleValue === "temperature"
                ? `${(hour.temperature * 1.8 + 32).toFixed(2)} \u00b0F`
                : `${(hour.precipProbability * 100).toFixed(2)}% | ${(
                    hour.precipIntensity * 0.0393701
                  ).toFixed(3)} in/hr`}
            </h2>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Table;
