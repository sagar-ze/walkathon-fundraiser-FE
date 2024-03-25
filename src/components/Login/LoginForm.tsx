import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import loginSchema from './utils/validation';
import WrappedForm from '../Wrappers/WrappedForm/WrappedForm';
import { useMutation } from '@tanstack/react-query';
import WrappedTextField from '../Wrappers/WrappedInput/WrappedTextField';
import authService from '../../services/authService';
import localStorageService from '../../services/localStorageService';
import { useContext } from 'react';
import UserContext from '../../context/UserContext';
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Stack,
  Typography,
} from '@mui/material';

const LoginForm = () => {
  const { setCurrentUser } = useContext(UserContext);
  const useFormMethods = useForm({
    resolver: zodResolver(loginSchema),
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  const mutation = useMutation({
    mutationFn: authService.auth,
    onSuccess: (data) => {
      console.log("I'm here", data);
      localStorageService.setAuthToken(data);
      setCurrentUser(data.user);
    },
  });

  return (
    <Box>
      <WrappedForm
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        mutation={mutation as any}
        useFormMethods={useFormMethods}
        redirectTo={'/events'}
        createSuccessText="Successfully Logged In"
      >
        <WrappedTextField
          control={useFormMethods.control}
          name="identifier"
          label="Email"
        />
        <WrappedTextField
          control={useFormMethods.control}
          name="password"
          label="Password"
          type="password"
        />
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between">
            <Box>
              <FormControlLabel
                control={<Checkbox defaultChecked size="small" />}
                label={<Typography variant="subtitle2">Remember me</Typography>}
              />
            </Box>
            <Box>
              <Typography variant="subtitle2" mt={1}>
                Forgot Password?
              </Typography>
            </Box>
          </Stack>
        </Grid>
      </WrappedForm>
      <Grid item xs={12}>
        <Typography variant="body1" style={{ color: '#9e9d9d' }} mt={5}>
          Don't have an account yet?&nbsp;&nbsp;
          <span style={{ color: '#3d3d3d' }}>Sign up</span>
        </Typography>
      </Grid>
    </Box>
  );
};

export default LoginForm;
