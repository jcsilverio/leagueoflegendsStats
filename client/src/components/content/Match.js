import React, { Component } from "react";
import PropTypes from "prop-types";

class Match extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    this.getMatchDetail = this.getMatchDetail.bind(this);
    console.log("this.props --->", this.props);
  }

  componentDidMount() {
    const match = this.props.mDetail || {};
    this.getMatchDetail(match.gameId);
  }

  getMatchDetail(matchID) {
    const self = this;
    self.setState({
      matchDetail: null,
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
    });
  }

  render() {
    console.log("this.state.matchDetail", this.state.matchDetail);
    return (
      <div>
        <div className="container">
          <div className="container">
            <div className="row">
              <div className="col-md-2 statHeader">
                outcome/duration
                <p className="statResult">
                  TBD
                  {this.props.mDetail.gameType}
                </p>
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
  match: PropTypes.object.isRequired
};
Match.defaultProps = {
  mDetail: {}
};

export default Match;
