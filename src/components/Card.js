import React, { useState, useEffect } from "react";
import styles from "../styles/Card.module.css";
import { API_URL } from "../config/index";
import Question from "./Question";
import Progress from "./Progress";
import Button from "@mui/material/Button";
import { NUMBER_OF_QUESTIONS } from "../config/index";
import ResultCard from "./ResultCard";

function Card() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [progressValue, setProgressValue] = useState(0);
  const [selectedButton, setSelectedButton] = React.useState("");
  const [rank, setRank] = React.useState(0);
  const [answerSubmitted, setAnswerSubmitted] = React.useState(false);

  const fetchQuestions = async () => {
    const response = await fetch(`${API_URL}/questions`);
    const data = await response.json();
    console.log(data.data);
    setQuestions(data.data);
  };

  const fetchRank = async (rank) => {
    const response = await fetch(`${API_URL}/rank`, {
      method: "POST",
      headers: {
        score: rank,
      },
    });
    const data = await response.json();
    return data.data;
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const checkAnswer = (answer) => {
    return answer === questions[currentQuestion].pos;
  };

  const updateCorrectAnswers = () => {
    setCorrectAnswers(correctAnswers + 1);
  };

  const nextHandler = async () => {
    if (!answerSubmitted) return;
    console.log(answerSubmitted);
    setCurrentQuestion(currentQuestion + 1);
    if (progressValue < 100) {
      setProgressValue(progressValue + 10);
    }
    setSelectedButton("");
    if (currentQuestion >= NUMBER_OF_QUESTIONS - 1) {
      setRank(await fetchRank(correctAnswers * 10));
    }
    setAnswerSubmitted(false);
  };

  const disableSubmit = () => setAnswerSubmitted(true);

  let content = <></>;
  if (currentQuestion >= NUMBER_OF_QUESTIONS) {
    content = <ResultCard rank={rank} />;
  } else if (questions.length > 0) {
    content = (
      <>
        <Question
          question={questions[currentQuestion]}
          updateCorrectAnswers={updateCorrectAnswers}
          checkAnswer={checkAnswer}
          selectedButton={selectedButton}
          setSelectedButton={setSelectedButton}
          disableSubmit={disableSubmit}
          answerSubmitted={answerSubmitted}
        />
        <Button
          variant="contained"
          sx={{ width: "100%", mt: 4 }}
          onClick={nextHandler}
        >
          Next
        </Button>
      </>
    );
  }

  return (
    <div>
      <div className={styles.card}>
        <div className={styles.header}>
          <Progress value={progressValue} />
        </div>
        <div className={styles.content}>{content}</div>
      </div>
    </div>
  );
}

export default Card;
