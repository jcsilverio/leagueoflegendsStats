import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    name: "",
    id: "",
    profileIconId: "",
    summonerLevel: ""
  };

  componentDidMount() {
    this.getSummoner();
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
    const summImage = `http://ddragon.leagueoflegends.com/cdn/6.24.1/img/profileicon/${
      this.state.profileIconId
    }.png`;
    return (
      <div className="App">
        <h1>Summoner Data</h1>
        <ul>
          <li>{this.state.name}</li>
          <li>Id: {this.state.id}</li>
          <li> profileid: {this.state.profileIconId}</li>
          <li>
            <img src={summImage} />
          </li>

          <li>Summoner level: {this.state.summonerLevel}</li>
        </ul>
      </div>
    );
  }
}

export default App;
