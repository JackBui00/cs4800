import { Box, Typography } from '@mui/material';
import { ReactElement } from 'react';

export const TitleBar = (): ReactElement => {
  return (
    <Box sx={{ height: '15%', flex: '0 0' }}>
      <Typography variant="h3">Wildfire Prediction</Typography>
    </Box>
  );
};
