import React, {Component} from "react";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={12}
    defaultCenter={{ lat: 40.979670, lng: -74.119180 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: 40.979670, lng: -74.119180 }} />}
  </GoogleMap>
))


export default class Map extends Component {
    render() {
        return (
            <MyMapComponent
                isMarkerShown
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyAVcvtwNGlsHF1Rqayx3Mbzneiz_4dUBzc"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        )
    }
}

