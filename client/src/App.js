import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Stats from "./components/content/Summoner";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Stats />
        <Footer />
      </div>
    );
  }
}

export default App;
