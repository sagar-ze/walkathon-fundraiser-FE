import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import WrappedAutocomplete from '../Wrappers/WrappedAutocomplete/WrappedAutocomplete';
import { rows } from './MyEvents';
import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Stack,
} from '@mui/material';
import WrappedTextField from '../Wrappers/WrappedInput/WrappedTextField';
import { useState } from 'react';

const pledgeDonationDto = z.object({
  eventId: z.number(),
  possibleDonors: z.array(
    z.object({
      email: z.string().email(),
      note: z.string().nullable().optional(),
    }),
  ),
});

const PledgeDonation = () => {
  const [open, setOpen] = useState(false);
  const { control } = useForm({
    resolver: zodResolver(pledgeDonationDto),
    defaultValues: {
      eventId: null,
      possibleDonors: [{ id: 1, email: '', note: '' }],
    },
  });
  const { fields, append } = useFieldArray({ name: 'possibleDonors', control });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Request Donation
      </Button>
      <Dialog
        fullWidth
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Request Donations from your own's
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <WrappedAutocomplete
              control={control}
              name="eventId"
              type="number"
              label="Event"
              options={rows}
              itemID="id"
            />
            <Card>
              <CardHeader title="Donors"></CardHeader>
              <CardContent>
                {fields.map((item, idx) => (
                  <Stack spacing={2}>
                    <WrappedTextField
                      name={`possibleDonors.${idx}.email`}
                      control={control}
                      label="Email"
                    />
                    <WrappedTextField
                      name={`possibleDonors.${idx}.note`}
                      control={control}
                      label="Note"
                      multiline
                      minRows={3}
                    />
                  </Stack>
                ))}
              </CardContent>
              <CardActionArea>
                <Button onClick={() => append({ email: '', note: '' })}>
                  Add Donor
                </Button>
              </CardActionArea>
            </Card>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose} autoFocus>
            Request
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PledgeDonation;
