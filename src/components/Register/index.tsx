import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Grid } from '@mui/material';
import RegisterForm from './RegisterForm';

const Register = () => {
  return (
    <Card sx={{ width: 600 }} elevation={4}>
      <CardContent>
        <Grid container>
          <Grid item xs={12}>
            <RegisterForm />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Register;
