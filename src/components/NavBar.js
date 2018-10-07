import React from 'react';
import List from './List'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
      query: '',
      venues: []
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
      //TODO: close the list on escape
      //TODO: when list item is clicked, invoke this to close navbar
    });
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
    return (
      <div>
        <Navbar color="faded" light fixed='top'>
          <NavbarBrand href="/" className="mr-auto">Neighborhood Map</NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse isOpen={!this.state.collapsed} navbar>
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
                    />
                </NavItem>

              <NavItem>
                <NavLink href="/components/">Components</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}