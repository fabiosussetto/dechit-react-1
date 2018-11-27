import React, { Component } from 'react';

class SearchBar extends React.Component {

  state = {value: 40};

  handleChange = this.handleChange.bind(this);
  handleSubmit = this.handleSubmit.bind(this);

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    this.props.filterResults(this.state.value);
    event.preventDefault();
  }

  render() {
    const { filterResults } = this.props
    return (
      <form onSubmit={this.handleSubmit} className="form-inline">
        <label>
          <input type="text" value={this.state.value} onChange={this.handleChange} className="form-control mr-2 mb-2" />
        </label>
        <input type="submit" value="Filter" className="btn btn-success btn-outline-success mb-2" />
      </form>
    );
  }
}

export default SearchBar;
