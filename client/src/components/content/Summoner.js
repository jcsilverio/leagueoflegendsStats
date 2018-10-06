import React, { Component } from "react";
import PropTypes from "prop-types";

class Summoner extends Component {
  render() {
    if (this.props.summoner) {
      const summImage = `http://ddragon.leagueoflegends.com/cdn/8.18.1/img/profileicon/${
        this.props.summoner.profileIconId
      }.png`;

      return (
        <div>
          <div className="container">
            <div className="row">
              <div className="col-lg-3" />
              <div className="col-lg-3">
                <img
                  className="rounded-circle img-thumbnail summ-thumbnail float-right"
                  src={summImage}
                  alt=""
                />
              </div>
              <div className="col-lg-3">
                <h3>{this.props.summoner.name}</h3>
                <p>Level {this.props.summoner.summonerLevel}</p>
              </div>
              <div className="col-lg-3" />
            </div>
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

Summoner.propTypes = {
  summoner: PropTypes.object
};

export default Summoner;
