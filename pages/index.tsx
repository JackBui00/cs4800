import { Box } from '@mui/material';
import type { NextPage } from 'next';
import Head from 'next/head';
import React, { useContext, useEffect, useState } from 'react';
import { Data } from '../components/Data';
import { Map } from '../components/Map';
import { TitleBar } from '../components/TitleBar';
import { City } from '../data/cityCache';
import { getPredictions } from '../helpers/getPredictions';

export interface ContextType {
  day: number;
  month: number;
  year: number;
  rain_30: number;
  rain_60: number;
  rain_90: number;
  cities: City[];
  setCities: (cities: City[]) => void;
}

const defaultContext: ContextType = {
  day: 10,
  month: 11,
  year: 2003,
  rain_30: 0,
  rain_60: 0,
  rain_90: 0,
  cities: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setCities: () => {
    console.log('why was I called...');
  },
};

export const Context = React.createContext<ContextType>(defaultContext);

export type StaticProps = {
  cities: City[];
};

const Home: NextPage<StaticProps> = (props: StaticProps) => {
  const [cities, setCities] = useState<City[]>(props.cities);
  const context = useContext(Context);
  useEffect(() => {
    const get = async () => {
      const predictions = await getPredictions(context);
      setCities(predictions);
    };
    get().catch((e) => {
      console.log(e);
    });
  }, []);
  return (
    <Context.Provider
      value={Object.assign(defaultContext, { cities, setCities })}
    >
      <div style={{ height: '100vh' }}>
        <Head>
          <title>California Wildfire Predictions</title>
          <meta name="description" content="predicts wildfires in california" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Box
          sx={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <TitleBar />
          <Box sx={{ flex: '1 1' }}>input</Box>
          <Box
            sx={{
              flex: '4 4',
              height: '80%',
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <Map />
            <Box sx={{ flex: '1 1' }}>
              <Data />
            </Box>
          </Box>
        </Box>
      </div>
    </Context.Provider>
  );
};

export async function getStaticProps() {
  const res = await fetch('http://localhost:3000/api/getCities');
  const data: City[] = await res.json();
  return {
    props: {
      cities: data,
    } as StaticProps,
  };
}

export default Home;