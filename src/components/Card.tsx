import React from 'react';

interface Props {
  name: string;
  image: string;
  id: number;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
}

const Card = (props: Props) => {
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
    <div className="card" data-id={props.id} onClick={props.onClick}>
      <img className="card-image" src={props.image} alt={props.name + ' picture'} />
      <div className="card-name"> {props.name} </div>
    </div>
  );
};

export default Card;
