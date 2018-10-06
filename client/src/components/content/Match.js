import React, { Component } from "react";

class Match extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameId: this.props.key,
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
  }
  // componentDidMount() {}

  render() {
    const summImage = `http://ddragon.leagueoflegends.com/cdn/6.24.1/img/profileicon/${
      this.state.profileIconId
    }.png`;
    return (
      <div className="container">
        <div className="container">
          <div className="row">
            <div className="col-md-2">
              outcome/duration
              {this.state.gameId}
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
    );
  }
}

export default Match;
