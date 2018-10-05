import React, { Component } from 'react'
import ListItem from './ListItem'

class List extends React.Component {
    render() {
        const style = {
            width: '20vw',
            height: '100vh'
          }


      return (
            <div className='side-list' >
                <input id='search-input' placeholder='Search Here'></input>
                <ListItem />
            </div>
      )
    }
  }
  


export default List