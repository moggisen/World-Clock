import { useState } from "react";

//Custom hook for using localStorage with React state
export function useLocalStorage<T>(key: string, initialValue: T) {
  // State to store the value, try to load from localStorage first
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key); //Get value from localStorage
      return item ? (JSON.parse(item) as T) : initialValue; // parse if exists, otherwise use initial
    } catch {
      return initialValue; // if error, use initial value 
    }
  });

  // Function to update state and localStorage
  const setValue = (value: T) => {
    try {
      setStoredValue(value); // upate React state
      window.localStorage.setItem(key, JSON.stringify(value)); // Save to localStorage
    } catch {
      console.error("Kunde inte spara i localStorage"); // Show error if something goes wrong
    }
  };
// Return the value and the setter function
  return [storedValue, setValue] as const;
}
