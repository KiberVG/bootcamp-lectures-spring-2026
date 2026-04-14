function PokemonSprite({ image, hasGuessed }) {
  return (
    <div className="sprite-wrapper">
      {image ? (
        <img
          src={image}
          alt="Mystery Pokemon"
          className={`pokemon-image ${hasGuessed ? "" : "silhouette"}`}
        />
      ) : (
        <p className="loading-text">Loading image...</p>
      )}
    </div>
  );
}

export default PokemonSprite;
