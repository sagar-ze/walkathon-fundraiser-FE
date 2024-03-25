import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from './utils/validation';
import WrappedForm from '../Wrappers/WrappedForm/WrappedForm';
import { useMutation } from '@tanstack/react-query';
import WrappedTextField from '../Wrappers/WrappedInput/WrappedTextField';
import userService, { RegisterSchema } from '../../services/userService';
import { Box, Grid, Typography } from '@mui/material';

type RegisterFormProps = {
  onSuccess: () => void;
};

const RegisterForm = (props: RegisterFormProps) => {
  const { onSuccess } = props;
  const useFormMethods = useForm({
    resolver: zodResolver(registerSchema),
  });

  console.log('useFormMethods', useFormMethods.formState.errors);

  const mutation = useMutation({
    mutationFn: (data: RegisterSchema) => userService.register(data),
    onSuccess: () => onSuccess(),
  });

  return (
    <Box>
      <WrappedForm
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        mutation={mutation as any}
        useFormMethods={useFormMethods}
        createSuccessText="Welcome to walkathon."
      >
        <WrappedTextField
          control={useFormMethods.control}
          name="fullName"
          label="Full Name"
          required
          xs={6}
        />
        <WrappedTextField
          control={useFormMethods.control}
          name="email"
          label="Email"
          required
          placeholder="joe@david.com"
          xs={6}
        />
        <WrappedTextField
          control={useFormMethods.control}
          name="phoneNumber"
          label="Phone Number"
          placeholder="+14377337372"
          required
          xs={6}
        />
        <WrappedTextField
          control={useFormMethods.control}
          name="fullAddress"
          label="Address"
          xs={6}
        />
        <WrappedTextField
          control={useFormMethods.control}
          name="password"
          label="Password"
          type="password"
          xs={6}
          required
        />
        <WrappedTextField
          control={useFormMethods.control}
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          xs={6}
          required
        />
        <Grid item xs={12} mt={3}></Grid>
      </WrappedForm>
      <Typography variant="body1" style={{ color: '#9e9d9d' }} mt={5}>
        Already have a account?&nbsp;&nbsp;
        <span style={{ color: '#3d3d3d' }}>Log In</span>
      </Typography>
    </Box>
  );
};

export default RegisterForm;
