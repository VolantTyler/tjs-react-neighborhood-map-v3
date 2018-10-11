import React from 'react'
import ListItem from './ListItem'

class List extends React.Component {
    constructor() {
        super();
        this.state = {
            // TODO: no query needed?
            query: '',
            venues: []
        }
    }



    render() {
        // const style = {
        //     width: '20vw',
        //     height: '100vh'
        //   }


      return (
            <div className='side-list' >
                <sub>map: <a href='https://google.com/maps/' target='_blank' rel='noopener noreferrer' tabIndex='-1'>Google </a></sub>
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