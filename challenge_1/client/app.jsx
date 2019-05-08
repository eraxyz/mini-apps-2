import React from "react";
import SearchBar from "./Components/SearchBar.jsx";
import EventList from "./Components/EventList.jsx";
import ReactPaginate from "react-paginate";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentSearchQuery: "",
      currentPage: 1,
      pageCount: 1,
      results: []
    };
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.handleEventEdit = this.handleEventEdit.bind(this);
    this.handleEventFavorite = this.handleEventFavorite.bind(this);
  }

  handleSearchSubmit(searchQuery) {
    let pageCount;
    fetch(`/events?q=${searchQuery}&_page=1`)
      .then(response => {
        console.log(response.headers);
        pageCount = Number(
          response.headers
            .get("link")
            .split("page=")
            .pop()[0]
        );
        return response.json();
      })
      .then(results =>
        this.setState({ results, pageCount, currentSearchQuery: searchQuery })
      )
      .catch(err => console.error(err));
  }

  handlePageClick({ selected }) {
    fetch(`/events?q=${this.state.currentSearchQuery}&_page=${selected + 1}`)
      .then(response => response.json())
      .then(results => this.setState({ results, currentPage: selected + 1 }))
      .catch(err => console.error(err));
  }

  handleEventEdit(e) {
    console.log(e);
  }

  handleEventFavorite(e) {
    console.log(e);
  }

  render() {
    return (
      <div className="main-container">
        <h2>Historical Event Finder</h2>
        <SearchBar handleSearchSubmit={this.handleSearchSubmit} />
        <EventList
          query={this.state.currentSearchQuery}
          events={this.state.results}
          eventEdit={this.handleEventEdit}
          eventFavorite={this.handleEventFavorite}
        />
        {this.state.results.length === 0 ? null : (
          <ReactPaginate
            previousLabel={"previous"}
            nextLabel={"next"}
            pageCount={this.state.pageCount}
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

export default App;
