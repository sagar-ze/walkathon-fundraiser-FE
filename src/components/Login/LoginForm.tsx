import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import loginSchema from './utils/validation';
import WrappedForm from '../Wrappers/WrappedForm/WrappedForm';
import { useMutation } from '@tanstack/react-query';
import WrappedTextField from '../Wrappers/WrappedInput/WrappedTextField';

const LoginForm = () => {
  const useFormMethods = useForm({
    resolver: zodResolver(loginSchema),
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
    </WrappedForm>
  );
};

export default LoginForm;
