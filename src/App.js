//resource: gm_authFailure implementation https://github.com/zaynaib/map/blob/master/src/App.js

import React, { Component } from 'react';
import './App.css';
import Map from "./components/Map";
import SquareAPI from "./API/";
import NavBar from "./components/NavBar"
import SideBar from "./components/SideBar"

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
      //Below is a method for child components to update the state of App.js
      updateSuperState: obj => {
        this.setState(obj);
      }
    };
  }

  toggleNavbar = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  closeAllMarkers = () => {
    const markers = this.state.markers.map(marker => {
      marker.isOpen = false;
      return marker;
    })
    this.setState({markers: Object.assign(this.state.markers, markers)});
  }
  //When marker is clicked, open info window
  handleMarkerClick = marker => {
    this.closeAllMarkers();
    marker.isOpen = true;
    this.setState({markers: Object.assign(this.state.markers, marker)});
    const venue = this.state.venues.find(venue => venue.id === marker.id);
    
    SquareAPI.getVenueDetails(marker.id)
      // .then(res => {
      //   if(res.ok){
      //     return res;
      //     }else {
      //     return Promise.reject(new Error('Foursquare daily quota reached. Try again tomorrow'));
      //   }})
        .then(res => {
        const newVenue = Object.assign(venue, res.response.venue);
        this.setState({ venues: Object.assign(this.state.venues, newVenue)});
      })
      .catch(er => {
        this.setState({errorInfo: er, error: 'Failed to get Foursquare details for info-window'});
        console.log(er);
      });
  };

  handleListItemClick = listItem => {
    const marker = this.state.markers.find(marker => marker.id === listItem.id);
    this.handleMarkerClick(marker);
    //On mobile, clicking a list item collapses the dynamic navbar
    this.toggleNavbar();
  }

  componentDidMount() {
    //Google error handling
    window.gm_authFailure = this.gm_authFailure;

    SquareAPI.search({
      near: "Ridgewood, NJ",
      query: "burger",
      limit: 10,
      radius: 5000
    })
    .then(results => {
      const {venues} = results.response;
      const {center} = results.response.geocode.feature.geometry;
      const markers = venues.map(venue => {
        return {
          lat: venue.location.lat,
          lng: venue.location.lng,
          title: venue.name,
          isOpen: false,
          isVisible: true,
          id: venue.id
        };
      });
      this.setState({ venues, center, markers });
    })
    .catch(er => {
      this.setState({errorInfo: er, error: 'Failed to get Google Maps data'});
      console.log(er)
    });
  }

  gm_authFailure(){
    window.alert("Google Maps error!")
  }



  render() {

    const style = {
      height: '100vh',
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
