import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from './utils/validation';
import WrappedForm from '../Wrappers/WrappedForm/WrappedForm';
import { useMutation } from '@tanstack/react-query';
import WrappedTextField from '../Wrappers/WrappedInput/WrappedTextField';
import userService, { RegisterSchema } from '../../services/userService';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const navigate = useNavigate();
  const useFormMethods = useForm({
    resolver: zodResolver(registerSchema),
  });

  console.log('useFormMethods', useFormMethods.formState.errors);

  const mutation = useMutation({
    mutationFn: (data: RegisterSchema) => userService.register(data),
    onSuccess: () => navigate('/register/email-confirmation'),
  });

  return (
    <WrappedForm
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      mutation={mutation as any}
      useFormMethods={useFormMethods}
      createSuccessText="Welcome to walkathon."
    >
      Register
      <WrappedTextField
        control={useFormMethods.control}
        name="fullName"
        label="Full Name"
        required
      />
      <WrappedTextField
        control={useFormMethods.control}
        name="email"
        label="Username/Email"
        required
      />
      <WrappedTextField
        control={useFormMethods.control}
        name="phoneNumber"
        label="Phone Number"
        required
      />
      <WrappedTextField
        control={useFormMethods.control}
        name="fullAddress"
        label="Address"
      />
      <WrappedTextField
        control={useFormMethods.control}
        name="password"
        label="Password"
        type="password"
      />
      <WrappedTextField
        control={useFormMethods.control}
        name="confirmPassword"
        label="Confirm Password"
        type="password"
      />
    </WrappedForm>
  );
};

export default RegisterForm;
