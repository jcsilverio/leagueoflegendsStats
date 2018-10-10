import React, { Component } from "react";
import PropTypes from "prop-types";
import Match from "./Match";
import axios from "axios";
const dataDragonUrl = "https://ddragon.leagueoflegends.com/cdn/8.19.1/";

class MatchLog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      champions: null,
      summonerSpells: null,
      runes: null
    };
    this.getChampions = this.getChampions.bind(this);
    this.getSummonerRunes = this.getSummonerRunes.bind(this);
    this.getSummonerSpells = this.getSummonerSpells.bind(this);
  }

  componentDidMount() {
    this.getChampions();
    this.getSummonerRunes();
    this.getSummonerSpells();
  }

  // switching to async/await for more clarity
  async getChampions() {
    const response = await axios.get(
      `${dataDragonUrl}data/en_US/champion.json`
    );
    const { data } = await response;
    this.setState({ champions: data.data });
  }

  async getSummonerSpells() {
    const response = await fetch(`${dataDragonUrl}data/en_US/summoner.json`);
    const { data } = await response.json();
    this.setState({ summonerSpells: data });
  }

  async getSummonerRunes() {
    const response = await fetch(
      `${dataDragonUrl}data/en_US/runesReforged.json`
    );
    const data = await response.json();
    this.setState({ runes: data });
  }

  render() {
    // console.log("this.state.champions", this.state.champions);
    return (
      <div className="MatchLog">
        <div className="row">
          <div className="col-md-2"> </div>
          <div className="col-md-2">
            <h4>Matches:</h4>
          </div>
          <div className="col-md-8"> </div>
        </div>

        <div>
          {this.state.champions
            ? (this.props.matchDetail || []).map((mDetail, index) => {
                return (
                  <Match
                    key={mDetail.gameId}
                    mDetail={mDetail}
                    ourSummonerId={this.props.ourSummonerId}
                    runes={this.state.runes}
                    champions={this.state.champions}
                  />
                );
              })
            : null}
        </div>
      </div>
    );
  }
}

MatchLog.propTypes = {
  matchDetail: PropTypes.array.isRequired,
  ourSummonerId: PropTypes.any.isRequired
};

export default MatchLog;
