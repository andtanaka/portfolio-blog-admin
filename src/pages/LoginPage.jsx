import { ToastContainer } from 'react-toastify';
import Container from 'react-bootstrap/Container';
import LoginForm from '../components/LoginForm';

function LoginPage() {
  return (
    <Container className="px-0 px-sm-1">
      <LoginForm />
      <ToastContainer />
    </Container>
  );
}

export default LoginPage;
