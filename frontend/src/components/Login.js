import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/users/login', { email, password });
      localStorage.setItem('authToken', data.token);
      navigate('/camera');
    } catch (error) {
      alert('Invalid credentials');
      console.log(error);
    }
  };

  return (
    <div style={{ height: '100vh', backgroundColor: '#93d2e8', padding:'80px'}} >
    <div className='container  w-50'>
    <form onSubmit={handleSubmit} >
      {/* Email input */}
      <div className="form-outline mb-4">
        <input
          type="email"
          id="form2Example1"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label className="form-label" htmlFor="form2Example1">Email address</label>
      </div>

      {/* Password input */}
      <div className="form-outline mb-4">
        <input
          type="password"
          id="form2Example2"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label className="form-label" htmlFor="form2Example2">Password</label>
      </div>


      {/* Submit button */}
      <div className='text-center'>
      <button type="submit" className="btn btn-primary btn-block mb-4 ">Sign in</button>
      </div>

      {/* Register buttons */}
      <div className="text-center">
        <p>Not a member? <Link to="/register">Register</Link></p>
      </div>
    </form>
    </div>
    </div>
  );
};

export default Login;
