import { Box, CircularProgress, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { ReactElement, useContext, useMemo, useState } from 'react';
import { City } from '../data/cityCache';
import { Context, ContextType } from '../pages';

export const Data = (): ReactElement => {
  const [filter, setFilter] = useState<string>('');
  const context = useContext<ContextType>(Context);
  const filteredCities = useMemo(() => {
    return context.cities
      .filter((city) => city.name.toLowerCase().includes(filter.toLowerCase()))
      .map((city) => {
        return <CityData key={city.name} city={city} />;
      });
  }, [context.cities, filter]);

  return (
    <Stack sx={{ overflowY: 'scroll', height: '100%' }}>
      <TextField
        id="outlined-basic"
        label="Enter Location..."
        variant="outlined"
        value={filter}
        onChange={(val) => setFilter(val.target.value || '')}
      />

      {filteredCities}
    </Stack>
  );
};

const CityData = ({ city }: { city: City }): ReactElement => {
  return (
    <Box sx={{ border: '1px black solid', p: 1 }}>
      <Stack>
        <Typography variant="h6">
          {city.name} ({city.lat},{city.lng})
          {city.probability && city.humidity && city.temp ? (
            <></>
          ) : (
            <CircularProgress size="1em" sx={{ ml: '1em' }} />
          )}
        </Typography>
        <Typography>Wildfire Chance: {city.probability}</Typography>
        <Typography>Humidity: {city.humidity}</Typography>
        <Typography>Temperature: {city.temp}</Typography>
      </Stack>
    </Box>
  );
};
