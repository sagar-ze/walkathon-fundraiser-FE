import React, { useState } from 'react';
import { Grid, IconButton, Stack, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { EmailSent, Unlock } from '../../assets';
import Lottie from 'lottie-react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import RegisterForm from './RegisterForm';

const Register = () => {
  const [isEmailSent, setIsEmailSent] = useState(true);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        onClick={handleClickOpen}
        autoFocus={false}
        color="error"
        variant="contained"
      >
        Register
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
        <DialogTitle>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h4" style={{ color: '#6d6d6d' }}>
              {isEmailSent ? 'Verify Email' : 'Register'}
            </Typography>
            <IconButton style={{ float: 'right' }} onClick={handleClose}>
              <HighlightOffIcon />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent>
          {isEmailSent ? (
            <Grid container justifyContent="center" textAlign="center">
              <Grid item xs={12}>
                <Lottie animationData={EmailSent} style={{ height: '500px' }} />
              </Grid>
              <Grid item xs={12} style={{ color: '#6d6d6d' }}>
                <Typography variant="body1">
                  Please verify your email and login to proceed further.
                </Typography>
                <Typography
                  variant="subtitle1"
                  style={{ color: '#9d9d9d' }}
                  mt={2}
                >
                  Already verified the email?&nbsp;&nbsp;{' '}
                  <span style={{ color: '#6d6d6d' }}>Login</span>{' '}
                </Typography>
              </Grid>
            </Grid>
          ) : (
            <Grid container>
              <Grid item xs={5} mt={20}>
                <Lottie animationData={Unlock}></Lottie>
              </Grid>
              <Grid item xs={7} p={2}>
                <DialogContentText>Hi there! 👋</DialogContentText>
                <DialogContentText mb={4}>
                  <Typography variant="subtitle2" style={{ opacity: '50%' }}>
                    We thank you for register into our site and doing things for
                    a cause. You will be able to donate or participate in the
                    event after the registration.
                  </Typography>
                </DialogContentText>

                <RegisterForm onSuccess={() => setIsEmailSent(true)} />
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default Register;
