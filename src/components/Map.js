import React, {Component} from "react";
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import ErrorBoundary from "./ErrorBoundary";

const MyMapComponent = withScriptjs(withGoogleMap(props =>(
  <GoogleMap
    defaultZoom={11}
    zoom={props.zoom}
    defaultCenter={{ lat: 40.979670, lng: -74.119180 }}
    center={props.center}
  >
    {props.markers && 
        props.markers
            .filter(marker => marker.isVisible)
            .map((marker, idx, arr) => {
                const venueInfo = props.venues.find(venue => venue.id === marker.id);
                return (
                    <Marker 
                        key={idx}
                        position={{ lat: marker.lat, lng: marker.lng }} 
                        onClick={() => props.handleMarkerClick(marker)}
                        animation={arr.length === 1 ? window.google.maps.Animation.BOUNCE : window.google.maps.Animation.DROP}
                    >
                {marker.isOpen && venueInfo.bestPhoto && (
                <InfoWindow>
                    <React.Fragment>
                        <img src={`${venueInfo.bestPhoto.prefix}100x100${venueInfo.bestPhoto.suffix}`} alt={venueInfo.name}/>
                    <h1>{venueInfo.name}</h1>
                    <p><a href={venueInfo.url} target='_blank' rel='noopener noreferrer'>website</a></p>

                    </React.Fragment>
                </InfoWindow>)}
                </Marker>);
            })}
  </GoogleMap>
))
);


export default class Map extends Component {
    render() {

        //TODO: remove style
        const style = {
            //width: '100vw',
            height: '100vh',
            top: '60px'
          }

        return (
            <div className='map-container' role='application'>
            <ErrorBoundary {...this.props}>
            <MyMapComponent
                {...this.props}
                style={style}
                isMarkerShown
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyAVcvtwNGlsHF1Rqayx3Mbzneiz_4dUBzc"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `calc(100vh - 60px)`}} />}
                // above originally 400px, added top:60px below and above
                mapElement={<div style={{ height: `100%`}} />}
            />
            </ErrorBoundary>
            </div>
        )
    }
}

