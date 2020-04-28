import React from "react";

import styles from "./App.module.scss";

import Card from "./components/card/card";

const App = () => {
  return (
    <div className={styles.AppContainer}>
      <Card />
    </div>
  );
};

export default App;
