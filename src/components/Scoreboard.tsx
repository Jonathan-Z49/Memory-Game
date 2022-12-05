import React from 'react';

const Scoreboard = (props: { scores: Scores }) => {
  return (
    <div className="scoreboard">
      <span className="current-score"> {props.scores.current} </span>
      <span className="best-score"> {props.scores.best} </span>
    </div>
  );
};

export default Scoreboard;
