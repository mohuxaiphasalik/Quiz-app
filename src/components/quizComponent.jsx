import React from "react";
export default function Quiz(props) {
  return (
    <div className="quiz" id={props.question.id}>
      <h3 className="question">{props.question.value}</h3>
      <div className="options">
        <button
          className={props.option.selected ? "option selected" : "option"}
          id={props.option[0].id}
          onClick={() =>
            props.clickHandle(props.question.id, props.option[0].id)
          }
        >
          {props.option[0].value}
        </button>
        <button
          className={props.option.selected ? "option selected" : "option"}
          onClick={() =>
            props.clickHandle(props.question.id, props.option[1].id)
          }
          id={props.option[1].id}
        >
          {props.option[1].value}
        </button>
        <button
          className={props.option.selected ? "option selected" : "option"}
          onClick={() =>
            props.clickHandle(props.question.id, props.option[2].id)
          }
          id={props.option[2].id}
        >
          {props.option[2].value}
        </button>
        <button
          className={props.option.selected ? "option selected" : "option"}
          onClick={() =>
            props.clickHandle(props.question.id, props.option[3].id)
          }
          id={props.option[3].id}
        >
          {props.option[3].value}
        </button>
      </div>
    </div>
  );
}
