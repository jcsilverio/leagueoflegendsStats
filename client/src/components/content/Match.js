import React, { Component } from "react";
import PropTypes from "prop-types";

class Match extends Component {
  // gameId: this.props.key,
  // outcome: null,
  // duration: null,
  // victory: null,
  // kda: null,
  // creepSum: null,
  // creepPerMin: null,
  // championRunes: null,
  // summonerSpells: null,
  // summonerRunes: null,
  // itemsBought: null

  render() {
    return (
      <li>
        <div className="container">
          <div className="container">
            <div className="row">
              <div className="col-md-2">
                outcome/duration
                {this.props.match.gameId}
              </div>
              <div className="col-md-2">champion icon/champion name</div>
              <div className="col-md-2">champion runes</div>
              <div className="col-md-2">summoner spells</div>
              <div className="col-md-2">summoner runes</div>
              <div className="col-md-2">items bought</div>
            </div>

            <div className="row">
              <div className="col-md-2">victory/kda</div>
              <div className="col-md-2">creep total/creep score per minute</div>
              <div className="col-md-2" />
              <div className="col-md-2" />
              <div className="col-md-2" />
              <div className="col-md-2" />
            </div>
          </div>
          <hr />
        </div>
      </li>
    );
  }
}

Match.propTypes = {
  match: PropTypes.object.isRequired
};

export default Match;
