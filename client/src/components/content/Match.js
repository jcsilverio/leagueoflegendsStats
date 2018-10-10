import React, { Component } from "react";
import PropTypes from "prop-types";
var moment = require("moment");
const runeUrl = "https://ddragon.leagueoflegends.com/cdn/img/";
var details = null;

class Match extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ourPlayerIndex: null,
      matchDetail: {},
      championId: null
    };
    this.getOurPlayerIndex = this.getOurPlayerIndex.bind(this);
    this.getRunes = this.getRunes.bind(this);
    this.getRuneAltText = this.getRuneAltText.bind(this);
    this.getChampion = this.getChampion.bind(this);
  }

  componentWillMount() {
    this.getOurPlayerIndex();
  }

  componentDidMount() {
    this.getChampion(
      this.props.champions,
      this.props.mDetail.participants[this.state.ourPlayerIndex].championId
    );
  }
  getOurPlayerIndex() {
    this.props.mDetail.participantIdentities.map((item, index) => {
      return item.player.summonerId === this.props.ourSummonerId.id
        ? (this.state.ourPlayerIndex = index)
        : null;
    });
  }

  getRunes(runes, id) {
    if (runes) {
      const rune = runes.find(r => r.id === id);
      return `${runeUrl}${rune && rune.icon}`;
    } else {
      return "";
    }
  }

  getRuneAltText(runes, id) {
    if (runes) {
      const rune = runes.find(r => r.id === id);
      return `${rune.name}`;
    } else {
      return "";
    }
  }

  getChampion(champions, id) {
    if (champions) {
      for (let key in champions) {
        if (Number(champions[key].key) === id) {
          this.setState({ championId: champions[key] });
          // console.log("Champions[key] ---- >", champions[key]);
          // console.log("ChampionsId ---- >", this.state.championsId);
        }
      }
    } else {
      return null;
    }
  }

  render() {
    var details = this.props.mDetail.participants[this.state.ourPlayerIndex];
    return (
      <div>
        <div className="container">
          <div className="container">
            <div className="row">
              <div className="col-md-2 statHeader">
                Outcome:{" "}
                {details.stats.win ? (
                  <span className="win">Win</span>
                ) : (
                  <span className="loss">Loss</span>
                )}
                <p className="statResult" />
                <p className="statResult date">
                  {moment(new Date(this.props.mDetail.gameCreation)).format(
                    "MMM Do YYYY"
                  )}
                </p>
              </div>
              <div className="col-md-2 champName">
                {this.state.championId ? this.state.championId.name : null}
              </div>
              <div className="col-md-2 statHeader">
                Champion runes
                <br />
                <img
                  className="runeSize"
                  src={this.getRunes(
                    this.props.runes,
                    details.stats.perkPrimaryStyle
                  )}
                  alt={`${this.getRuneAltText(
                    this.props.runes,
                    details.stats.perkPrimaryStyle
                  )}`}
                />
                <img
                  className="runeSize"
                  src={this.getRunes(
                    this.props.runes,
                    details.stats.perkSubStyle
                  )}
                  alt={`${this.getRuneAltText(
                    this.props.runes,
                    details.stats.perkSubStyle
                  )}`}
                />
              </div>
              <div className="col-md-2 statHeader">Summoner spells</div>
              <div className="col-md-2 statHeader">Summoner runes</div>
              <div className="col-md-2 statHeader">Items bought</div>
            </div>

            <div className="row">
              <div className="col-md-2 statHeader">
                K / D / A
                <p className="statResult">
                  {details.stats.kills} /{" "}
                  <span className="red">{details.stats.deaths}</span> /{" "}
                  {details.stats.assists}
                </p>
                <div className="statHeader">
                  Game Length
                  <p className="statResult">
                    {moment("2015-01-01")
                      .startOf("day")
                      .seconds(this.props.mDetail.gameDuration)
                      .format("H:mm:ss")}
                  </p>
                </div>
              </div>

              <div className="col-md-2 statHeader">
                <div className="row">
                  <div className="col-sm-12 statHeader centerText">Creep</div>
                </div>

                <div className="row">
                  <div className="col-sm-6 statHeader">
                    <p className="statHeader scorePM">Score per Minute</p>
                  </div>

                  <div className="col-sm-6 statHeader">
                    <p className="statHeader scorePM">Total</p>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-6 statResult">
                    {(
                      (details.stats.totalMinionsKilled /
                        this.props.mDetail.gameDuration) *
                      60
                    ).toFixed(2)}
                  </div>

                  <div className="col-sm-6 statResult">
                    {details.stats.totalMinionsKilled}
                  </div>
                </div>
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
  mDetail: PropTypes.object.isRequired,
  ourSummonerId: PropTypes.any.isRequired,
  champions: PropTypes.any.isRequired
};

export default Match;
