import { Grid } from '@mui/material';
import EventList from '../Events/EventList';
import Banner from './Banner';

const Dashboard = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Banner />
        <EventList />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
