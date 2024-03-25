import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Alert,
  Card,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import WrappedTextField from '../Wrappers/WrappedInput/WrappedTextField';
import WrappedAutocomplete from '../Wrappers/WrappedAutocomplete/WrappedAutocomplete';
import DonateForm from './DonateForm';
import Lottie from 'lottie-react';
import { Donation } from '../../assets';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CheckIcon from '@mui/icons-material/Check';

const donationSchema = z.object({
  amount: z.number().min(0.5).max(99999999),
  participant: z.number().optional().nullable(),
});

const DonateDialog = () => {
  const [open, setOpen] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState(1);
  const { control, watch, handleSubmit } = useForm({
    resolver: zodResolver(donationSchema),
  });
  const amount = watch('amount');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setActiveStep(1);
  };

  const onSubmit = (data: z.infer<typeof donationSchema>) => {
    console.log('data', data);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Donate
      </Button>
      <Dialog open={open} fullWidth maxWidth="lg" onClose={handleClose}>
        <DialogTitle>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h4" style={{ color: '#6d6d6d' }}>
              Donate
            </Typography>
            <IconButton style={{ float: 'right' }} onClick={handleClose}>
              <HighlightOffIcon />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Grid container>
              <Grid item xs={6} mt={10}>
                <Lottie animationData={Donation}></Lottie>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ width: '100%' }}>
                  <form
                    onSubmit={handleSubmit(onSubmit as any)}
                    autoComplete="off"
                  >
                    <Alert
                      icon={<CheckIcon fontSize="inherit" />}
                      severity="success"
                      style={{ fontWeight: 300 }}
                    >
                      Selecting participants is optional. If you want to show
                      that you sponsored the participants then you can select
                      one else no need
                    </Alert>
                    <Typography
                      variant="subtitle2"
                      ml={2}
                      style={{ color: '#ffb3b3' }}
                    ></Typography>
                    <Card
                      elevation={0}
                      variant="outlined"
                      style={{ padding: '15px', margin: '10px 16px 5px 16px' }}
                    >
                      <Grid container spacing={1}>
                        <Grid item xs={12}></Grid>
                        <WrappedTextField
                          control={control}
                          name="amount"
                          label="Amount"
                          required
                          type="number"
                          maxNumber={99999999}
                          placeholder="Amount greater than 1"
                          inputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <AttachMoneyIcon />
                              </InputAdornment>
                            ),
                          }}
                        />
                        <WrappedAutocomplete
                          control={control}
                          size="medium"
                          name="participant"
                          label="Participants"
                          options={[{ name: 'Ram', id: 'ram' }]}
                          itemID="id"
                          // helperText=""
                        />
                      </Grid>
                    </Card>
                    <DonateForm />
                  </form>
                </Box>
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        {/* <DialogActions>
          <Stack direction="row" spacing={2}>
            <Button onClick={handleClose} color="error">
              Cancel
            </Button>
            <Button
              onClick={() =>
                setActiveStep((curr) =>
                  activeStep === 1 ? curr + 1 : curr - 1,
                )
              }
              variant="contained"
              disabled={!amount && !(amount >= 1)}
            >
              {activeStep === 1 ? 'Next' : 'Back'}
            </Button>
          </Stack>
        </DialogActions> */}
      </Dialog>
    </React.Fragment>
  );
};

export default DonateDialog;
