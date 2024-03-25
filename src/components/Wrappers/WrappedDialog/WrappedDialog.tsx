import React from 'react';
import { Grid, IconButton, Stack, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Lottie from 'lottie-react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

type WrappedDialogProps = {
  title: React.ReactNode;
  content: React.ReactElement;
  animationData: unknown;
  leftBreakpoint?: number;
  rightBreakpoint?: number;
};

const WrappedDialog = (props: WrappedDialogProps) => {
  const { title, content, leftBreakpoint, rightBreakpoint, animationData } =
    props;
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
        {title}
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
        <DialogTitle>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h4" style={{ color: '#6d6d6d' }}>
              {title}
            </Typography>
            <IconButton style={{ float: 'right' }} onClick={handleClose}>
              <HighlightOffIcon />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Grid container>
            <Grid item xs={leftBreakpoint || 6}>
              <Lottie animationData={animationData}></Lottie>
            </Grid>
            <Grid item xs={rightBreakpoint || 6} p={8} mt={5}>
              <DialogContentText>Hi there! 👋</DialogContentText>

              {content}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default WrappedDialog;
