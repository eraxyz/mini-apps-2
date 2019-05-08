import React from "react";
import FavoriteSetsList from "./FavoriteSetsList.jsx";
import EventList from "./EventList.jsx";

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      favorites: [],
      events: [],
      displaySets: true,
      activeSet: null
    };
    this.handleSetSelect = this.handleSetSelect.bind(this);
  }

  componentDidMount() {
    fetch("/favorites")
      .then(response => response.json())
      .then(favorites => this.setState({ favorites }))
      .catch(err => console.error(err));
  }

  handleSetSelect(id) {
    const activeSet = this.state.favorites[id - 1];
    const queryString = activeSet.eventIds.reduce(
      (acc, eventId) => (acc += `id=${eventId}&`),
      `?`
    );
    fetch(`/events${queryString.slice(0, -1)}`)
      .then(response => response.json())
      .then(events =>
        this.setState({ events, displaySets: false, activeSet: activeSet.name })
      )
      .catch(err => console.error(err));
  }

  render() {
    const { displaySets, activeSet, favorites, events } = this.state;
    return (
      <div className="main-container">
        <h2>Historical Event Finder</h2>
        {displaySets ? (
          <FavoriteSetsList sets={favorites} setSelect={this.handleSetSelect} />
        ) : (
          <div>
            <EventList
              events={events}
              favoritesSet={activeSet}
              displayFavorites={true}
            />
            <button
              type="button"
              onClick={() => this.setState({ displaySets: true })}
            >
              Back to Favorite Sets
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default Favorites;
