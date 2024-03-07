import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import loginForgetSchema from './utils/validation';
import WrappedForm from '../Wrappers/WrappedForm/WrappedForm';
import { useMutation } from '@tanstack/react-query';
import WrappedTextField from '../Wrappers/WrappedInput/WrappedTextField';

const LoginForgetForm = () => {
  const useFormMethods = useForm({
    resolver: zodResolver(loginForgetSchema),
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  const mutation = useMutation({
    mutationFn: () => { //TODO: create and call service to send email
      throw new Error('Error encountered in forget password.');
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
    </WrappedForm>
  );
};

export default LoginForgetForm;
