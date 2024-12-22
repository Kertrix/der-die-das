import words from "german-words-dict/dist/words.json";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "./components/ui/badge";
import { getGenderGermanWord } from "./lib/utils";

function App() {
  const [word, setWord] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const genderMap: {
    [key: string]: { nom: string; akk: string; dat: string; gen: string };
  } = {
    M: { nom: "der", akk: "den", dat: "dem", gen: "des" },
    F: { nom: "die", akk: "die", dat: "der", gen: "der" },
    N: { nom: "das", akk: "das", dat: "dem", gen: "des" },
  };

  useEffect(() => {
    if (word) {
      const matchingWords = Object.keys(words)
        .filter((w) => w.toLowerCase().startsWith(word.toLowerCase()))
        .slice(0, 100);
      setSuggestions(matchingWords);
    } else {
      setSuggestions([]);
    }
  }, [word]);

  return (
    <div className="flex flex-col items-center min-h-screen font-[Inter] pb-4">
      <div className="container flex flex-col max-w-screen-xl">
        <div
          className="flex flex-col min-h-[480px] items-center justify-center bg-cover bg-center bg-no-repeat text-white rounded-3xl p-4 mt-4"
          style={{
            backgroundImage: `url("/germany.png")`,
          }}
        >
          <h1 className="text-5xl font-bold mb-4">Der Die Das</h1>
          <p className="mb-6">
            Finden Sie das Geschlecht jedes Wortes in Sekunden
          </p>
          <div className="w-full max-w-screen-sm flex items-center rounded-2xl border border-gray-300 bg-white focus-within:ring-2 focus-within:ring-blue-500">
            <Search className="h-6 w-6 ml-4 text-gray-500" />
            <input
              type="text"
              placeholder="Suchen Sie nach einem Wort"
              value={word}
              onChange={(e) => setWord(e.target.value)}
              className="w-full ml-2 pl-2 py-3 text-gray-700 bg-transparent focus:outline-none"
            />
          </div>
        </div>

        {suggestions.length > 0 ? (
          <ul className="w-full mt-4 border rounded-xl text-lg">
            <li className="p-4 flex items-center justify-between border-b text-sm">
              {suggestions.length} Wort(e) gefunden
            </li>
            {suggestions.map((suggestion, index) => {
              const genderKey = getGenderGermanWord(suggestion);
              const gender = genderKey ? genderMap[genderKey] : undefined;

              return (
                <li
                  key={index}
                  className="p-4 flex border-b border-gray-200 last:border-b-0"
                >
                  <span className="basis-2/3">
                    <b>{gender ? gender.nom : "No gender found"}</b> &nbsp;
                    {suggestion}
                  </span>
                  <div className="flex basis-1/3 justify-between">
                    {gender ? (
                      <>
                        <span>
                          <small>nom:</small>{" "}
                          <Badge variant={"outline"}>{gender.nom}</Badge>
                        </span>
                        <span>
                          <small>akk:</small>{" "}
                          <Badge variant={"outline"}>{gender.akk}</Badge>
                        </span>
                        <span>
                          <small>dat:</small>{" "}
                          <Badge variant={"outline"}>{gender.dat}</Badge>
                        </span>
                        <span>
                          <small>gen:</small>{" "}
                          <Badge variant={"outline"}>{gender.gen}</Badge>
                        </span>
                      </>
                    ) : (
                      <span>Gender not found</span>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          word.length > 0 && <p className="mt-4">Kein Wort gefunden</p>
        )}
      </div>
      <footer className="mt-auto py-4 text-center">
        <p>Made with ❤️ by Kertrix</p>
      </footer>
    </div>
  );
}

export default App;
