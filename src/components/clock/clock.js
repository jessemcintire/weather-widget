import React from "react";
import { TextField } from "@material-ui/core";

import styles from "./clock.module.scss";

const Clock = () => {
  return (
    <div className={styles.Clock}>
      <ol className={styles.TimeValueList}>
        <li>1pm</li>
      </ol>
    </div>
  );
};

export default Clock;
