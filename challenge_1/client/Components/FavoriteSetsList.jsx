import React from "react";

const FavoriteSetsList = ({ sets, setSelect }) => {
  return (
    <div>
      <h3>Favorite Sets</h3>
      {sets.map((set, index) => (
        <div key={index} onClick={setSelect.bind(null, set.id)}>
          {set.name}
        </div>
      ))}
    </div>
  );
};

export default FavoriteSetsList;
