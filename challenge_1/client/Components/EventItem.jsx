import React from "react";

const EventItem = ({ event, edit, favorite, displayFavorites }) => {
  const keys = Object.keys(event);
  let editFn, favoriteFn;

  if (!displayFavorites) {
    editFn = edit.bind(null, event.id);
    favoriteFn = favorite.bind(null, event.id);
  }

  return (
    <div className="event-item">
      {keys.map((key, index) => (
        <div key={index}>
          {key}: {event[key]}
        </div>
      ))}
      {displayFavorites ? null : (
        <div className="event-buttons">
          <button type="button" onClick={editFn}>
            Edit
          </button>
          <button type="button" onClick={favoriteFn}>
            Favorite
          </button>
        </div>
      )}
    </div>
  );
};

export default EventItem;
