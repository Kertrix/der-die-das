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
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <div className="container flex flex-col max-w-screen-xl">
        <div
          className="flex min-h-[480px] bg-cover bg-center bg-no-repeat text-white rounded-2xl p-4 mt-8"
          style={{
            backgroundImage: `url("/germany.png")`,
          }}
        >
          <h1 className="text-3xl font-bold mb-6">Der Die Das</h1>
        </div>

        <Input
          value={word}
          onChange={(e) => setWord(e.target.value)}
          placeholder="Enter a German word"
          className="w-full p-4 text-lg border border-gray-300 mb-4"
        />
        {suggestions.length > 0 && (
          <ul className="w-full max-w-md bg-white shadow-md rounded">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="p-4 border-b border-gray-200 last:border-b-0"
              >
                {suggestion} -{" "}
                {genreMap[getGenderGermanWord(suggestion)!] || "No genre found"}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
