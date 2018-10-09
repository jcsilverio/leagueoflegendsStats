import React, { Component } from "react";
import Navbar from "./components/layout/Navbar";
// import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Summoner from "./components/content/Summoner";
import Search from "./components/content/Search";
import MatchLog from "./components/content/MatchLog";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      summoner: null,
      matches: [],
      matchDetail: [],
      renderMatches: false,
      error: ""
    };
    this.getSummoner = this.getSummoner.bind(this);
  }

  getSummoner(summName) {
    this.setState({
      summoner: null,
      matches: [],
      matchDetail: [],
      renderMatches: false,
      error: ""
    });

    if (summName.trim().length) {
      axios
        .get(`/api/summs/${summName}`)
        .then(res => {
          this.setState({ summoner: res.data });
        })
        .then(res => {
          axios
            .get(`/api/matches/log/${this.state.summoner.accountId}`)
            .then(res => {
              this.setState({ matches: res.data.matches.slice(0, 10) });
            })
            .then(res => {
              this.state.matches.map((match, index) => {
                return axios
                  .get(`/api/matches/detail/` + match.gameId)
                  .then(res => {
                    this.setState({
                      matchDetail: [...this.state.matchDetail, res.data]
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
                error: `match error:  ${error}`
              });
            });
        })
        .catch(error => {
          this.setState({
            summoner: null,
            error: `summ error: ${error}`
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
