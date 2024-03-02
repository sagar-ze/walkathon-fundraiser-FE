import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from './utils/validation';
import WrappedForm from '../Wrappers/WrappedForm/WrappedForm';
import { useMutation } from '@tanstack/react-query';
import WrappedTextField from '../Wrappers/WrappedInput/WrappedTextField';

const RegisterForm = () => {
  const useFormMethods = useForm({
    resolver: zodResolver(registerSchema),
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  const mutation = useMutation({
    mutationFn: () => {
      throw new Error('Something happeneds');
    },
  });

  return (
    <WrappedForm
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      mutation={mutation as any}
      useFormMethods={useFormMethods}
    >
      <WrappedTextField
        control={useFormMethods.control}
        name="email"
        label="Email"
      />
      <WrappedTextField
        control={useFormMethods.control}
        name="password"
        label="Password"
        type="password"
      />
      <WrappedTextField
        control={useFormMethods.control}
        name="fullName"
        label="Full name"
      />
      <WrappedTextField
        control={useFormMethods.control}
        name="phoneNumber"
        label="Phone Number"
      />
    </WrappedForm>
  );
};

export default RegisterForm;
