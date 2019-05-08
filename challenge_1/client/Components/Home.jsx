import React from "react";
import SearchBar from "./SearchBar.jsx";
import EventList from "./EventList.jsx";
import EditEvent from "./EditEvent.jsx";
import FavoriteSetSelect from "./FavoriteSetSelect.jsx";
import ReactPaginate from "react-paginate";

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      currentSearchQuery: "",
      currentPage: 1,
      pageCount: 1,
      events: [],
      favorites: [],
      editingActive: false,
      editingEvent: null,
      favoritingActive: false,
      favoritingId: 0
    };
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.handleEventEdit = this.handleEventEdit.bind(this);
    this.handleEditSave = this.handleEditSave.bind(this);
    this.handleEventFavorite = this.handleEventFavorite.bind(this);
    this.handleFavoriteSave = this.handleFavoriteSave.bind(this);
  }

  componentDidMount() {
    fetch("/favorites")
      .then(response => response.json())
      .then(favorites => this.setState({ favorites }))
      .catch(err => console.error(err));
  }

  handleSearchSubmit(searchQuery) {
    let pageCount;
    fetch(`/events?q=${searchQuery}&_page=1`)
      .then(response => {
        pageCount = Number(
          response.headers
            .get("link")
            .split("page=")
            .pop()[0]
        );
        return response.json();
      })
      .then(events =>
        this.setState({ events, pageCount, currentSearchQuery: searchQuery })
      )
      .catch(err => console.error(err));
  }

  handlePageClick({ selected }) {
    fetch(`/events?q=${this.state.currentSearchQuery}&_page=${selected + 1}`)
      .then(response => response.json())
      .then(events => this.setState({ events, currentPage: selected + 1 }))
      .catch(err => console.error(err));
  }

  handleEventEdit(id) {
    fetch(`/events?id=${id}`)
      .then(response => response.json())
      .then(result =>
        this.setState({
          editingActive: true,
          editingEvent: result[0]
        })
      )
      .catch(err => console.error(err));
  }

  handleEditSave(newEvent, id) {
    fetch(`/events/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newEvent)
    })
      .then(() => this.setState({ editingActive: false, editingEvent: null }))
      .catch(err => console.error(err));
  }

  handleEventFavorite(id) {
    this.setState({
      favoritingId: id,
      favoritingActive: true
    });
  }

  handleFavoriteSave(eventId, favoriteId, newSetName) {
    let { favorites } = this.state;
    if (favoriteId === null) {
      favorites.push({
        id: favorites.length + 1,
        name: newSetName,
        eventIds: [eventId]
      });
      fetch(`/favorites/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(favorites[favorites.length - 1])
      })
        .then(response => response.json())
        .then(() => this.setState({ favorites, favoritingActive: false }))
        .catch(err => console.error(err));
    } else {
      favorites[favoriteId - 1].eventIds.push(eventId);
      fetch(`/favorites/${favoriteId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(favorites[favoriteId - 1])
      })
        .then(response => response.json())
        .then(() => this.setState({ favorites, favoritingActive: false }))
        .catch(err => console.error(err));
    }
  }

  render() {
    const {
      editingActive,
      editingEvent,
      favoritingId,
      favoritingActive,
      favorites,
      currentSearchQuery,
      events,
      pageCount
    } = this.state;
    return (
      <div className="main-container">
        <h2>Historical Event Finder</h2>
        <SearchBar handleSearchSubmit={this.handleSearchSubmit} />
        {editingActive ? (
          <EditEvent event={editingEvent} save={this.handleEditSave} />
        ) : null}
        {favoritingActive ? (
          <FavoriteSetSelect
            eventId={favoritingId}
            addToFavorites={this.handleFavoriteSave}
            favorites={favorites}
          />
        ) : null}
        <EventList
          query={currentSearchQuery}
          events={events}
          eventEdit={this.handleEventEdit}
          eventFavorite={this.handleEventFavorite}
        />
        {events.length === 0 ? null : (
          <ReactPaginate
            previousLabel={"previous"}
            nextLabel={"next"}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
        )}
      </div>
    );
  }
}

export default Home;
