import React, { Component } from "react";

class Match extends Component {
  state = {
    name: "",
    id: "",
    profileIconId: "",
    summonerLevel: ""
  };

  componentDidMount() {
    this.getSummoner();
  }

  getSummoner = _ => {
    fetch("/api/summs")
      .then(res => res.json())
      .then(res =>
        this.setState({
          name: res.name,
          id: res.id,
          profileIconId: res.profileIconId,
          summonerLevel: res.summonerLevel
        })
      )
      .catch(err => console.error(err));
  };

  render() {
    const summImage = `http://ddragon.leagueoflegends.com/cdn/6.24.1/img/profileicon/${
      this.state.profileIconId
    }.png`;
    return (
      <div className="container">
        <div className="container">
          <div className="row">
            <div className="col-md-2">outcome / duration</div>
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
      </div>
    );
  }
}

export default Match;
