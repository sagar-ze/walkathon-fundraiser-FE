import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { format } from 'date-fns';
import { Chip, Typography } from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CancelIcon from '@mui/icons-material/Cancel';
import PledgeDonation from './PledgeDonation';

function createData(
  name: string,
  isActive: boolean,
  organizer: string,
  startDate: Date,
  endDate: Date,
  sponsor: { name: string; id: number; amount: number }[],
) {
  return {
    name,
    isActive,
    organizer,
    startDate,
    endDate,
    sponsor,
  };
}

export const rows = [
  createData('Frozen yoghurt', false, 'Seneca', new Date(), new Date(), [
    { id: 1, name: 'Adrew Tata', amount: 10 },
  ]),
  createData('Ice cream sandwich', true, 'Richmond', new Date(), new Date(), [
    { id: 2, name: 'Ram', amount: 22 },
    { id: 1, name: 'Adrew Tata', amount: 10 },
  ]),
  createData('Eclair', false, 'TTC', new Date(), new Date(), [
    { id: 1, name: 'Adrew Tata', amount: 10 },
  ]),
  createData('Cupcake', true, 'AMD', new Date(), new Date(), [
    { id: 2, name: 'Satyam', amount: 6000 },
    { id: 1, name: 'Adrew Tata', amount: 10 },
    { id: 3, name: 'Aham', amount: 45 },
  ]),
  createData('Gingerbread', false, 'Apple', new Date(), new Date(), [
    { id: 1, name: 'Adrew Tata', amount: 10 },
  ]),
];

const MyEvents = () => {
  return (
    <TableContainer component={Paper} sx={{ mt: 5, p: 4 }}>
      <Typography variant="h4">My Events</Typography> <PledgeDonation />
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Is Active Event</TableCell>
            <TableCell align="right">Organizer</TableCell>

            <TableCell align="right">Start Date</TableCell>
            <TableCell align="right">End Date</TableCell>
            <TableCell align="right">Sponsor</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">
                {row.isActive ? (
                  <CheckBoxIcon color="success" />
                ) : (
                  <CancelIcon color="warning" />
                )}
              </TableCell>

              <TableCell align="right">{row.organizer}</TableCell>
              <TableCell align="right">
                {format(row.startDate, 'dd/MM/yyyy')}
              </TableCell>
              <TableCell align="right">
                {format(row.endDate, 'dd/MM/yyyy')}
              </TableCell>
              <TableCell align="right" style={{ maxWidth: '300px' }}>
                {row.sponsor?.map((sponsor) => (
                  <Chip
                    size="small"
                    style={{ background: '#2C5F2D' }}
                    label={
                      <Typography color="#97BC62FF">
                        {sponsor.name} (${sponsor.amount})
                      </Typography>
                    }
                    variant="outlined"
                  />
                ))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MyEvents;
