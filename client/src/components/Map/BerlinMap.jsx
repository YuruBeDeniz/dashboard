import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import { useEffect } from 'react';
import './index.css';
import boulderAddresses from '../../data/boulderAdresses.json';

export default function BerlinMap() {

  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;

    
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [13.404954, 52.520008], 
      zoom: 10,
    });  

    boulderAddresses.map((address) => {
        const marker = new mapboxgl.Marker({ color: 'blue' })
          .setLngLat([address.long, address.lat])
          .setPopup(
            new mapboxgl.Popup().setHTML(`<h3>${address.name}</h3><br><p style="color:blue;">${address.address}</p>`)
          )
          .addTo(map);
      }); 
      
      return () => map.remove();
  }, []);


  return (
    <>
    <h1 className="map-card-title">Your Favorite Boulder Houses</h1>
    <div id="map"></div>
    </>
  )
}
