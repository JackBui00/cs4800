import { Box, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { ReactElement, useContext, useMemo, useState } from 'react';
import { WildFire, WildFireContext } from '../pages';

export const Data = (): ReactElement => {
  const [filter, setFilter] = useState<string>('');
  const fires = useContext<WildFire[]>(WildFireContext);
  const filteredFires = useMemo(() => {
    return fires
      .filter((fire) =>
        fire.location.toLowerCase().includes(filter.toLowerCase())
      )
      .map((fire) => {
        return <Fire key={fire.location} fire={fire} />;
      });
  }, [fires, filter]);
  return (
    <Stack>
      <TextField
        id="outlined-basic"
        label="Enter Location..."
        variant="outlined"
        value={filter}
        onChange={(val) => setFilter(val.target.value || '')}
      />

      {filteredFires}
    </Stack>
  );
};

const Fire = ({ fire }: { fire: WildFire }): ReactElement => {
  return (
    <Box sx={{ border: '1px black solid', p: 1 }}>
      <Stack>
        <Typography>Location: {fire.location}</Typography>
        <Typography>Change: {fire.chance}</Typography>
        <Typography>Humidity: {fire.humidity}</Typography>
        <Typography>Temperature: {fire.temp}</Typography>
      </Stack>
    </Box>
  );
};
