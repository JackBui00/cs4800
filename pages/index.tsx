import { Box, Typography } from '@mui/material';
import type { NextPage } from 'next';
import Head from 'next/head';
import { TitleBar } from '../components/TitleBar';

const Home: NextPage = () => {
  return (
    <div style={{ height: '100vh' }}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
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
        <Box sx={{ flex: '1 1' }}>
          input
          <form action="/api/forms" method="post">
            <label htmlFor="City">City:</label>
            <input type="text" id="City" name="City" />
            <br></br>
            <label htmlFor="Date">Date:</label>
            <input type="text" id="Date" name="Date" />
            <br></br>
            <label htmlFor="Humidity">Humidity</label>
            <input type="text" id="Humidity" name="Humidity" />
            <br></br>
            <button type="submit">Submit</button>
          </form>
        </Box>

        <Box
          sx={{
            flex: '4 4',
            height: '80%',
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <Box
            sx={{
              flex: '4 4',
              height: '100%',
              width: '100%',
              backgroundColor: 'gray',
            }}
          >
            Map
          </Box>
          <Box sx={{ flex: '1 1' }}>Data</Box>
          <br></br>
          <Box></Box>
        </Box>
      </Box>
    </div>
  );
};

export default Home;
