import React from "react";
export default function Quiz(props) {
  return (
    <div className="quiz">
      <h3 className="question">{props.question}</h3>
      <div className="options">
        <button className="option">{props.option[0]}</button>
        <button className="option">{props.option[1]}</button>
        <button className="option">{props.option[2]}</button>
        <button className="option">{props.option[3]}</button>
      </div>
    </div>
  );
}
