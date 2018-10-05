import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Summoner from "./components/content/Summoner";
import Match from "./components/content/Match";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Summoner />
        <hr />
        <Match />
        <Footer />
      </div>
    );
  }
}

export default App;
