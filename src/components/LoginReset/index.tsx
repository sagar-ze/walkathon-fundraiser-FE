import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Grid } from '@mui/material';
import LoginResetForm from './LoginResetForm';
// import { Logo } from '../../assets';

const LoginReset = () => {
  return (
    <Card sx={{ width: 600 }} elevation={4}>
      <CardContent>
        <Grid container>
          <Grid item xs={12}>
            {/* <img src={Logo} alt="logo" width={200} /> */}
          </Grid>
          <Grid item xs={12}>
            <LoginResetForm />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default LoginReset;
