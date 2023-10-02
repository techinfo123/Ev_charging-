import { useState, useCallback } from "react";
import { GoogleMapProvider } from "@ubilabs/google-maps-react-hooks";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import SuperClusterAlgorithm from "../utils/superClusterAlgorithm";
import trees from "../data/trees";
import React from "react";
import { useEffect } from "react";





export default function Index() {
  const [mapContainer, setMapContainer] = useState(null);
  const onLoad = useCallback((map) => addMarkers(map), []);
  const [latitude,setLatitude] = React.useState(null);
  const [longitude,setLongitude] = React.useState(null);
  
  React.useEffect(()=>{
    navigator.geolocation.getCurrentPosition((position)=>{
      console.log(position.coords);
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);

    })
},[])
const mapOptions = {
  zoom: 12,
  center: {
    lat: latitude,
    lng: longitude  ,
  },
};
if (latitude === null || longitude === null) {
  return <div>Loading...</div>; // You may want to render a loading indicator while waiting for geolocation
}
  return (<>
        <div className="class" >
          <h1>Add your charging station</h1>
           <h3>type of charger available</h3><input  type="text" className="text1"/>
           <h3>latitude</h3>
          <input  type="text" className="text1"/>
          <h3>longitude</h3>
          <input  type="text" className="text1"/>
        </div>
    <GoogleMapProvider
      googleMapsAPIKey={"AIzaSyCmZe4H67A9QiesEbAItkGgMGa_UNkjJXc"}
      options={mapOptions}
      mapContainer={mapContainer}
      onLoad={onLoad}
    >
      <div ref={(node) => setMapContainer(node)} style={{ height: "100vh" }} />
    </GoogleMapProvider>
    </>
  );
}

function addMarkers(map) {
  const infoWindow = new google.maps.InfoWindow();

  const markers = trees.map(([name, lat, lng]) => {
    const marker = new google.maps.Marker({ position: { lat, lng } });

    marker.addListener("click", () => {
      infoWindow.setPosition({ lat, lng });
      infoWindow.setContent(`
        <div class="info-window">
          <h2>${name}</h2>
        </div>
      `);
      infoWindow.open({ map });
    });

    return marker;
  });

  new MarkerClusterer({
    markers,
    map,
    // algorithm: new SuperClusterAlgorithm({ radius: 200 }),
  });

  
}
