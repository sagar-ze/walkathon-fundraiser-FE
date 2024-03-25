import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Grid } from '@mui/material';
import ForgotPasswordForm from './LoginForgetForm';
// import ForgotPasswordForm from './ForgotPasswordForm';
// import { Logo } from '../../assets';

const ForgotPassword = () => {
  return (
    <Card sx={{ width: 600 }} elevation={4}>
      <CardContent>
        <Grid container>
          <Grid item xs={12}></Grid>
          <Grid item xs={12}>
            <ForgotPasswordForm />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ForgotPassword;
