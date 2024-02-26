import { ToastContainer } from 'react-toastify';
import Container from 'react-bootstrap/Container';
import LoginForm from '../components/LoginForm.jsx';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    //verifica se o user já está loggado
    if (userInfo) {
      navigate('/admin');
    }
  }, [userInfo]);

  return (
    <Container className="px-0 px-sm-1">
      <LoginForm />
      <ToastContainer />
    </Container>
  );
}

export default LoginPage;
