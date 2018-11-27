import React, { Component } from 'react';

class SearchBar extends Component {

  render() {
    /* TODO homeworks part two! */
    return (
      <form>
        <label>
          <input type="text" amount="amount" />
        </label>
        <input className="btn btn-success" type="submit" value="Submit" />
      </form>
    )
  }

}

export default SearchBar;
