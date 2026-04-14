function CapturedList({ capturedPokemon, onRemovePokemon }) {
  return (
    <section className="captured-card">
      <h2>Captured Pokemon ({capturedPokemon.length})</h2>
      {capturedPokemon.length === 0 ? (
        <p className="empty-captured">Capture a Pokemon by guessing correctly.</p>
      ) : (
        <ul className="captured-list">
          {capturedPokemon.map((pokemon) => (
            <li key={pokemon.name} className="captured-item">
              <span>{pokemon.name}</span>
              <button
                className="remove-button"
                onClick={() => onRemovePokemon(pokemon.name)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default CapturedList;
