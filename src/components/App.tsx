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
    async function getAPIData() {
      const controller = new AbortController(); //controller to pass to fetch request
      const timeoutID = setTimeout(() => {
        controller.abort(); //if 10s pass cancel fetch request
      }, 10000);

      try {
        const offset: number = Math.floor(Math.random() * (500 - 0) + 0);
        const url = `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`;
        const response = await fetch(url, { signal: controller.signal }); //fetches inital response which doesnt give us detail info about char, only name and url that points to it
        const json: PokeAPIResults = await response.json(); //array of 10 characters but only a name and url to their detailed info
        const responseAll = await Promise.all(
          json.results.map((item) => fetch(item.url, { signal: controller.signal })),
        ); //make a fetch on each characters url
        const result: CharacterModel[] = await Promise.all(
          responseAll.map(async (item) => await item.json()), //return an array of objects instead of promises
        );
        clearTimeout(timeoutID);
        setCharacters(result);
        setStatus({ isLoaded: true, error: false });
      } catch (error) {
        setStatus({ isLoaded: false, error: true });
      }
    }

    if (!status.isLoaded) {
      getAPIData();
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
