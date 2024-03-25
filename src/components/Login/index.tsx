import LoginForm from './LoginForm';
import { LoginGuide } from '../../assets';
import WrappedDialog from '../Wrappers/WrappedDialog/WrappedDialog';

const Login = () => {
  return (
    <WrappedDialog
      title="Login"
      content={<LoginForm />}
      animationData={LoginGuide}
    />
  );
};

export default Login;
