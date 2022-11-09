import { Box } from '@mui/material';
import { ReactElement, useContext, useMemo } from 'react';
import React from 'react';
import DeckGL from '@deck.gl/react/typed';
import { GeoJsonLayer } from '@deck.gl/layers/typed';
import { Map as MapBox } from 'react-map-gl';
import { Context } from '../pages';

export const Map = (): ReactElement => {
  const context = useContext(Context);
  const INITIAL_VIEW_STATE = {
    longitude: -122.41669,
    latitude: 37.7853,
    zoom: 13,
    pitch: 0,
    bearing: 0,
  };

  const layers = useMemo(() => {
    return [
      new GeoJsonLayer({
        id: 'geojson',
        filled: true,
        pointRadiusMinPixels: 2,
        pointRadiusMaxPixels: 1000,
        opacity: 0.4,
        getPointRadius: (f) => {
          return f?.properties?.chance ? Math.pow(10, f.properties.chance) : 0;
        },
        getFillColor: [255, 70, 30, 180],
        // data: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson',
        data:
          // {
          //   type: 'FeatureCollection',
          //   features:
          [
            ...context.cities.map((city) => {
              // console.log(city);
              return {
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: [city.lng, city.lat],
                },
                properties: {
                  name: city.name,
                  chance: (city.probability || 0) * 4,
                },
              };
            }),
          ],
        // },
      }),
    ];
  }, [context.cities]);

  return (
    <Box
      sx={{
        flex: '4 4',
        height: '100%',
        width: '100%',
        overflow: 'hidden',
        backgroundColor: 'gray',
      }}
    >
      <DeckGL
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        layers={layers}
        style={{ position: 'relative', height: '100%', width: '100%' }}
      >
        <MapBox
          style={{ width: '100%', height: '100%' }}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          mapboxAccessToken={process.env.NEXT_PUBLIC_API_KEY}
        />
      </DeckGL>
    </Box>
  );
};
