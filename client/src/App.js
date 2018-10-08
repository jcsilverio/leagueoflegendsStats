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
    this.getMatchDetail = this.getMatchDetail.bind(this);
  }

  getMatchDetail() {
    //for every match in all matches
    //run a get request
    //place details object in array in state.matchDetail

    this.state.matches.map((match, index) => {
      return axios.get(`/api/matches/detail/` + match.gameId).then(res => {
        // this.setState({ matchDetail: [...this.state.matchDetail, res] });
        this.setState({ matchDetail: res.data });

        console.log("<-------matchDetail", this.state.matchDetail);
      });
    });
  }

  getSummoner(summName) {
    this.setState({
      summoner: null,
      matches: [],
      error: ""
    });

    // TODO: error message functionality

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
              this.setState({ matches: res.data.matches });
            })
            .then(res => {
              this.getMatchDetail();
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

        {this.state.renderMatches ? (
          <MatchLog matchDetails={this.state.matchDetail} />
        ) : (
          <img src={require("./img/stats.jpg")} alt="" />
        )}
      </div>
    );
  }
}

export default App;
