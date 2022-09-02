import React from "react";
import styles from "../styles/Body.module.css";
import Card from "./Card";

function Body() {
  return (
    <div className={styles.body}>
      <Card />
    </div>
  );
}

export default Body;
