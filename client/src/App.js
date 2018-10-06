import React, { Component } from "react";
import Navbar from "./components/layout/Navbar";
// import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
// import Summoner from "./components/content/Summoner";
import Search from "./components/content/Search";
import MatchLog from "./components/content/MatchLog";

class App extends Component {
  constructor() {
    super();
    this.state = {
      summonerQueried: false,
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
          summonerQueried: true,
          name: res.name,
          id: res.id,
          profileIconId: res.profileIconId,
          summonerLevel: res.summonerLevel
        })
      )
      .catch(err => console.error(err));
  };

  render() {
    const summImage = `http://ddragon.leagueoflegends.com/cdn/6.24.1/img/profileicon/${
      this.state.profileIconId
    }.png`;
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
        {this.state.summonerQueried ? (
          <div>
            <div className="container">
              <div className="row">
                <div className="col-lg-3" />
                <div className="col-lg-3">
                  <img
                    className="rounded-circle img-thumbnail summ-thumbnail float-right"
                    src={summImage}
                    alt="summoner profile pic"
                  />
                </div>
                <div className="col-lg-3">
                  <h3>{this.state.name}</h3>
                  <p>Placeholder info</p>
                  <p>Placeholder info 2</p>
                </div>
                <div className="col-lg-3" />
              </div>
            </div>
          </div>
        ) : null}

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
