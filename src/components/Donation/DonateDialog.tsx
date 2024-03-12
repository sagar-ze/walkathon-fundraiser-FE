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
import { InputAdornment, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import WrappedTextField from '../Wrappers/WrappedInput/WrappedTextField';
import WrappedAutocomplete from '../Wrappers/WrappedAutocomplete/WrappedAutocomplete';
import DonateForm from './DonateForm';

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

  const steps = [
    {
      label: 'Donation detail',
      id: 1,
      Component: (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        <form onSubmit={handleSubmit(onSubmit as any)} autoComplete="off">
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
            name="participant"
            label="Participants"
            options={[{ name: 'Ram', id: 'ram' }]}
            itemID="id"
            helperText="Selecting participants is optional. If you want to show that you sponsored the participants then you can select one else no need"
          />
        </form>
      ),
    },
    { label: 'Payment Detail', id: 2, Component: <DonateForm /> },
    { label: '🎉🎉', id: 3 },
  ];

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Donate
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep}>
              {steps.map((step) => {
                return (
                  <Step
                    key={step.label}
                    completed={activeStep > step.id}
                    onClick={() =>
                      activeStep > step.id ? setActiveStep(step.id) : ''
                    }
                    sx={{ cursor: 'pointer' }}
                  >
                    <StepLabel>{step.label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
          </Box>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {steps.find((i) => i.id === activeStep)?.Component}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
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
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default DonateDialog;
