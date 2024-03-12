import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { EmailConfirmationLogo } from '../../assets';
import { useNavigate } from 'react-router-dom';

const EmailConfirmation = () => {
  const navigate = useNavigate();
  return (
    <Grid container justifyContent="center" alignItems="center">
      <Card style={{ width: 450, marginTop: '20rem' }}>
        <CardContent>
          <Typography
            variant="h5"
            mt={2}
            align="center"
            sx={{ color: '#6d6d6d' }}
          >
            Verify your email address
          </Typography>
          <Typography
            style={{
              fontWeight: 300,
              fontStyle: 'italic',
              fontSize: 14,
              color: '#6d6d6d',
              marginTop: 10,
            }}
          >
            Check you email and click the verify button to verify the email.
          </Typography>
          <img
            src={EmailConfirmationLogo}
            alt="img"
            height={150}
            style={{ marginLeft: '100px', marginTop: 10 }}
          />
        </CardContent>
        <CardActions>
          <Stack direction="row" spacing={2} alignItems="center" m="auto">
            <Button
              onClick={() => navigate('/events')}
              color="success"
              //   variant="outlined"
            >
              Go back to Events
            </Button>
            <Button onClick={() => navigate('/login')}>Login</Button>
          </Stack>
          {/* <Link href="/events" component="button">
            View Events
          </Link> */}
        </CardActions>
      </Card>
    </Grid>
  );
};

export default EmailConfirmation;
