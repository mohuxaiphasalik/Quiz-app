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
export default function QuizPage() {
  const [apiData, setApiData] = React.useState([]);
  const [dataFound, setDataFound] = React.useState(false);
  const [newData, setNewData] = React.useState([]);
  React.useEffect(() => {
    axios
      .get(
        "https://opentdb.com/api.php?amount=5&category=21&difficulty=medium&type=multiple"
      )
      .then((res) => {
        if (res.data.response_code === 0) {
          setDataFound(true);
          return setApiData(res.data.results);
        }
      });
  }, []);
  if (dataFound) {
    let apiDataObject = apiData.map((Element) => {
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
    function handleClick(qid, id) {
      apiDataObject.forEach((e) => {
        if (e.question.id === qid) {
          e.option.forEach((o) => {
            if (o.id === id) {
              console.log(o.value);
              o.selected = true;
            } else {
              o.selected = false;
            }
          });
        }
      });

      setNewData(apiDataObject);
    }
    console.log("rendered");
    console.log(apiDataObject);

    // console.log(apiDataObject);
    return (
      <div className="container-quiz">
        <ol>
          {apiDataObject.map((e) => (
            <li>
              <Quiz
                clickHandle={handleClick}
                question={e.question}
                option={e.option}
              />
            </li>
          ))}
        </ol>
        <button className="checkAnswer">Submit Your Answers </button>
      </div>
    );
  }
}
