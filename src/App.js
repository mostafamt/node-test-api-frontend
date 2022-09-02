import React from "react";
import Home from "./Pages/Home";
import "./styles/global.css";

function App() {
  const [questions, setQuestions] = React.useState([]);
  const [word, setWord] = React.useState("");

  const fetchData = async () => {
    const res = await fetch("https://nodejs-test-task.herokuapp.com/questions");
    const data = await res.json();
    setQuestions(data.data);
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return <Home />;
}

export default App;
