import { useEffect, useRef } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import 'ol/ol.css';

import PinIcon from '../../assets/images/distillery-icon.svg';
import { IDistillery } from '../../types/distillery';
import { getRequest } from '../../api/request';
import dataJSON from './data-mock.json';

import { Map, View } from 'ol';
// Subfolders must have .js extension!
import { Point } from 'ol/geom.js';
import { Style, Icon } from 'ol/style.js';
import Feature from 'ol/Feature.js';
import TileLayer from 'ol/layer/Tile.js';
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import OSM from 'ol/source/OSM.js';
import { useGeographic } from 'ol/proj.js';
import { GeoJSON } from 'ol/format.js';
import Overlay from 'ol/Overlay.js';
import { bbox } from 'ol/loadingstrategy.js';
import { toLonLat } from 'ol/proj.js';
import { toStringHDMS } from 'ol/coordinate.js';
import MapView from '../../components/map-view';

export const Route = createFileRoute('/map/')({
  component: () => <MapRoute />,
});

export function MapRoute() {
  // set geographic coordinates (latitude, longitude) as default
  useGeographic();

  const { data, isPending } = useQuery({
    queryKey: ['distilleries'],
    queryFn: async (): Promise<IDistillery[]> => {
      // return await getRequest(`distilleries/`);
      return await getRequest(`distilleries/geojson.json`);
    },
  });

  if (isPending) {
    return <div>Loading map...</div>;
  }

  return <MapView data={data} />;
}
