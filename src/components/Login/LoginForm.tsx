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
    </WrappedForm>
  );
};

export default LoginForm;
