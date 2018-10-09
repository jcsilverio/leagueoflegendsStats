import React, { Component } from "react";
import PropTypes from "prop-types";
import Match from "./Match";

class MatchLog extends Component {
  constructor(props) {
    super(props);
    console.log("<-----MatchLog props", props.data); //empty array
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
          {(this.props.matchDetails || []).map((mDetail, index) => {
            return (
              <Match
                key={mDetail.gameId}
                mDetail={mDetail}
                ourSummonerId={this.props.ourSummonerId}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

MatchLog.propTypes = {
  matchDetail: PropTypes.array.isRequired,
  ourSummonerId: PropTypes.any.isRequired
};

export default MatchLog;
