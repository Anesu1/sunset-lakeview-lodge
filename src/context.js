import React, { Component } from 'react'
import items from './data'

const RoomContext = React.createContext();

// <RoomContext.Provider value={}

class RoomProvider extends Component {
    state = {
     rooms:[],
     featuredRooms:[],
     loading:true,
     slug:'' 
    }

    //getData
    componentDidMount(){
      let rooms = this.formatData(items)
      let featuredRooms = rooms.filter(room => room.featured)
      this.setState({
        rooms, featuredRooms, sortedRooms:rooms, loading:false,slug:''
      })
    }


    formatData(items){
      let tempItems = items.map((item) =>{
        let id = item.sys.id
        let images = item.fields.images.map((image) => image.fields.file.url)
     
        let room = {...item.fields, images, id}
        return room;
      })
      return tempItems
    }
    setRoom = (slug) => {
      this.setState({
        ...this.state,
        slug:slug,
      })
      
      
      
    }
    getRoom = (slug) => {
     
      let tempRooms = [...this.state.rooms];
      const room = tempRooms.find((room) => room.slug === slug)
      return room;
    }


  render() {
    return (
      <RoomContext.Provider value={{...this.state, getRoom: this.getRoom, setRoom: this.setRoom}}>
          {this.props.children}
      </RoomContext.Provider>
    )
  }
}

const RoomConsumer = RoomContext.Consumer;

export {RoomProvider, RoomConsumer, RoomContext}