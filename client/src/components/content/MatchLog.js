import React, { Component } from "react";
import PropTypes from "prop-types";
import Match from "./Match";

class MatchLog extends Component {
  render() {
    return (
      <div className="MatchLog">
        <div className="row">
          <div className="col-md-2"> </div>
          <div className="col-md-2">
            <h4>Matches:</h4>
          </div>
          <div className="col-md-8"> </div>
        </div>

        <div>
          {this.props.matches.map((match, index) => {
            return <Match key={match.gameId} match={match} />;
          })}
        </div>
      </div>
    );
  }
}

MatchLog.propTypes = {
  matches: PropTypes.array.isRequired
};

export default MatchLog;
