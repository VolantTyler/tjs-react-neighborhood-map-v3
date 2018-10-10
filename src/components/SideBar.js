import React from 'react';
import List from './List'
import ErrorBoundary from './ErrorBoundary';

export default class SideBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
      venues: [],
    };
  }

    handleFilterVenues = () => {
        if (this.state.query.trim() !== "") {
            const venues = this.props.venues.filter(venue =>
                venue.name.toLowerCase().includes(this.state.query.toLowerCase())
                );
            if (venues.length === 0) {
                window.alert('No matches found');
                return venues;
            } else {
            return venues;
                }
        }
        return this.props.venues;
    }
  handleChange = e => {
    this.setState({query:e.target.value});
    const markers = this.props.venues.map(venue => {
        const isMatched = venue.name 
            .toLowerCase()
            .includes(e.target.value.toLowerCase());
        const marker = this.props.markers.find(marker => marker.id === venue.id);
        if (isMatched) {
            marker.isVisible = true;
        } else {
            marker.isVisible = false;
        }
        return marker;
    });
    this.props.updateSuperState({markers});
  };


  render() {

    return (
      <div className="sidebar">

        <input 
        id={'search-input'} 
        type={"search"} 
        placeholder='Search Here'
        onChange={this.handleChange}/>

        <ErrorBoundary>
            <List 
            {...this.props}
            venues={this.handleFilterVenues()}
            handleListItemClick = {this.props.handleListItemClick}
            />
        </ErrorBoundary>

      </div>
    );
  }
}