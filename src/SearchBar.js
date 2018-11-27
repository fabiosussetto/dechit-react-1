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
        <input type="num" value={this.state.value} onChange={this.handleChange} className="c-filter-input form-control mr-2" />
        <input type="submit" value="Filter" className="btn btn-success btn-outline-success" />
      </form>
    );
  }
}

export default SearchBar;
