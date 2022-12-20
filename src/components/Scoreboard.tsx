import React, { useEffect, useRef } from 'react';

const Scoreboard = (props: { scores: Scores }) => {
  const score_container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!score_container.current?.classList.contains('active')) {
      score_container.current?.classList.add('active');
    }
    const timer = setTimeout(() => {
      score_container.current?.classList.remove('active');
    }, 250);
    return () => clearTimeout(timer);
  }, [props.scores.current, props.scores.best]);

  return (
    <div ref={score_container} className="scoreboard">
      <span className="current-score"> {'Score: ' + props.scores.current} </span>
      <span className="best-score"> {'Best score: ' + props.scores.best} </span>
    </div>
  );
};

export default Scoreboard;
