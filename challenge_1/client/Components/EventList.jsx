import React from "react";
import EventItem from "./EventItem.jsx";

const EventList = ({ query, events, eventEdit, eventFavorite }) => (
  <div className="event-list-container">
    {query === "" ? null : <h3>Showing results for {query}</h3>}
    {events.map(event => (
      <EventItem event={event} edit={eventEdit} favorite={eventFavorite} />
    ))}
  </div>
);

export default EventList;
