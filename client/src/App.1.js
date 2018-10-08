import React, { Component } from "react";
import Navbar from "./components/layout/Navbar";
// import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Summoner from "./components/content/Summoner";
import Search from "./components/content/Search";
import MatchLog from "./components/content/MatchLog";
import axios from "axios";
const rp = require("request-promise");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      summoner: null,
      matches: [],
      error: ""
    };
    this.getSummoner = this.getSummoner.bind(this);
  }
  getSummoner(summName) {
    const self = this;
    self.setState({
      summoner: null,
      matches: [],
      error: ""
    });

    // TODO: error message functionality
    var doItAll = async () => {
      if (summName.trim().length) {
        axios
          .get(`/api/summs/${summName}`)
          .then(res => {
            self.setState({ summoner: res.data });
          })
          .then(res => {
            axios
              .get(`/api/matches/log/${self.state.summoner.accountId}`)
              .then(res => {
                self.setState({ matches: res.data.matches });
              })
              .catch(error => {
                self.setState({
                  matches: [],
                  error: `match error:  ${error}`
                });
              });
          })
          .catch(error => {
            self.setState({
              summoner: null,
              error: `summ error: ${error}`
            });
          });
      } else {
        self.setState({ error: "Enter the name of a summoner" });
      }

      // console.log("Searching for Summoner: " + summName);
      // fetch(`/api/summs/` + summName)
      //   .then(res => res.json())
      //   .then(res =>
      //     this.setState({
      //       summonerQueried: true,
      //       name: res.name,
      //       id: res.id,
      //       accountID: res.accountID,
      //       profileIconId: res.profileIconId,
      //       summonerLevel: res.summonerLevel
      //     })
      //   )
      //   .catch(err => console.error(err));
    };

    doItAll().then(() => console.log("<---------Done!--------------------->"));
  }
  render() {
    const summImage = `http://ddragon.leagueoflegends.com/cdn/8.18.1/img/profileicon/${
      this.state.profileIconId
    }.png`;
    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <div className="row">
            <div className="col-md-9" />
            <div className="col-md-3">
              <Search onSubmit={this.getSummoner} />
            </div>
            {this.state.error.length ? (
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

        {this.state.matches.length ? (
          <MatchLog matches={this.state.matches} />
        ) : (
          <img src={require("./img/lol.jpg")} />
        )}
      </div>
    );
  }
}

export default App;
