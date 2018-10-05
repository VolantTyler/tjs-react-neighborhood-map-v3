import React, { Component } from 'react';
import './App.css';
import Map from "./components/Map";
import SquareAPI from "./API/";
import NavBar from "./components/NavBar"

class App extends Component {

  constructor() {
    super();
    this.state = {
      venues: [],
      markers: [],
      center: [],
      zoom: 12
    };
  }

  closeAllMarkers = () => {
    const markers = this.state.markers.map(marker => {
      marker.isOpen = false;
      return marker;
    })
    this.setState({markers: Object.assign(this.state.markers, markers)});
  }
  handleMarkerClick = marker => {
    this.closeAllMarkers();
    marker.isOpen = true;
    this.setState({markers: Object.assign(this.state.markers, marker)});
    const venue = this.state.venues.find(venue => venue.id === marker.id);
    
    SquareAPI.getVenueDetails(marker.id)
      .then(res => {
        const newVenue = Object.assign(venue, res.response.venue);
        this.setState({ venues: Object.assign(this.state.venues, newVenue)});
        console.log(newVenue);
      });
  };

  componentDidMount() {
    SquareAPI.search({
      near: "Ridgewood, NJ",
      query: "burger",
      limit: 20,
      // intent: "browse",
      // radius: 250
    })
    .then(results => {
      const {venues} = results.response;
      const {center} = results.response.geocode.feature.geometry;
      const markers = venues.map(venue => {
        return {
          lat: venue.location.lat,
          lng: venue.location.lng,
          isOpen: false,
          isVisible: true,
          id: venue.id
        };
      });
      this.setState({ venues, center, markers });
      // console.log(results);
    });
  }

  render() {

    const style = {
      //width: '100vw',
      height: '100vh',
      top: '60px'
    }

    return (
      <div className="App">
        <NavBar {...this.state} />
        <Map 
          style={style}
          {...this.state}
          handleMarkerClick = {this.handleMarkerClick}
        />
      </div>
    );
  }
}

export default App;
