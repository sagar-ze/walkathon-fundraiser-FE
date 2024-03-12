import { Grid } from '@mui/material';
import EventList from '../Events/EventList';

const Dashboard = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <EventList />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
