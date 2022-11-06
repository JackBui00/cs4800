import { Box } from '@mui/material';
import { ReactElement } from 'react';
import React from 'react';
import DeckGL from '@deck.gl/react/typed';
import { Map as MapBox } from 'react-map-gl';

export const Map = (): ReactElement => {
  const INITIAL_VIEW_STATE = {
    longitude: -122.41669,
    latitude: 37.7853,
    zoom: 13,
    pitch: 0,
    bearing: 0,
  };

  console.log(process.env.NEXT_PUBLIC_API_KEY);
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
        layers={[]}
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
