import React from "react";

const FavoriteSetSelect = ({ eventId, favorites, addToFavorites }) => {
  const id = eventId;
  console.log(id);

  const addNewSet = () => {
    addToFavorites(
      id,
      null,
      document.getElementById("favorite-set-input").value
    );
  };

  const selectSet = () => {
    console.log(id);
    const sets = document.getElementById("favorite-sets");
    addToFavorites(id, sets.options[sets.selectedIndex].value);
  };

  return (
    <div className="background">
      <div className="favorite-event-container">
        <h4>Select Favorite Set</h4>
        <select id="favorite-sets">
          {favorites.map(favorite => (
            <option value={favorite.id}>{favorite.name}</option>
          ))}
        </select>
        <button type="button" onClick={selectSet}>
          Save
        </button>
        <input type="text" id="favorite-set-input" />
        <button type="button" onClick={addNewSet}>
          {" "}
          Add To New Favorite Set{" "}
        </button>
      </div>
    </div>
  );
};

export default FavoriteSetSelect;
