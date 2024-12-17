import { useEffect, useRef } from 'react';
import { z } from 'zod';
import 'ol/ol.css';

import PinIcon from '../assets/images/distillery-icon.svg';
import { TDistillery } from '../types/distillery';

import { Map, View } from 'ol';
// Subfolders must have .js extension!
import { Style, Icon } from 'ol/style.js';
import TileLayer from 'ol/layer/Tile.js';
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import OSM from 'ol/source/OSM.js';
import { useGeographic } from 'ol/proj.js';
import { GeoJSON } from 'ol/format.js';
import Overlay from 'ol/Overlay.js';
import { toLonLat } from 'ol/proj.js';
import { toStringHDMS } from 'ol/coordinate.js';

type TCoordinates = [number, number];

type TGeometry = {
  type: string;
  coordinates: TCoordinates;
};

type TFeature = {
  geometry: TGeometry;
  properties: {
    [prop: string]: unknown;
  };
};

type TGeoJSON = {
  type: string;
  features: Array<TFeature | null>;
  geometry?: TGeometry;
};

const coorsSchema = z.tuple([
  z.number().min(-90).max(90),
  z.number().min(-180).max(180),
]);

function transformToGeoJSON(data: TDistillery[]): TGeoJSON {
  const features = data.filter(
    ({ x_coors, y_coors }) => coorsSchema.safeParse([x_coors, y_coors]).success
  );

  const coorsFeatures = features.map(({ id, name, x_coors, y_coors }) => {
    return {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [x_coors, y_coors] as TCoordinates,
      },
      properties: {
        id,
        name,
      },
    };
  });

  const geoJSON = {
    type: 'FeatureCollection',
    features: coorsFeatures,
  };

  return geoJSON;
}

const noData = {
  type: 'Feature',
  geometry: {
    type: 'Point',
    coordinates: [0, 0],
  },
};

type TMapViewProps = {
  data?: TDistillery[];
};

function MapView({ data }: TMapViewProps) {
  const mapRef = useRef(null);
  const contentRef = useRef(null);
  const closerRef = useRef(null);
  const containerRef = useRef(null);

  // set geographic coordinates (latitude, longitude) as default
  useGeographic();

  useEffect(() => {
    if (!mapRef.current) return;

    const popUpOverlay = new Overlay({
      element: containerRef.current,
      autoPan: {
        animation: {
          duration: 250,
        },
      },
    });

    const map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        new VectorLayer({
          source: new VectorSource({
            features: new GeoJSON().readFeatures(
              data ? transformToGeoJSON(data) : noData
            ),
          }),
          style: new Style({
            image: new Icon({
              src: PinIcon,
              anchor: [0.5, 1],
            }),
          }),
        }),
      ],
      overlays: [popUpOverlay],
      view: new View({
        center: [-4.1847033, 56.8812725],
        zoom: 4,
      }),
    });

    map.setTarget(mapRef.current);

    // TODO: popup example
    // closer.onclick = function () {
    //   overlay.setPosition(undefined);
    //   closer.blur();
    //   return false;
    // };

    // map.on('singleclick', function (evt) {
    //   const coordinate = evt.coordinate;
    //   const hdms = toStringHDMS(toLonLat(coordinate));
    //   console.log(coordinate);

    //   contentRef.current.innerHTML =
    //     '<p>You clicked here:</p><code>' + hdms + '</code>';
    //   overlay.setPosition(coordinate);
    // });

    return () => {
      map.setTarget(undefined);
    };
  }, [data]);

  return (
    <div>
      <div id='map' className='w-full h-96' ref={mapRef}></div>
      <div id='popup' className='ol-popup' ref={containerRef}>
        <a
          href='#'
          id='popup-closer'
          className='ol-popup-closer'
          ref={closerRef}
        >
          X
        </a>
        <div id='popup-content' ref={contentRef}></div>
      </div>
      {!data && <div>No map data to loaded...</div>}
    </div>
  );
}

export default MapView;
