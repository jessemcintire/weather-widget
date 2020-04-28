import React from "react";
import { Typography } from "@material-ui/core";
import moment from "moment-timezone";

import styles from "./table.module.scss";

const Table = (props) => {
  return (
    <div className={styles.Table}>
      <div className={styles.TableHeader}>
        <Typography variant="h5">HOUR</Typography>

        <Typography variant="h5">
          {props.activeToggleValue === "temperature" ? "\u00b0F" : "% / in/hr"}
        </Typography>
      </div>

      <ol className={styles.TimeValueList}>
        {props.weather.map((hour) => (
          <li key={hour.time}>
            <Typography variant="h4">
              {moment(hour.time * 1000)
                .tz(props.timezone)
                .format("ha z")}
            </Typography>

            <Typography variant="h5">
              {props.activeToggleValue === "temperature"
                ? `${hour.temperature.toFixed(1)} \u00b0F`
                : `${(hour.precipProbability * 100).toFixed(1)} / ${(
                    hour.precipIntensity * 0.0393701
                  ).toFixed(3)}`}
            </Typography>

            <div
              className={styles.TimeValueListItemBackground}
              style={{
                width:
                  props.activeToggleValue === "temperature"
                    ? `${hour.temperature}%`
                    : "100%",
              }}
            />
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Table;
