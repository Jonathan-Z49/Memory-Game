import 'modern-normalize';
import '../css/App.scss';

import React, { useEffect, useState } from 'react';

import shuffle from '../utils/shuffle';
import CardContainer from './CardContainer';
import Scoreboard from './Scoreboard';
import WinModal from './WinModal';

function App() {
  const [characters, setCharacters] = useState<CharacterModel[]>([]); //api data
  const [score, setScore] = useState<Scores>({ current: 0, best: 0 }); //score
  const [guess, setGuess] = useState<number[]>([]); //current guesses, by char_id from api data
  const [status, setStatus] = useState({ isLoaded: false, error: false }); //status for checking if api is loaded, and if any errors happen.

  useEffect(() => {
    if (!status.isLoaded) {
      const controller = new AbortController(); //controller to pass to fetch request
      const timeoutID = setTimeout(() => {
        controller.abort(); //if 10s pass cancel fetch request
      }, 10000);
      const offset: number = Math.floor(Math.random() * (52 - 0) + 0); //62 chars in api, make limit 52 so that we never have less than 10 chars
      const url = `https://www.breakingbadapi.com/api/characters?limit=10&offset=${offset}`;
      fetch(url, { signal: controller.signal })
        .then((res) => {
          clearTimeout(timeoutID); //stop timer since fetch was successfull
          setStatus({ isLoaded: true, error: false });
          return res.json();
        })
        .then((data) => {
          setCharacters(data);
        })
        .catch((error) => {
          setStatus({ isLoaded: false, error: true }); //set error so we can diplay.
          console.log(error);
        });
    } else {
      setCharacters((prevState) => shuffle(prevState.map((obj) => ({ ...obj })))); //shuffle copy of array
    }
  }, [guess]);

  const resetGame = () => {
    setGuess([]); //incorrect guess, lost game so reset.
    setScore((prevState) => ({ ...prevState, current: 0 })); //only reset regular score, not best score.
    setStatus({ isLoaded: false, error: false }); //get new api data
  };

  const handleClickGuess = (e: React.MouseEvent<HTMLElement>) => {
    const char_id: string = e.currentTarget.getAttribute('data-id') as string;
    const isPresent = guess.indexOf(Number(char_id)); //index or -1 if not found

    if (isPresent == -1) {
      setGuess((prevState) => [...prevState, Number(char_id)]); //correct guess
      setScore((prevState) => ({ ...prevState, current: prevState.current + 1 })); //add to score if correct
      if (score.current > score.best) {
        setScore((prevState) => ({ ...prevState, best: prevState.current })); //update high score
      }
    } else {
      resetGame();
    }
  };

  return (
    <main className="App">
      <Scoreboard scores={score} />
      {status.isLoaded ? (
        <CardContainer characters={characters} onClick={handleClickGuess} />
      ) : (
        <div className="loading-msg">
          {status.error ? 'Error trying to fetch data...' : 'Loading...'}
        </div>
      )}
      {score.current === 10 && <WinModal onClick={resetGame} />}
    </main>
  );
}

export default App;
