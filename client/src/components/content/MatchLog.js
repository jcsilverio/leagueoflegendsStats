import React, { Component } from "react";
import PropTypes from "prop-types";
import Match from "./Match";

class MatchLog extends Component {
  constructor(props) {
    super(props);
  }
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
          {this.props.matchDetail.map((detail, index) => {
            return <Match key={detail.gameId} detail={detail} />;
          })}
        </div>
      </div>
    );
  }
}

MatchLog.propTypes = {
  matchDetail: PropTypes.any.isRequired
};

export default MatchLog;
