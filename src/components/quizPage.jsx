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
let apiDataObject = [];

let correctAnswers = [];
let userAnswers = [];
export default function QuizPage() {
  const [apiData, setApiData] = React.useState({});
  const [rerender, setRerender] = React.useState(false);
  React.useEffect(() => {
    userAnswers = [];
    correctAnswers = [];
    axios
      .get(
        "https://opentdb.com/api.php?amount=5&category=21&difficulty=medium&type=multiple"
      )
      .then((res) => {
        apiDataObject = res.data.results.map((Element) => {
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

        setApiData(res.data);
      });
  }, []);
  function compareResult() {
    correctAnswers.forEach((e, i) => {
      if (e.answer !== userAnswers[i].answer) {
        userAnswers[i].isWrong = true;
      } else {
        userAnswers[i].isWrong = false;
      }
    });
  }
  if (apiData.response_code === 0) {
    apiDataObject.forEach((e) => {
      correctAnswers.push({
        question: e.question.value,
        answer: e.correctAnswer.value,
      });
      userAnswers.push({
        question: e.question.value,
        answer: "",
        isWrong: "",
      });
    });
    function handleClick() {
      compareResult(correctAnswers, userAnswers);
      console.log(userAnswers);
      setRerender((p) => !p);
    }
    function handleChange(e) {
      userAnswers.forEach((k) => {
        if (e.target.name === k.question) {
          k.answer = e.target.value;
        }
      });
    }
    console.log("-------------rerender");
    return (
      <div className="container-quiz">
        <ol>
          {apiDataObject.map((e, j) => (
            <li>
              <Quiz
                question={e.question}
                option={e.option}
                correct={correctAnswers[j].answer}
                handleChange={handleChange}
                answer={userAnswers[j].answer}
                isWrong={userAnswers[j].isWrong}
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
