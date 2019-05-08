import React from "react";

const SearchBar = ({ handleSearchSubmit }) => {
  return (
    <div className="search-container">
      <form id="search-form">
        <input type="text" id="searchbar" />
        <button
          type="button"
          onClick={() => {
            handleSearchSubmit(document.getElementById("searchbar").value);
            document.getElementById("search-form").reset();
          }}
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
