import React, { Component } from 'react';
import './App.css';
import Map from "./components/Map";
import SquareAPI from "./API/";

class App extends Component {

  componentDidMount() {
    SquareAPI.search({
      near: "Ridgewood, NJ",
      query: "burgers",
      limit: 10
    })
    .then(results => console.log(results));
  }

  render() {
    return (
      <div className="App">
        <Map />
      </div>
    );
  }
}

export default App;
