import React, { Component } from "react";
import PropTypes from "prop-types";
var moment = require("moment");

class Match extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ourPlayerIndex: null,
      matchDetail: {},
      outcome: null,
      duration: null,
      victory: null,
      kda: null,
      creepSum: null,
      creepPerMin: null,
      championRunes: null,
      summonerSpells: null,
      summonerRunes: null,
      itemsBought: null
    };
    this.getOurPlayerIndex = this.getOurPlayerIndex.bind(this);
  }
  getOurPlayerIndex() {
    this.props.mDetail.participantIdentities.map((item, index) => {
      return item.player.summonerId === this.props.ourSummonerId.id
        ? (this.state.ourPlayerIndex = index)
        : null;
    });
  }

  render() {
    this.getOurPlayerIndex();
    const details = this.props.mDetail.participants[this.state.ourPlayerIndex];
    return (
      <div>
        <div className="container">
          <div className="container">
            <div className="row">
              <div className="col-md-2 statHeader">
                Outcome:{" "}
                {details.stats.win ? (
                  <span className="win">Win</span>
                ) : (
                  <span className="loss">Loss</span>
                )}
                <p className="statResult" />
                <p className="statResult date">
                  {moment(new Date(this.props.mDetail.gameCreation)).format(
                    "MMM Do YYYY"
                  )}
                </p>
              </div>
              <div className="col-md-2 statHeader">
                Champion Icon/Champion Name
              </div>
              <div className="col-md-2 statHeader">Champion runes</div>
              <div className="col-md-2 statHeader">Summoner spells</div>
              <div className="col-md-2 statHeader">Summoner runes</div>
              <div className="col-md-2 statHeader">Items bought</div>
            </div>

            <div className="row">
              <div className="col-md-2 statHeader">
                K / D / A
                <p className="statResult">
                  {details.stats.kills} /{" "}
                  <span className="red">{details.stats.deaths}</span> /{" "}
                  {details.stats.assists}
                </p>
                <div className="statHeader">
                  Game Length
                  <p className="statResult">
                    {moment("2015-01-01")
                      .startOf("day")
                      .seconds(this.props.mDetail.gameDuration)
                      .format("H:mm:ss")}
                  </p>
                </div>
              </div>

              <div className="col-md-2 statHeader">
                <div className="row">
                  <div className="col-sm-12 statHeader centerText">Creep</div>
                </div>

                <div className="row">
                  <div className="col-sm-6 statHeader">
                    <p className="statHeader scorePM">Score per Minute</p>
                  </div>

                  <div className="col-sm-6 statHeader">
                    <p className="statHeader scorePM">Total</p>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-6 statResult">
                    {(
                      (details.stats.totalMinionsKilled /
                        this.props.mDetail.gameDuration) *
                      60
                    ).toFixed(2)}
                  </div>

                  <div className="col-sm-6 statResult">
                    {details.stats.totalMinionsKilled}
                  </div>
                </div>
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
  mDetail: PropTypes.object.isRequired,
  ourSummonerId: PropTypes.any.isRequired
};

export default Match;
