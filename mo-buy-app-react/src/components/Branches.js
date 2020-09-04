/*import React, { Component, useState } from 'react';
import { GoogleApiWrapper, Map,InfoWindow, Marker } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%'
};
const markerList=[{lat:32.0168, lng:35.191241},{lat:32.0168, lng:34.191241},{lat:30.0168, lng:35.191241},{lat:32.0168, lng:35.1912430}];
export class MapContainer extends Component {
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={{
         lat: 31.766969,
         lng:  35.191241
        }}>
          {markerList.map((item)=>
        (<Marker 
          lat={item.lat}
          lat={item.lng}
        onClick={this.onMarkerClick}
        name={'Kenyatta International Convention Centre'}
      />))
          }
     </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCukvfeuswGR_N6fC4pBoyXQch2etw2LHk'
})(MapContainer);
*/

import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import "./css/marker.css";

const markerList = [
  { lat: 11.0168, lng: 76.9558 },
  { lat: 0.0168, lng: 76.9558 },
  { lat: 23.0168, lng: 77.9558 },
  { lat: 9.0168, lng: 76.9558 },
];
const AnyReactComponent = ({ text }) => <div>{text}</div>;
const Marker = (props) => {
  const { color, name, id } = props;
  return (
    <div
      className="marker"
      style={{ backgroundColor: color, cursor: "pointer" }}
      title={name}
    />
  );
};

/*const SimpleMap = (props) => {
    const [center, setCenter] = useState({lat: 11.0168, lng: 76.9558 });
    const [zoom, setZoom] = useState(11);
    return (
        <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyCukvfeuswGR_N6fC4pBoyXQch2etw2LHk' }}
          defaultCenter={center}
          defaultZoom={zoom}
        >
          <AnyReactComponent
            lat={11.0168}
            lng={76.9558}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
    );
}
export default SimpleMap;*/
const SimpleMap = (props) => {
  const [center, setCenter] = useState({ lat: 11.0168, lng: 76.9558 });
  const [zoom, setZoom] = useState(11);
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyCukvfeuswGR_N6fC4pBoyXQch2etw2LHk" }}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        {markerList.map((item) => (
          <Marker lat={item.lat} lng={item.lng} name="My Marker" color="blue" />
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default SimpleMap;
