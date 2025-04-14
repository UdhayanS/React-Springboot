import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './HomePage.css';

function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    rollNumber: '',
    email: '',
    mobile: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/register', formData);
      alert('Registration successful!');
    } catch (err) {
      console.error(err);
      alert('Registration failed.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label>Roll Number</label>
            <input
              type="text"
              name="rollNumber"
              placeholder="Enter your roll number"
              value={formData.rollNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label>Mobile</label>
            <input
              type="text"
              name="mobile"
              placeholder="Enter your mobile number"
              value={formData.mobile}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="login-btn">
            Register
          </button>
          <div className="register-link">
            <p>
              Already registered? <Link to="/">Login here</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegistrationForm;



