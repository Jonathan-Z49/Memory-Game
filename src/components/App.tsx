import '../css/App.scss';

import React, { useEffect, useState } from 'react';

import getData from '../utils/api';
import Card from './Card';

function App() {
  const [characters, setCharacters] = useState<CharacterModel[]>([]); //api data
  const [score, setScore] = useState<number>(0); //score
  const [guess, setGuess] = useState<number[]>([]); //current guesses, by char_id from api data
  const [loading, setLoading] = useState(false); //if api loaded or not

  useEffect(() => {
    // if (!loading) {
    //   const offset: number = Math.floor(Math.random() * (62 - 0) + 0);
    //   const url = `https://www.breakingbadapi.com/api/characters?limit=10&offset=${offset}`;
    //   fetch(url)
    //     .then((res) => res.json())
    //     .then((data) => {
    //       setCharacters(data);
    //       setLoading(true);
    //     })
    //     .catch((error) => {
    //       setLoading(false);
    //       console.log(error);
    //     });
    // }
  }, []);

  const handleClickGuess = (e: React.MouseEvent<HTMLElement>) => {
    const char_id: string = (e.target as HTMLDivElement).getAttribute('data-id');
    const isPresent = guess.indexOf(Number(char_id)); //index or -1 if not found
    if (isPresent == -1) {
      setGuess((prevState) => [...prevState, Number(char_id)]); //correct guess
      setScore((prevState) => prevState + 1);
    } else {
      setGuess([]); //incorrect guess, lost game so reset.
      setScore(0);
      setLoading(false); //get new api data
    }
  };

  return (
    <div className="App">
      {characters.map((item) => (
        <Card
          key={item.char_id}
          name={item.name}
          image={item.img}
          id={item.char_id}
          onClick={handleClickGuess}
        />
      ))}
    </div>
  );
}

export default App;
