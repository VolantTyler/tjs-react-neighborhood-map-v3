import React from 'react'
import ListItem from './ListItem'

class List extends React.Component {
    constructor() {
        super();
        this.state = {
            venues: []
        }
    }



    render() {

      return (
            <div className='side-list' >
            {/* <div> */}

                <sub>map: <a href='https://google.com/maps/' target='_blank' rel='noopener noreferrer' tabIndex='-1'>Google</a> / </sub>
                <sub>data: <a href='https://foursquare.com/' target='_blank' rel='noopener noreferrer' tabIndex='-1'>Foursquare</a></sub>

                {this.props.venues && this.props.venues.map((venue, idx) => 
                <ListItem 
                    key={idx}
                    {...venue}
                    handleListItemClick={this.props.handleListItemClick}
                    toggleNavbar={this.props.toggleNavbar}
                />
                )}
            </div>
      )
    }
  }
  


export default List