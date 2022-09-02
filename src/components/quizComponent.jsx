import React from "react";
export default function Quiz(props) {
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
        <label className="label" htmlFor={props.option[0].id}>
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
        <label className="label" htmlFor={props.option[1].id}>
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
        <label className="label" htmlFor={props.option[2].id}>
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
        <label className="label" htmlFor={props.option[3].id}>
          {props.option[3].value}
        </label>
      </div>
      <h1>{props.wrongAnswers}</h1>
    </div>
  );
}
