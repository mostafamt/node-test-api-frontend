import React from "react";
import { CHOICES } from "../config/index";
import styles from "../styles/Question.module.css";
import Button from "./Button";
import Grid from "@mui/material/Grid";

function Question({
  question,
  updateCorrectAnswers,
  checkAnswer,
  selectedButton,
  setSelectedButton,
  disableSubmit,
  answerSubmitted,
}) {
  const [result, setResult] = React.useState();

  const trim = (answer) => {
    const arr = answer.split(" ");
    return arr[1].toLowerCase();
  };

  const clickHandler = (e) => {
    if (answerSubmitted) return;
    disableSubmit();
    const text = e.target.innerText;
    const ans = trim(text);
    setSelectedButton(text);
    const correctAnswer = checkAnswer(ans);
    setResult(correctAnswer);
    if (correctAnswer) {
      updateCorrectAnswers();
    }
  };

  const checkButton = (choice) => {
    return selectedButton === choice;
  };

  return (
    <div>
      <p className={styles.word}>{question.word}...</p>
      <Grid container spacing={2} className={styles.list}>
        {CHOICES.map((choice, idx) => {
          return (
            <Grid item xs={6} key={idx}>
              <Button
                text={choice.type}
                click={clickHandler}
                check={checkButton(choice.type)}
                result={result}
              />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

export default Question;
