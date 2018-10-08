import React, { Component } from 'react'
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
        const style = {
            width: '20vw',
            height: '100vh'
          }


      return (
            <div className='side-list' >
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