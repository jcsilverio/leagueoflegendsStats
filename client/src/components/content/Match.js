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
      <div>
        <div className="container">
          <div className="container">
            <div className="row">
              <div className="col-md-2 statHeader">
                outcome/duration
                <p className="statResult">
                  Test:
                  {this.props.match.gameId}
                </p>
              </div>
              <div className="col-md-2 statHeader">
                champion icon/champion name
              </div>
              <div className="col-md-2 statHeader">champion runes</div>
              <div className="col-md-2 statHeader">summoner spells</div>
              <div className="col-md-2 statHeader">summoner runes</div>
              <div className="col-md-2 statHeader">items bought</div>
            </div>

            <div className="row">
              <div className="col-md-2 statHeader">victory/kda</div>
              <div className="col-md-2 statHeader">
                creep total/creep score per minute
              </div>
              <div className="col-md-2" />
              <div className="col-md-2" />
              <div className="col-md-2" />
              <div className="col-md-2" />
            </div>
          </div>
          <hr />
        </div>
      </div>
    );
  }
}

Match.propTypes = {
  match: PropTypes.object.isRequired
};

export default Match;
