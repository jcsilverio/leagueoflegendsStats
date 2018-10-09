import React, { Component } from "react";
import PropTypes from "prop-types";

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
    console.log("this.props --->", this.props);
  }
  getOurPlayerIndex() {
    this.props.mDetail.participantIdentities.map((item, index) => {
      return item.player.summonerId === this.props.ourSummonerId.id
        ? (this.state.ourPlayerIndex = index)
        : null;
    });
    console.log(
      "<------------this.state.ourPlayerIndex",
      this.state.ourPlayerIndex
    );
  }

  render() {
    this.getOurPlayerIndex();
    return (
      <div>
        <div className="container">
          <div className="container">
            <div className="row">
              <div className="col-md-2 statHeader">
                outcome:{" "}
                {this.props.mDetail.participants[this.state.ourPlayerIndex]
                  .stats.win
                  ? "Win"
                  : "Loss"}
                {/* //set a state called ourplayerindex
               //search through participantIdentiies
               //if player.summonerId === summonerId from props (TODO pass in summonerId)
               //put that participant identities key number in ourplayerindex
                 //then look through participants at the [ourplayerindex] key
                  //read out stats.win to get true or false */}
                <p className="statResult" />
                <p className="statResult">
                  Date:
                  {new Date(this.props.mDetail.gameCreation).toLocaleString()}
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
  match: PropTypes.object.isRequired,
  ourSummonerID: PropTypes.any.isRequired
};
Match.defaultProps = {
  mDetail: {}
};

export default Match;
