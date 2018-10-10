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
  }

  componentDidMount() {
    this.getChampions();
  }

  // switching to async/await for more clarity
  async getChampions() {
    const response = await axios.get(
      `${dataDragonUrl}data/en_US/champion.json`
    );
    const { data } = await response;
    this.setState({ champions: data.data });
  }

  render() {
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
          {(this.props.matchDetail || []).map((mDetail, index) => {
            return (
              <Match
                key={mDetail.gameId}
                mDetail={mDetail}
                ourSummonerId={this.props.ourSummonerId}
              />
            );
          })}
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
