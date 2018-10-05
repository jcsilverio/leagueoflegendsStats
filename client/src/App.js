import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Summoner from "./components/content/Summoner";
import Search from "./components/content/Search";
import Match from "./components/content/Match";

class App extends Component {
  state = {
    name: "",
    matches: [],
    id: "",
    profileIconId: "",
    summonerLevel: ""
  };

  onGetSummoner(summName) {
    this.setState({
      name: "",
      matches: [],
      id: "",
      profileIconId: "",
      summonerLevel: ""
    });
  }
  getSummoner = _ => {
    fetch("/api/summs")
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
              <Search />
            </div>
          </div>
        </div>

        <Header />
        <Summoner />
        <hr />
        <Match />
        <Footer />
      </div>
    );
  }
}

export default App;
