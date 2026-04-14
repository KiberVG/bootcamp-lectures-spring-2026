import { useEffect, useState } from "react";
import CapturedList from "./CapturedList";
import PokemonSprite from "./PokemonSprite";

function App() {
  // State variables
  const [allPokemonList, setAllPokemonList] = useState([]); // All pokemon from the API
  const [capturedPokemon, setCapturedPokemon] = useState([]); // Captured pokemon
  const [currentPokemon, setCurrentPokemon] = useState(null); // Current pokemon being guessed

  const [choices, setChoices] = useState([]); // Choices for the current round

  const [score, setScore] = useState(0); // Current score

  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [hasGuessed, setHasGuessed] = useState(false); // Whether the user has guessed
  const [selectedChoice, setSelectedChoice] = useState(""); // Selected choice

  // useEffect to load the pokemon name list
  useEffect(() => {
    loadPokemonNameList();
  }, []);

  // Fetch request to get the pokemon from the Pokemon backend
  async function loadPokemonNameList() {
    // Test it out yourself: https://pokeapi.co/api/v2/pokemon?limit=50
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1000");
    const data = await response.json();
    // Set the state! 
    setAllPokemonList(data.results); // Looks like [{name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/"}, {name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/"}]
    loadNewRound(data.results); // Function we wrote to get everything ready for a new round
  }

  async function loadNewRound(overrideList = allPokemonList) {

    setIsLoading(true); // Set the loading state to true (this is a professional way to show the user that the app is loading)
    setHasGuessed(false);// User hasn't guessed yet
    setSelectedChoice(""); // User hasn't selected a choice yet
    setChoices([]); // No choices available yet

    const randomPokemon =
      overrideList[Math.floor(Math.random() * overrideList.length)]; // Get a random pokemon from the override list
    const response = await fetch(randomPokemon.url); // Fetch the pokemon from the Pokemon backend
    const pokemon = await response.json(); // Parse the response as JSON

    const nextPokemon = {
      name: pokemon.name,
      image:
        pokemon.sprites.other["official-artwork"].front_default ||
        pokemon.sprites.front_default,
    };

    // What should we display as choices?
    const nextChoices = [nextPokemon.name]; // The name of the current pokemon

    while (nextChoices.length < 4) { // And then three others that aren't correct
      const randomName =
        overrideList[Math.floor(Math.random() * overrideList.length)].name;
      if (!nextChoices.includes(randomName)) {
        nextChoices.push(randomName);
      }
    }

    nextChoices.sort(() => Math.random() - 0.5); // Shuffle the choices

    // Now we can set the state to what we have 
    setCurrentPokemon(nextPokemon);
    setChoices(nextChoices);
    setIsLoading(false);
  }

  // Event handler for when user makes selection
  function handleGuess(choice) {
    if (!currentPokemon || hasGuessed) {
      return;
    }

    setHasGuessed(true);
    setSelectedChoice(choice);

    if (choice === currentPokemon.name) {
      setScore((previous) => previous + 10);
      setCapturedPokemon((previous) => {
        const alreadyCaptured = previous.some(
          (pokemon) => pokemon.name === currentPokemon.name
        );

        if (alreadyCaptured) {
          return previous;
        }

        return [...previous, currentPokemon];
      });
    }
  }

  // Event handler for when user removes a captured pokemon
  function removeCapturedPokemon(nameToRemove) {
    // Just need to filter out the pokemon that the user wants to remove, and set the state to the new list
    setCapturedPokemon((previous) => previous.filter((pokemon) => pokemon.name !== nameToRemove));
  }

  // Helper function to get the class for the choice button
  function getChoiceClass(choice) {
    if (!hasGuessed) {
      return "choice-button";
    }

    if (choice === currentPokemon?.name) {
      return "choice-button correct";
    }

    if (choice === selectedChoice) {
      return "choice-button wrong";
    }

    return "choice-button";
  }

  return (
    <main className="app">
      <section className="game-card">
        <h1>Who's That Pokemon?</h1>

        <PokemonSprite image={currentPokemon?.image} hasGuessed={hasGuessed} />

        {isLoading ? (
          <p className="loading-text">Fetching Pokemon...</p>
        ) : (
          <div className="choices-grid">
            {choices.map((choice) => (
              <button
                key={choice}
                className={getChoiceClass(choice)}
                onClick={() => handleGuess(choice)}
                disabled={hasGuessed}
              >
                {choice.toUpperCase()}
              </button>
            ))}
          </div>
        )}

        <button className="next-button" onClick={() => loadNewRound()}>
          Next Round
        </button>

        <p className="stats">
          Score: <strong>{score}</strong>
        </p>
      </section>

      <CapturedList
        capturedPokemon={capturedPokemon}
        onRemovePokemon={removeCapturedPokemon}
      />
    </main>
  );
}

export default App;
