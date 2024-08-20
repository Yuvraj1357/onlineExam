import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/users/register', {
        name,
        email,
        password,
      });
      console.log(response);
      navigate('/login');
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Error during registration');
    }
  };

  return (
    <section className="">
      <div className="px-4 py-5 px-md-5 text-center text-lg-start" style={{ backgroundColor: 'hsl(0, 0%, 96%)' }}>
        <div className="container">
          <div className="row gx-lg-5 align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <h1 className="my-5 display-3 fw-bold ls-tight">
                The best platform <br />
                <span className="text-primary">for secure, reliable exam</span>
              </h1>
              <p style={{ color: 'hsl(217, 10%, 50.8%)' }}>
                Practice tests are an essential tool in mastering any subject. They help you identify your strengths and weaknesses, familiarize yourself with the test format, and build confidence. By simulating real test conditions, our platform enables you to refine your skills and improve your performance, ensuring you're fully prepared for the actual exam.
              </p>
            </div>

            <div className="col-lg-6 mb-5 mb-lg-0">
              <div className="card">
                <div className="card-body py-5 px-md-5">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="mb-4">
                        <div className="form-outline">
                          <input
                            type="text"
                            id="name"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                          />
                          <label className="form-label" htmlFor="name">First name</label>
                        </div>
                      </div>
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="email"
                        id="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <label className="form-label" htmlFor="email">Email address</label>
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        id="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <label className="form-label" htmlFor="password">Password</label>
                    </div>

                    <div className='text-center'>
                      <button type="submit" className="btn btn-primary btn-block mb-4 m-3">
                        Sign up
                      </button>
                      <p>You are already registered. Please <Link to={'/login'}>Login</Link></p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
