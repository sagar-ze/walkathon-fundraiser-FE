import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Grid } from '@mui/material';
import LoginForm from './LoginForm';
// import { Logo } from '../../assets';

const Login = () => {
  return (
    <Card sx={{ width: 600 }} elevation={4}>
      <CardContent>
        <Grid container>
          <Grid item xs={12}>
            {/* <img src={Logo} alt="logo" width={200} /> */}
          </Grid>
          <Grid item xs={12}>
            <LoginForm />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Login;
