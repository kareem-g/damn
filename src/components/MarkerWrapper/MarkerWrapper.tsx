import React, {useEffect} from 'react';
import {Marker, useMap} from 'react-leaflet';

type Props = {
  lat: number;
  long: number;
};

const MarkerWrapper: React.FC<Props> = ({lat, long}) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, long], 8);
  }, []);
  return (
    <div>
      <Marker position={[lat, long]} />
    </div>
  );
};

export default MarkerWrapper;
