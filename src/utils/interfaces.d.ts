interface CharacterModel {
  id: 1;
  name: string;
  sprites: { front_default: string };
}

interface PokeAPIResults {
  results: { name: string; url: string }[];
}

interface Scores {
  current: number;
  best: number;
}
