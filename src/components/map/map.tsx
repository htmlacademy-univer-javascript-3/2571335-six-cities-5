import React from 'react';
import {useRef, useEffect} from 'react';
import {Icon, Marker, layerGroup} from 'leaflet';
import 'leaflet/dist/leaflet.css';

import useMap from '../../hooks/use-map.tsx';
import {City} from '../../types/points.ts';
import { OfferDescription } from '../../types/offer-description.ts';


type MapProps = {
  city: City;
  offerList:OfferDescription[];
  selectedOffer:OfferDescription | undefined;
};

const defaultCustomIcon = new Icon({
  iconUrl: '../../../markup/img/pin.svg',
  iconSize: [25, 40],
  iconAnchor: [20, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: '../../../markup/img/pin-active.svg',
  iconSize: [25, 40],
  iconAnchor: [20, 40]
});

function Map(props: MapProps): JSX.Element {

  const {city, offerList, selectedOffer} = props;
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    let isMounted = true;
    if (isMounted){
      if (map) {
        map.setView([city.lat, city.lng], city.zoom);
        const markerLayer = layerGroup().addTo(map);
        offerList.forEach((point) => {
          const marker = new Marker({
            lat: point.location.latitude,
            lng: point.location.longitude
          });

          marker
            .setIcon(
              selectedOffer !== undefined && point.id === selectedOffer.id
                ? currentCustomIcon
                : defaultCustomIcon
            )
            .addTo(markerLayer);
        });
        return () => {
          map.removeLayer(markerLayer);
          isMounted = false;
        };
      }
    }
  }, [map, offerList, city.zoom, city.lat, city.lng]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted){
      if (map) {
        const markerLayer = layerGroup().addTo(map);
        offerList.forEach((point) => {
          const marker = new Marker({
            lat: point.location.latitude,
            lng: point.location.longitude
          });

          marker
            .setIcon(
              selectedOffer !== undefined && point.id === selectedOffer.id
                ? currentCustomIcon
                : defaultCustomIcon
            )
            .addTo(markerLayer);
        });
        return () => {
          map.removeLayer(markerLayer);
          isMounted = false;
        };
      }
    }
  }, [map, offerList, selectedOffer, city.zoom, city.lat, city.lng]);
  return <div style={{ height: `${100}%`, width: `${100}%`, margin: '0 auto' }} ref={mapRef} data-testid = 'map-test'></div>;
}

export default React.memo(Map);
