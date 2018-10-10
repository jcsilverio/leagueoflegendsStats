import React, { Component } from "react";
import PropTypes from "prop-types";
var moment = require("moment");
const runeUrl = "https://ddragon.leagueoflegends.com/cdn/img/";
const dDragonUrl = "https://ddragon.leagueoflegends.com/cdn/8.19.1/";

class Match extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ourPlayerIndex: null,
      matchDetail: {},
      championId: null,
      summonerSpell_01: null,
      summonerSpell_02: null,
      itemsBoughtResult: null
    };
    this.getOurPlayerIndex = this.getOurPlayerIndex.bind(this);
    this.getRunes = this.getRunes.bind(this);
    this.getRuneAltText = this.getRuneAltText.bind(this);
    this.getChampion = this.getChampion.bind(this);
    this.getSpell1 = this.getSpell1.bind(this);
    this.getSpell2 = this.getSpell2.bind(this);
    this.showItemsBought = this.showItemsBought.bind(this);
  }

  componentWillMount() {
    this.getOurPlayerIndex();
  }

  componentDidMount() {
    this.getChampion(
      this.props.champions,
      this.props.mDetail.participants[this.state.ourPlayerIndex].championId
    );

    this.getSpell1(
      this.props.summonerSpells,
      this.props.mDetail.participants[this.state.ourPlayerIndex].spell1Id
    );

    this.getSpell2(
      this.props.summonerSpells,
      this.props.mDetail.participants[this.state.ourPlayerIndex].spell2Id
    );
  } //end ComponentDidMount

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

  getSpell1(summonerSpells, id) {
    if (summonerSpells) {
      for (let key in summonerSpells) {
        if (Number(summonerSpells[key].key) === id) {
          this.setState({ summonerSpell_01: summonerSpells[key] });
        }
      }
    } else {
      return "";
    }
  }
  getSpell2(summonerSpells, id) {
    if (summonerSpells) {
      for (let key in summonerSpells) {
        if (Number(summonerSpells[key].key) === id) {
          this.setState({ summonerSpell_02: summonerSpells[key] });
        }
      }
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
        }
      }
    } else {
      return null;
    }
  }

  showItemsBought(items, dragonUrl) {
    console.log("ITEMS: ", items);
    return items.map((item, index) => {
      this.setState({
        itemsBoughtResult: `<img key={${index} width="40" height="40" src="{${dragonUrl}img/item/${item}.png"}/>`
      });
    });
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
              <div className="col-md-2">
                <span className="champName">
                  {this.state.championId ? this.state.championId.name : null}
                </span>
                <br />
                <span>Level: {details.stats.champLevel}</span>
              </div>
              <div className="col-md-2 statHeader">
                Runes
                <br />
                <img
                  className="imageSize"
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
                  className="imageSize"
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
              <div className="col-md-2 statHeader imageSize">
                Summoner spells
                <div className="row">
                  <div className="col-sm-6">
                    <img
                      className="rounded-circle img-thumbnail"
                      src={
                        this.state.summonerSpell_01
                          ? `${dDragonUrl}img/spell/${
                              this.state.summonerSpell_01.id
                            }.png`
                          : null
                      }
                      alt=""
                    />
                  </div>
                  <div className="col-sm-6">
                    <img
                      className="rounded-circle img-thumbnail"
                      src={
                        this.state.summonerSpell_02
                          ? `${dDragonUrl}img/spell/${
                              this.state.summonerSpell_02.id
                            }.png`
                          : null
                      }
                      alt=""
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-4 statHeader">
                Items bought
                <div>
                  {details.stats.item0 === 0 ? null : (
                    <img
                      className="rounded-circle img-thumbnail imageSize"
                      src={`${dDragonUrl}img/item/${details.stats.item0}.png`}
                    />
                  )}

                  {details.stats.item1 === 0 ? null : (
                    <img
                      className="rounded-circle img-thumbnail imageSize"
                      src={`${dDragonUrl}img/item/${details.stats.item1}.png`}
                    />
                  )}

                  {details.stats.item2 === 0 ? null : (
                    <img
                      className="rounded-circle img-thumbnail imageSize"
                      src={`${dDragonUrl}img/item/${details.stats.item2}.png`}
                    />
                  )}

                  {details.stats.item3 === 0 ? null : (
                    <img
                      className="rounded-circle img-thumbnail imageSize"
                      src={`${dDragonUrl}img/item/${details.stats.item3}.png`}
                    />
                  )}

                  {details.stats.item4 === 0 ? null : (
                    <img
                      className="rounded-circle img-thumbnail imageSize"
                      src={`${dDragonUrl}img/item/${details.stats.item4}.png`}
                    />
                  )}

                  {details.stats.item5 === 0 ? null : (
                    <img
                      className="rounded-circle img-thumbnail imageSize"
                      src={`${dDragonUrl}img/item/${details.stats.item5}.png`}
                    />
                  )}

                  {details.stats.item06 === 0 ? null : (
                    <img
                      className="rounded-circle img-thumbnail imageSize"
                      src={`${dDragonUrl}img/item/${details.stats.item6}.png`}
                    />
                  )}
                </div>
              </div>
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
                  <div className="col-sm-12 statHeader">
                    Creep
                    <hr />
                  </div>
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
  champions: PropTypes.any.isRequired,
  summonerSpells: PropTypes.any.isRequired
};

export default Match;
