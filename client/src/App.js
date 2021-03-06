import React, { Component } from "react";
import Header from "./components/layout/Header";
import Summoner from "./components/content/Summoner";
import Search from "./components/content/Search";
import MatchLog from "./components/content/MatchLog";
import Navbar from "./components/layout/Navbar";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      summoner: null,
      matches: [],
      matchDetail: [],
      renderMatches: false,
      error: ""
    };
    this.getSummoner = this.getSummoner.bind(this);
    this.randomStartingSummoner = this.randomStartingSummoner.bind(this);
  }

  componentDidMount() {
    var chosenSummoner = this.randomStartingSummoner();
    this.getSummoner(chosenSummoner);
  }

  randomStartingSummoner() {
    var startingSummoners = [
      "asyc",
      "adrian riven",
      "Shiphtur",
      "Proto Kaisa",
      "Autolykus"
    ];

    var startingSummonerIndex = Math.floor(
      Math.random() * startingSummoners.length
    );
    console.log(startingSummoners[startingSummonerIndex]);
    return startingSummoners[startingSummonerIndex];
  }

  getSummoner(summName) {
    this.setState({
      spinner: true,
      summoner: null,
      matches: [],
      matchDetail: [],
      renderMatches: false,
      error: ""
    });

    //check for empty submission
    if (summName.trim().length) {
      // get summoner's name
      axios
        .get(`/api/summs/${summName}`, {
          timeout: 5000
        })
        .then(res => {
          this.setState({ summoner: res.data });
        })
        //get summoner's accountId
        .then(res => {
          axios
            .get(`/api/matches/log/${this.state.summoner.accountId}`, {
              timeout: 5000
            })
            .then(res => {
              this.setState({ matches: res.data.matches.slice(0, 20) });
            })
            //get summoner match history, iterate over it for individual match details
            .then(res => {
              this.state.matches.map((match, index) => {
                return axios
                  .get(`/api/matches/detail/` + match.gameId, {
                    timeout: 5000
                  })
                  .then(res => {
                    this.setState({
                      matchDetail: [...this.state.matchDetail, res.data],
                      spinner: false
                    });
                  });
              });
            })
            .then(res => {
              this.setState({
                renderMatches: true
              });
            })
            .catch(error => {
              this.setState({
                matches: [],
                error: `Summoner Matches:  Not found`,
                spinner: false
              });
            });
        })
        .catch(error => {
          this.setState({
            summoner: null,
            error: "Summoner Error: Not found",
            spinner: false
          });
        });
    } else {
      this.setState({ error: "Enter the name of a summoner" });
    }
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <div className="row">
            <div className="col-md-9" />
            <div className="col-md-3">
              <Search onSubmit={this.getSummoner} />
              {/* spinner displays if GET requests have fired & the spinner state is true */}
              {this.state.spinner ? (
                <img src={require("./img/spinner.gif")} alt="" />
              ) : null}
            </div>
            {this.state.error ? (
              <div>
                <h3>{this.state.error}</h3>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <Header />
        <Summoner summoner={this.state.summoner} />
        <hr />
        {/* If our match details have populated, render Matchlog */}
        {this.state.matchDetail.length ? (
          <MatchLog
            matchDetail={this.state.matchDetail}
            ourSummonerId={this.state.summoner}
          />
        ) : (
          <img src={require("./img/lol.jpg")} alt="" />
        )}
      </div>
    );
  }
}

export default App;
