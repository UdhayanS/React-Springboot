import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './HomePage.css'; // Assuming the styles are saved in LoginPage.css

function LoginForm() {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate(); // For redirecting to Home page

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/api/login', loginData);
      if (res.data === 'Login successful!') {
        // On success, navigate to Home page
        navigate('/home');
      } else {
        alert('Invalid email or password!');
      }
    } catch (err) {
      console.error(err);
      alert('Login failed');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleLoginChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleLoginChange}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
        <div className="register-link">
          <p>Don't have an account?</p>
          <a href="/register">Click here to register</a>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
