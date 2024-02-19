import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLogoutMutation } from '../store';
import { logout } from '../store/slices/authSlice';

function LogNavApp({ className }) {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApi] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();
      dispatch(logout());
      navigate('/login');
      navigate(0); //dá refresh na página para limpar o cache
    } catch (err) {
      console.log(err);
      dispatch(logout()); //limpa os dados do usuário do local storage
    }
  };
  return (
    <div className={className}>
      {userInfo ? (
        <>
          <Link className="btn me-2" to="/admin">
            Home
          </Link>
          <Link className="btn " to="/" onClick={handleLogout}>
            Logout
          </Link>
        </>
      ) : (
        <div>
          <Link className="btn " to="/login">
            Login
          </Link>
          <Link className="btn " to="/signup">
            Sign up
          </Link>
        </div>
      )}
    </div>
  );
}

export default LogNavApp;
