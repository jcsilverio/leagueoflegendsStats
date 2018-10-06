import React, { Component } from "react";
import PropTypes from "prop-types";

class Search extends Component {
  constructor() {
    super();

    this.state = {
      name: ""
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onSummNameChange = this.onSummNameChange.bind(this);
  }
  onSummNameChange(e) {
    this.setState({ name: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.name);
    this.setState({
      name: ""
    });
  }

  render() {
    return (
      <form className="Search" onSubmit={this.onSubmit}>
        <input
          type="text"
          placeholder="Summoner Name..."
          autoComplete="off"
          value={this.state.name}
          onChange={this.onSummNameChange}
        />
        <input type="submit" value="Search" />
      </form>
    );
  }
}

Search.propTypes = {
  name: PropTypes.string,
  onSubmit: PropTypes.func
};

Search.defaultProps = {
  name: "",
  onSubmit: () => {}
};

export default Search;
