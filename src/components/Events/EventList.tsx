import { Grid } from '@mui/material';
import EventCard from './EventCard';

const EventList = () => {
  return (
    <Grid container spacing={2}>
      {new Array(5).fill(undefined).map((i, idx) => {
        return (
          <Grid item key={idx}>
            <EventCard />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default EventList;
