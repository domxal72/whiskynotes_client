import { useEffect, useRef } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import 'ol/ol.css';

import PinIcon from '../../assets/images/distillery-icon.svg';
import { Map, View } from 'ol';
// Subfolders must have .js extension!
import { Point } from 'ol/geom.js';
import { Style, Icon } from 'ol/style.js';
import Feature from 'ol/Feature.js';
import TileLayer from 'ol/layer/Tile.js';
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import Collection from 'ol/Collection.js';
import OSM from 'ol/source/OSM.js';
// import GeoJSON from 'ol/format/GeoJSON.js';
import { fromLonLat, useGeographic } from 'ol/proj.js';
import { GeoJSON } from 'ol/format.js';

import { lanLonToCoors } from '../../utils/ol-maps';
import { Geometry } from 'ol/geom';
import { format } from 'ol/coordinate';

export const Route = createFileRoute('/map/')({
  component: () => <MapView />,
});

const data = [
  [-5.6093319, 55.4248478],
  [-4.1847033, 56.8812725],
];

const myGeoJSON = {
  type: 'MultiPoint',
  coordinates: [
    [-5.6093319, 55.4248478],
    [-4.1847033, 56.8812725],
  ],
};

const myGeoJSONCollection = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-5.6093319, 55.4248478],
      },
      properties: {
        prop0: 'value0',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-4.1847033, 56.8812725],
      },
      properties: {
        prop0: 'value0',
        prop1: 0.0,
      },
    },
  ],
};

function MapView() {
  const mapRef = useRef(null);
  useGeographic();

  const vectorSource = new VectorSource({
    features: [
      new Feature({
        // geometry: new Point(fromLonLat([-5.9454449, 56.6899703])),
        geometry: new Point([-5.9454449, 56.6899703]),
      }),
    ],
  });

  const vectorLayer = new VectorLayer({
    source: vectorSource,
    style: new Style({
      image: new Icon({
        src: PinIcon,
        anchor: [0.5, 1],
      }),
    }),
  });

  // const pinsList = [
  //   new Feature([-5.6093319, 55.4248478]),
  //   new Feature([-4.1847033, 56.8812725]),
  // ];

  const pinsList = [
    [-5.6093319, 55.4248478],
    [-4.1847033, 56.8812725],
  ];

  const distillerySource = new VectorSource({
    // features: pinsList,
    // features: new GeoJSON().readFeatures(myGeoJSON),
    features: new GeoJSON().readFeatures(myGeoJSONCollection),
  });

  const place = [-5.6093319, 55.4248478];
  const point = new Point(place);
  const distilleriesPins = new VectorLayer({
    // source: new VectorSource({
    //   // features: [new Feature(point)],
    //   // features: new Collection(pinsList),
    // }),
    source: distillerySource,
    style: {
      'circle-radius': 9,
      'circle-fill-color': 'red',
    },
    // source: distillerySource,
    // // style: new Style({
    // //   image: new Icon({
    // //     src: PinIcon,
    // //     anchor: [0.5, 1],
    // //   }),
    // // }),
    // style: {
    //   'circle-radius': 9,
    //   'circle-fill-color': 'red',
    // },
  });

  useEffect(() => {
    if (!mapRef.current) return;
    const map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        // vectorLayer,
        distilleriesPins,
      ],
      view: new View({
        // center: fromLonLat([-4.1847033, 56.8812725]),
        center: [-4.1847033, 56.8812725],
        zoom: 4,
      }),
    });

    map.setTarget(mapRef.current);

    return () => {
      map.setTarget(undefined);
    };
  }, []);

  return (
    <div>
      <div id='map' className='w-full h-96' ref={mapRef}></div>
    </div>
  );
}
