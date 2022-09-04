import React from "react";
export default function Quiz(props) {
  function isWrong(isWrong, answer) {
    if (isWrong === true) {
      if (answer === props.correct) {
        return "label isWrong rightAnswer";
      } else {
        return "label isWrong";
      }
    } else if (isWrong === false) {
      return "label isRight";
    }
    return "label";
  }
  return (
    <div className="quiz" id={props.question.id}>
      <h3 className="question">{props.question.value}</h3>
      <div className="options">
        <input
          className="radio"
          type="radio"
          id={props.option[0].id}
          name={props.question.value}
          value={props.option[0].value}
          onChange={props.handleChange}
        />
        <label
          className={isWrong(props.isWrong, props.option[0].value)}
          htmlFor={props.option[0].id}
        >
          {props.option[0].value}
        </label>
        <input
          className="radio"
          type="radio"
          id={props.option[1].id}
          name={props.question.value}
          value={props.option[1].value}
          onChange={props.handleChange}
        />
        <label
          className={isWrong(props.isWrong, props.option[1].value)}
          htmlFor={props.option[1].id}
        >
          {props.option[1].value}
        </label>
        <input
          className="radio"
          type="radio"
          id={props.option[2].id}
          name={props.question.value}
          value={props.option[2].value}
          onChange={props.handleChange}
        />
        <label
          className={isWrong(props.isWrong, props.option[2].value)}
          htmlFor={props.option[2].id}
        >
          {props.option[2].value}
        </label>
        <input
          className="radio"
          type="radio"
          id={props.option[3].id}
          name={props.question.value}
          value={props.option[3].value}
          onChange={props.handleChange}
        />
        <label
          className={isWrong(props.isWrong, props.option[3].value)}
          htmlFor={props.option[3].id}
        >
          {props.option[3].value}
        </label>
      </div>
      <h2>
        {props.correct}
        <br />
      </h2>
    </div>
  );
}
