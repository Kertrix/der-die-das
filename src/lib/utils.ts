import { clsx, type ClassValue } from "clsx";
import words from "german-words-dict/dist/words.json";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface WordsList {
  [key: string]: {
    G?: string;
  };
}

function getGender(wordsList: WordsList, word: string): string | null {
  if (wordsList && wordsList[word] && wordsList[word].G) {
    return wordsList[word].G;
  } else {
    return null;
  }
}

export function getGenderGermanWord(word: string): string | null {
  try {
    const gender = getGender(words as WordsList, word);
    return gender || "No genre found";
  } catch {
    return "No genre found";
  }
}
