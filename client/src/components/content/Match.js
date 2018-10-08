import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";

class Match extends Component {
  // gameId: this.props.key,
  // outcome: null,
  // duration: null,
  // victory: null,
  // kda: null,
  // creepSum: null,
  // creepPerMin: null,
  // championRunes: null,
  // summonerSpells: null,
  // summonerRunes: null,
  // itemsBought: null

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
  }

  componentDidMount() {
    console.log("this.props.key --->", this.props.match.gameId);
    this.getMatchDetail(this.props.match.gameId);
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

    axios
      .get(`/api/matches/detail/${this.props.match.gameId}`)
      .then(res => {
        self.setState({ matchDetail: res });
      })
      .catch(error => {
        self.setState({});
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
                  Test:
                  {this.state.matchDetail
                    ? this.state.matchDetail.data.gameType
                    : "matchDetail undefined"}
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

export default Match;
