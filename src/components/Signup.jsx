import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/', { name, email, password, role }) // Corrected endpoint URL
      .then(result => {
        console.log(result);
        navigate('/Login');
      })
      .catch(err => console.log(err));
  };

  const selectRole = (e) => { 
    const selectedOption = e.target.value;
    setRole(selectedOption);
  };

  return (
    <div className="flex justify-center items-center bg-gray-200 rounded shadow h-screen">
      <div className="bg-white p-3 rounded w-1/4">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="block">
              <strong>Name</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              autoComplete="off"
              name="name"
              className="form-input rounded"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="block">
              <strong>Email</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              className="form-input rounded"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="block">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              className="form-input rounded"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="role" className="block">
              <strong>Role</strong>
            </label>
            <select onChange={selectRole}>
              <option value="Student">Student</option> 
              <option value="Teacher">Teacher</option> 
            </select>
          </div>
          <button type="submit" className="btn btn-success w-full rounded">
            Register
          </button>
        </form>
        <p className="mt-4">Already Have an Account</p>
        <Link to="/Login" className="btn btn-default border w-full bg-gray-200 rounded text-decoration-none">
          Login
        </Link>
      </div>
    </div>
  );
}

export default Signup;
