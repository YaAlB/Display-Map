import proj4 from 'proj4';
//import {transformExtent} from 'ol/proj';
import { ButtonGroup, Button} from 'react-bootstrap';
import React, { useState, useEffect} from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import * as parkDate0 from './data/Rndm1ptsProjected.json';
import * as parkDate from './data/Rndm5ptsProjected.json';
import * as parkDate100 from './data/Rndm100ptsProjected.json';
import * as parkDate1000 from './data/Rndm1000ptsProjected.json';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  const [viewport, setViewport] = useState({
    latitude: -37.8142176,
    longitude: 144.9631608,
    coordinates: 0, 
    width: "100vw",
    height: "100vh",
    zoom: 11
  });
  const [selectedPark, setSelectedPark] = useState(null);


  useEffect(() => {
    const listener = e => {
      if (e.key === "Escape") {
        setSelectedPark(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  var source = '+proj=utm +zone=50 +south +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs'
  var dest = '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs'    
  //var result = proj4(source, dest, p);
  //alert('Correct:', result);
  //alert('Wrong:', p);
  

  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/yaal/ck88mv6h40ppw1iqqygkb5nt4"
        onViewportChange={viewport => {
          setViewport(viewport);
        }}
      >
        <Button variant="success">Submit</Button>{' '}
        <ButtonGroup
          //  className="btn-group-toggle float-right"
          //  data-toggle="buttons"
          >
          {/* <Button
          onClick = { function () {parkDate.features.map(park => (
            <Marker
              key={park.properties.OBJECTID}
              latitude={park.geometry.coordinates[1]}
              longitude={park.geometry.coordinates[0]}
            >
              <button
                className="marker-btn"
                onClick={e => {
                  e.preventDefault();
                  setSelectedPark(park);
                }}
              >
                <img src="/skateboarding.svg" alt="Skate Park Icon" />
              </button> 
            </Marker>
          ))}}
         > 
          5 Points
         </Button> */}
         {/* <Button
           onClick={alert("Hi")}
         >
          100 Points
         </Button> */}
         {/* <Button
           onClick={() => parkDate1000.features.map(park => (
            <Marker
              key={park.properties.OBJECTID}
              latitude={park.geometry.coordinates[1]}
              longitude={park.geometry.coordinates[0]}
            >
              <button
                className="marker-btn"
                onClick={e => {
                  e.preventDefault();
                  setSelectedPark(park);
                }}
              >
                <img src="/skateboarding.svg" alt="Skate Park Icon" />
              </button> 
            </Marker>
          ))}
         >
          1000 Points
         </Button> */}
        </ButtonGroup>
        {parkDate.features.map(park => (
          <Marker
            key={park.properties.OBJECTID}
            latitude={park.geometry.coordinates[1]}
            longitude={park.geometry.coordinates[0]}
            
          >
            <button
              className="marker-btn"
              onClick={e => {
                e.preventDefault();
                setSelectedPark(park);
              }}
            >
              <img src="/skateboarding.svg" alt="Skate Park Icon" />
            </button> 
          </Marker>
        ))}
        {selectedPark ? (
          <Popup
            latitude={selectedPark.geometry.coordinates[1]}
            longitude={selectedPark.geometry.coordinates[0]}
            onClose={() => {
              setSelectedPark(null);
            }}
          >
            <div>
              <h2>{selectedPark.properties.UID}</h2>
              <p>{selectedPark.properties.OBJECTID}</p>              
            </div>
          </Popup>
        ) : null}
      </ReactMapGL>
    </div>
  );
 }

