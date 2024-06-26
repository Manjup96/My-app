import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/ApiServices';
import '../../styles/components/LoginForm.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../../Asset/images/company logo.png';

const Login = () => {
  const [email, setEmail] = useState('chetan.chauhan@example.com');
  const [password, setPassword] = useState('Chetan@303');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await loginUser(email, password, login);
      setLoading(false);
      navigate('/dashboard');
      toast.success('Login successful');
    } catch (error) {
      setLoading(false);
      setError('An error occurred. Please try again.');
      toast.error('Login failed');
    }
  };

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div className="login-box">
      <div >
      <img className='logo-login' src={logo} alt="Logo" />
      </div>
        <h2>PG Tenant Login</h2>
        <form>
          <div className="user-box">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="user-box">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <input
            onClick={handleSubmit}
            className="inputButton"
            type="button"
            value={loading ? 'Loading...' : 'Login'}
          />
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
