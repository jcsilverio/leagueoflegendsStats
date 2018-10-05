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
        <div className="row">
          <div className="card card-body bg-light mb-3">
            <div className="row">
              <div className="col-md-4 d-none d-lg-block">
                <h4>List of Requirements</h4>
                <ul className="list-group">
                  <li className="list-group-item">
                    <i className="fa fa-check pr-1" />
                    Victory or Defeat
                  </li>
                  <li className="list-group-item">
                    <i className="fa fa-check pr-1" />
                    Game Length
                  </li>
                  <li className="list-group-item">
                    <i className="fa fa-check pr-1" />
                    Summoner Spells
                  </li>
                  <li className="list-group-item">
                    <i className="fa fa-check pr-1" />
                    Summoner Runes
                  </li>
                  <li className="list-group-item">
                    <i className="fa fa-check pr-1" />
                    Champion Name
                  </li>
                  <li className="list-group-item">
                    <i className="fa fa-check pr-1" />
                    KDA
                  </li>
                  <li className="list-group-item">
                    <i className="fa fa-check pr-1" />
                    Items bought during the match - dont need icons
                  </li>
                  <li className="list-group-item">
                    <i className="fa fa-check pr-1" />
                    Champion level in the match
                  </li>
                  <li className="list-group-item">
                    <i className="fa fa-check pr-1" />
                    Total creep score
                  </li>
                  <li className="list-group-item">
                    <i className="fa fa-check pr-1" />
                    Total creep score per minute (total creeps divided by game
                    length)
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Match;
