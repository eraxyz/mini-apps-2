import React from "react";

const EventItem = ({ event, edit, favorite }) => {
  let props = Object.keys(event);

  return (
    <div className="event-item">
      {props.map(prop => (
        <div>
          {prop}: {event[prop]}
        </div>
      ))}
      <div className="event-buttons">
        <button type="button" onClick={edit}>
          Edit
        </button>
        <button type="button" onClick={favorite}>
          Favorite
        </button>
      </div>
    </div>
  );
};

export default EventItem;
