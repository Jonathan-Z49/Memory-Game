import React from 'react';

import Card from './Card';

interface Props {
  characters: CharacterModel[];
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
}

const CardContainer = (props: Props) => {
  return (
    <section className="cards-container">
      {props.characters.map((item) => (
        <Card
          key={item.char_id}
          name={item.name}
          image={item.img}
          id={item.char_id}
          onClick={props.onClick}
        />
      ))}
    </section>
  );
};

export default CardContainer;
