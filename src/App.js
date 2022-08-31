import React from "react";
import axios from "axios";
import StartPage from "./components/start";
import QuizPage from "./components/quizPage";
import "./styles/styles.css";

function App() {
  const [startPage, setStartPage] = React.useState(true);
  function startClick() {
    console.log("clicked");
    setStartPage(false);
  }
  return (
    <div className="App">
      {startPage && <StartPage startClick={startClick} />}
      {!startPage && <QuizPage />}
    </div>
  );
}

export default App;
