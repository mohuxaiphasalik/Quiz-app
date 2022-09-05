import React from "react";

export default function StartPage(props) {
  return (
    <div className="main">
      <div className="content">
        <h1 className="title">Quizzie</h1>
        <p className="description">Test Your Sports Knowledge</p>
        <button className="start-btn" onClick={props.startClick}>
          Start Quiz
        </button>
      </div>
    </div>
  );
}
