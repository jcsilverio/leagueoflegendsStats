import React, { Component } from "react";

import PropTypes from "prop-types";
import Match from "./Match";
class MatchLog extends Component {
  render() {
    return (
      <div className="MatchLog">
        <p>Matches:</p>
        <ul>
          {this.props.matches.map((match, index) => {
            return <Match key={match.gameId} match={match} />;
          })}
        </ul>
      </div>
    );
  }
}

MatchLog.propTypes = {
  matches: PropTypes.array.isRequired
};

export default MatchLog;
