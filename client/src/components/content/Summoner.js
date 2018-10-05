import React, { Component } from "react";
import PropTypes from "prop-types";
import Match from "./Match";

class Summoner extends Component {
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
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Summoner Stats</h1>
              <p className="lead text-center">
                League of Legends Stats Viewing App
              </p>
            </div>
            <div className="row">
              <div className="col-lg-3" />
              <div className="col-lg-3">
                <img
                  className="rounded-circle img-thumbnail summ-thumbnail float-right"
                  src={summImage}
                  alt="summoner profile pic"
                />
              </div>
              <div className="col-lg-3">
                <h3>{this.state.name}</h3>
                <p>Id: {this.state.id}</p>
                <p>profileid: {this.state.profileIconId}</p>
                <a href="profile.html" className="btn btn-info">
                  View Profile
                </a>
              </div>
              <div className="col-lg-3" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Summoner;
