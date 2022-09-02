import React from "react";
import Quiz from "./quizComponent";
import axios from "axios";
import he from "he";
import { nanoid } from "nanoid";
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}
let wrongAnswers = [];
export default function QuizPage() {
  const [apiData, setApiData] = React.useState({});
  // const [wrongAnswers, setWrongAnswer] = React.useState([]);
  const [rerender, setRerender] = React.useState(false);
  React.useEffect(() => {
    axios
      .get(
        "https://opentdb.com/api.php?amount=5&category=21&difficulty=medium&type=multiple"
      )
      .then((res) => setApiData(res.data));
  }, []);
  function compareResult(a, b) {
    wrongAnswers = [];
    a.forEach((e, i) => {
      if (e.answer !== b[i].answer) {
        if (wrongAnswers.indexOf(i) === -1) {
          wrongAnswers.push(i);
        }
      }
    });
    return wrongAnswers;
  }
  if (apiData.response_code === 0) {
    let correctAnswers = [];
    let userAnswers = [];
    let apiDataObject = apiData.results.map((Element) => {
      return {
        question: { value: he.decode(Element.question), id: nanoid() },
        correctAnswer: {
          value: he.decode(Element.correct_answer),
          id: nanoid(),
        },
        option: shuffle([
          {
            value: he.decode(Element.correct_answer),
            id: nanoid(),
            selected: false,
          },
          {
            value: he.decode(Element.incorrect_answers[0]),
            id: nanoid(),
            selected: false,
          },
          {
            value: he.decode(Element.incorrect_answers[1]),
            id: nanoid(),
            selected: false,
          },
          {
            value: he.decode(Element.incorrect_answers[2]),
            id: nanoid(),
            selected: false,
          },
        ]),
      };
    });
    apiDataObject.forEach((e) => {
      correctAnswers.push({
        question: e.question.value,
        answer: e.correctAnswer.value,
      });
      userAnswers.push({
        question: e.question.value,
        answer: "",
      });
    });
    console.log("Correct answers -> 1", correctAnswers);
    function handleClick() {
      compareResult(correctAnswers, userAnswers);
      console.log(wrongAnswers);
      setRerender((p) => !p);
    }
    function handleChange(e) {
      userAnswers.forEach((i) => {
        if (e.target.name === i.question) {
          i.answer = e.target.value;
        }
      });
    }
    console.log("rerender");

    return (
      <div className="container-quiz">
        <ol>
          {apiDataObject.map((e, i) => (
            <li>
              <Quiz
                question={e.question}
                option={e.option}
                handleChange={handleChange}
                wrongAnswers={() => {
                  if (
                    wrongAnswers.indexOf(i) !== -1 &&
                    wrongAnswers.length > 0
                  ) {
                    return userAnswers[i];
                  } else {
                    return "";
                  }
                }}
              />
            </li>
          ))}
        </ol>
        <button className="checkAnswer" onClick={handleClick}>
          Submit Your Answers
        </button>
      </div>
    );
  }
}
