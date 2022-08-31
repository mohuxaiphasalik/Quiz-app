import React from "react";
import Quiz from "./quizComponent";
import axios from "axios";
import he from "he";

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
  React.useEffect(() => {
    axios
      .get(
        "https://opentdb.com/api.php?amount=5&category=21&difficulty=medium&type=multiple"
      )
      .then((res) => {
        if (res.data.response_code === 0) {
          setDataFound(true);
          return setApiData(res.data.results);
        } else {
          console.log("no Data Found");
        }
      });
  }, []);
  if (dataFound) {
    let apiDataObject = apiData.map((Element) => {
      return {
        question: he.decode(Element.question),
        correctAnswer: he.decode(Element.correct_answer),
        option: shuffle([
          he.decode(Element.correct_answer),
          he.decode(Element.incorrect_answers[0]),
          he.decode(Element.incorrect_answers[1]),
          he.decode(Element.incorrect_answers[2]),
        ]),
      };
    });
    console.log(apiDataObject);
    return (
      <div className="container-quiz">
        <ol>
          {apiDataObject.map((e) => (
            <li>
              <Quiz question={e.question} option={e.option} />
            </li>
          ))}
        </ol>
      </div>
    );
  }
}
