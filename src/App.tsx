import { getGenderGermanWord } from "german-words";
import words from "german-words-dict/dist/words.json";
import { useEffect, useState } from "react";
import { Input } from "./components/ui/input";

function App() {
  const [word, setWord] = useState<string>("");
  const [genre, setGenre] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    if (word) {
      const matchingWords = Object.keys(words).filter((w) =>
        w.toLowerCase().startsWith(word.toLowerCase())
      );
      setSuggestions(matchingWords);
      if (matchingWords.length > 0) {
        // @ts-expect-error Their types are weird
        const genre = getGenderGermanWord(null, words, matchingWords[0]);
        setGenre(genre);
      } else {
        setGenre("Unknown");
      }
    } else {
      setSuggestions([]);
      setGenre("");
    }
  }, [word]);

  return (
    <>
      <h1>Der Die Das</h1>
      <Input
        value={word}
        onChange={(e) => setWord(e.target.value)}
        placeholder="Enter a German word"
      />
      {suggestions.length > 0 && (
        <ul>
          {suggestions.map((suggestion, index) => (
            <li key={index}>{suggestion}</li>
          ))}
        </ul>
      )}
      {genre && (
        <p>
          The genre of "{word}" is: {genre}
        </p>
      )}
    </>
  );
}

export default App;
