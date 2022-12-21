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
          key={item.id}
          name={item.name}
          image={item.sprites.front_default}
          id={item.id}
          onClick={props.onClick}
        />
      ))}
    </section>
  );
};

export default CardContainer;
