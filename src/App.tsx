import words from "german-words-dict/dist/words.json";
import { useEffect, useState } from "react";
import { Input } from "./components/ui/input";
import { getGenderGermanWord } from "./lib/utils";

function App() {
  const [word, setWord] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const genreMap: { [key: string]: string } = {
    M: "Der",
    F: "Die",
    N: "Das",
  };

  useEffect(() => {
    if (word) {
      const matchingWords = Object.keys(words)
        .filter((w) => w.toLowerCase().startsWith(word.toLowerCase()))
        .slice(0, 10);
      setSuggestions(matchingWords);
    } else {
      setSuggestions([]);
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
            <li key={index}>
              {suggestion} -{" "}
              {genreMap[getGenderGermanWord(suggestion)!] || "No genre found"}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default App;
