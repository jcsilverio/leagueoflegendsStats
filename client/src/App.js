import React, { Component } from "react";
import Navbar from "./components/layout/Navbar";
// import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Summoner from "./components/content/Summoner";
import Search from "./components/content/Search";
import MatchLog from "./components/content/MatchLog";

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      matches: [],
      id: "",
      profileIconId: "",
      summonerLevel: ""
    };
  }
  // TODO: error message function

  // onGetSummoner(summName) {
  //   this.setState({
  //     name: "",
  //     matches: [],
  //     id: "",
  //     profileIconId: "",
  //     summonerLevel: ""
  //   });
  // }
  getSummoner = summName => {
    console.log("Searching for Summoner: " + summName);
    fetch(`/api/summs/` + summName)
      .then(res => res.json())
      .then(res =>
        this.setState({
          name: res.name,
          id: res.id,
          profileIconId: res.profileIconId,
          summonerLevel: res.summonerLevel
        })
      )
      .catch(err => console.error(err));
  };

  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <div className="row">
            <div className="col-md-9" />
            <div className="col-md-3">
              <Search name={this.state.name} onSubmit={this.getSummoner} />
            </div>
          </div>
        </div>
        <Header />
        <Summoner name={this.state.name} />
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
