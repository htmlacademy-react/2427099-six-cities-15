import { useRef, useEffect } from 'react';
import { Icon, Marker, layerGroup } from 'leaflet';
import useMap from '../../hooks/use-map';
import { Offer } from '../../types/offer';
import { City } from '../../types/city';
import URL_MARKER_DEFAULT from '../../assets/pin.svg';
import URL_MARKER_CURRENT from '../../assets/pin-active.svg';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  extraClass: string;
  city: City;
  offers: Offer[];
  selectedOffer?: Offer | null;
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [27, 39],
  iconAnchor: [13.5, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [27, 39],
  iconAnchor: [13.5, 40]
});

function Map(props: MapProps): JSX.Element {
  const {extraClass, city, offers, selectedOffer} = props;

  const mapRef = useRef(null);
  const map = useMap({mapRef, city});

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude
        });

        marker
          .setIcon(
            selectedOffer !== undefined && offer.id === selectedOffer?.id
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [extraClass, map, offers, selectedOffer]);

  return <section className={`${extraClass}__map map`} ref={mapRef} />;
}

export default Map;
