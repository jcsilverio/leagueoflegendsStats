import React, { Component } from "react";
import PropTypes from "prop-types";

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      SummName: ""
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onSummNameChange = this.onSummNameChange.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.SummName);
  }

  onSummNameChange(e) {
    this.setState({ SummName: e.target.value });
  }

  render() {
    return (
      <form className="Search" onSubmit={this.onSubmit}>
        <input
          type="text"
          placeholder="Summoner Name..."
          autoComplete="off"
          value={this.state.SummName}
          onChange={this.onSummNameChange}
        />
        <input type="submit" value="Search" />
      </form>
    );
  }
}

Search.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default Search;

//    <input
//    id="search-nav"
//    type="text"
//    placeholder="Search..."
//    autoComplete="off"
//  />
//  <span className="input-group-btn">
//    <button
//      className="btn-primary search-submit"
//      target="#search-nav"
//      type="button"
//    >
//      <span className="fa fa-search" />
//    </button>
//  </span>
