import React from 'react';
import List from './List'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem } from 'reactstrap';

//TODO: why is this named Example? change to NavBar, test impact
export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
      venues: []
    };
  }

    handleFilterVenues = () => {
        //If search field is not blank, check query against venue list
        if (this.state.query.trim() !== "") {
            const venues = this.props.venues.filter(venue =>
                venue.name.toLowerCase().includes(this.state.query.toLowerCase())
                );
            //If no venues math search query, notify user
            if (venues.length === 0) {
                window.alert('No matches found');
                return venues;
            } else {
            return venues;
                }
        }
        //If search field IS blank, show all venues, default state
        return this.props.venues;
    }
    //Search field also updates markers on map
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
      <div>
        <Navbar color="faded" light fixed='top'>
          <NavbarBrand href="/" className="mr-auto">Burgers of Bergen County</NavbarBrand>
          <NavbarToggler onClick={this.props.toggleNavbar} className="mr-2" />
          <Collapse isOpen={!this.props.collapsed} navbar>
            <Nav navbar>
                <NavItem>
                    <input 
                    id={'search-input'} 
                    type={"search"} 
                    placeholder='Search Here'
                    onChange={this.handleChange}/>
                </NavItem>

                <NavItem>
                    <List 
                    {...this.props}
                    venues={this.handleFilterVenues()}
                    handleListItemClick = {this.props.handleListItemClick}
                    toggleNavbar = {this.props.toggleNavbar}
                    />
                </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}