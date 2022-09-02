import React from "react";
import styles from "../styles/Button.module.css";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

function Button({ text, click, check, result }) {
  return (
    <button onClick={(e) => click(e)} className={styles.button}>
      <span>{text}</span>
      {check && result && (
        <CheckIcon
          className={[styles.icon, styles.check].join(" ")}
          sx={{ fontSize: { xs: ".8rem", sm: "1rem", md: "1.2rem" } }}
        />
      )}
      {check && !result && (
        <ClearIcon
          className={[styles.icon, styles.clear].join(" ")}
          sx={{ fontSize: { xs: ".8rem", sm: "1rem", md: "1.2rem" } }}
        />
      )}
    </button>
  );
}

export default Button;
