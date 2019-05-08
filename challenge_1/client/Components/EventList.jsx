import React from "react";
import EventItem from "./EventItem.jsx";

const EventList = ({
  query,
  events,
  eventEdit,
  eventFavorite,
  displayFavorites,
  favoritesSet
}) => (
  <div className="event-list-container">
    {displayFavorites ? (
      <h3>Showing events from favorites set "{favoritesSet}"</h3>
    ) : query === "" ? null : (
      <h3>Showing results for "{query}"</h3>
    )}
    {events.map((event, index) => (
      <EventItem
        key={index}
        event={event}
        edit={eventEdit}
        favorite={eventFavorite}
        displayFavorites={displayFavorites}
      />
    ))}
  </div>
);

export default EventList;
