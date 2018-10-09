import React, { Component } from "react";
import PropTypes from "prop-types";

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      summonerName: ""
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onSummChange = this.onSummChange.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.summonerName);
  }

  onSummChange(e) {
    this.setState({ summonerName: e.target.value });
  }

  render() {
    return (
      <div>
        <form className="Search" onSubmit={this.onSubmit}>
          <input
            type="text"
            placeholder="Summoner Name..."
            autoComplete="off"
            value={this.state.summonerName}
            onChange={this.onSummChange}
          />
          <input type="submit" value="Search" />
        </form>
      </div>
    );
  }
}

Search.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default Search;
