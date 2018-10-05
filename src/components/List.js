import React, { Component } from 'react'
import ListItem from './ListItem'

class List extends React.Component {
    constructor() {
        super();
        this.state = {
            query: '',
            venues: []
        }
    }

    handleFilterVenues = () => {
        if (this.state.query.trim() !== "") {
            const venues = this.props.venues.filter(venue =>
                venue.name.toLowerCase().includes(this.state.query.toLowerCase())
                );
            return venues;
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
        const style = {
            width: '20vw',
            height: '100vh'
          }


      return (
            <div className='side-list' >
                <input 
                    id={'search-input'} 
                    type={"search"} 
                    placeholder='Search Here'
                    onChange={this.handleChange}/>
                {this.props.venues && this.props.venues.map((venue, idx) => 
                <ListItem 
                    key={idx}
                    {...venue}
                    handleListItemClick={this.props.handleListItemClick}
                />
                )}
            </div>
      )
    }
  }
  


export default List