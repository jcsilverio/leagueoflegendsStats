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
    if (this.props.summ) {
      return (
        <div>
          <div className="container">
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
                <p>Placeholder info</p>
                <p>Placeholder info 2</p>
              </div>
              <div className="col-lg-3" />
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Summoner;
