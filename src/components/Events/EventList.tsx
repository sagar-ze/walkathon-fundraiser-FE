import { Box, Grid, Typography } from '@mui/material';
import EventCard from './EventCard';
import Lottie from 'lottie-react';
import { Loading, MapDestination, NoEvent } from '../../assets';

const EventList = () => {
  const items = new Array(5).fill(undefined);
  return (
    <Grid container spacing={2} style={{ width: '100%' }}>
      <Grid item xs={12} justifyContent="center" style={{ marginLeft: '45%' }}>
        <Typography variant="h5" style={{ fontWeight: 500 }}>
          Upcomming Events
        </Typography>
        <Lottie animationData={Loading} style={{ width: '200px' }}></Lottie>
      </Grid>

      <Grid item xs={2}>
        <Lottie
          animationData={MapDestination}
          style={{ opacity: '30%', top: 'auto' }}
        />
      </Grid>
      <Grid item xs={8}>
        {/* <Box style={{ display: 'flex', justifyContent: 'center' }}> */}
        {items.length ? (
          <Grid container justifyContent="center" spacing={3}>
            {items.map((i, idx) => {
              return (
                <Grid item key={idx} style={{ marginTop: '20px' }}>
                  <EventCard />
                </Grid>
              );
            })}
          </Grid>
        ) : (
          <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={12}>
              <img src={NoEvent} alt="" />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" style={{ color: '#9d9d9d' }}>
                No Events Happening at the moment. Please keep checking the site
              </Typography>
            </Grid>
          </Grid>
        )}
      </Grid>
      <Grid item xs={2}>
        <Lottie
          animationData={MapDestination}
          style={{ opacity: '30%', top: 'auto' }}
        />
      </Grid>
    </Grid>
  );
};

export default EventList;
