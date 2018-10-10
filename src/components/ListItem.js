//resource: @Forrest https://www.youtube.com/watch?v=lDVaZY0aG2w&t=0s&list=PL4rQq4MQP1crXuPtruu_eijgOUUXhcUCP&index=7

import React, { Component } from 'react';

class ListItem extends Component {

    itemClick = (venue) => {
        console.log(venue)
    }

    render() {
        return (
            // <li 
            // className='list-item' 
            // onClick={() => this.itemClick(this.props.venue)}>
            //     {this.props.venue.name}
            // </li>
            //TODO: can add icon from this.props.categories[0].icon.prefix+"32"+this.props.categories[0].icon.suffix
            <div className='list-item' tabIndex='0' role='button' onClick={() => this.props.handleListItemClick(this.props)} onKeyPress={() => this.props.handleListItemClick(this.props)}>
              <h1>{this.props.name}</h1>
              <p>{this.props.location.address}
              <br></br>
              {this.props.location.city} {this.props.location.state}</p>
            </div>
        )
    }
}

export default ListItem