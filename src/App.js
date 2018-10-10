import React, { Component } from 'react';
import './App.css';
import Map from "./components/Map";
import SquareAPI from "./API/";
import NavBar from "./components/NavBar"
import SideBar from "./components/SideBar"
import ErrorBoundary from "./components/ErrorBoundary"

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      venues: [],
      markers: [],
      collapsed: true,
      error: '',
      errorInfo: '',
      center: {lat: 40.979670, lng: -74.119180},
      zoom: 12,
      updateSuperState: obj => {
        this.setState(obj);
      }
    };
  }

  toggleNavbar = () => {
    this.setState({
      collapsed: !this.state.collapsed
      //TODO: when list item is clicked, invoke this to close navbar
    });
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
        // console.log(newVenue);
      })
      .catch(er => {
        this.setState({errorInfo: er, error: 'Failed to get Foursquare details for info-window'});
        console.log(er);
      });
  };

  // handleListItemClick = listItem => {
  //   const marker = this.state.markers.find(marker => marker.id === listItem.id);
  //   this.handleMarkerClick(marker);
  // }

  handleListItemClick = listItem => {
    const marker = this.state.markers.find(marker => marker.id === listItem.id);
    this.handleMarkerClick(marker);
    this.toggleNavbar();
  }

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
    })
    .catch(er => {
      this.setState({errorInfo: er, error: 'Failed to get Google Maps data'});
      console.log(er)
    });
  }

  render() {

    const style = {
      //width: '100vw',
      height: '100vh',
      // top: '60px'
    }

    return (
      <div className="App">
        <NavBar 
          {...this.state}
          handleListItemClick={this.handleListItemClick}
          toggleNavbar={this.toggleNavbar}
           />
        <SideBar 
          {...this.state}
          handleListItemClick={this.handleListItemClick}          
        />
        <ErrorBoundary {...this.state}>
        <Map 
          style={style}
          {...this.state}
          handleMarkerClick = {this.handleMarkerClick}
        />
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
