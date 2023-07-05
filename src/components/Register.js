import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../CSS/Registration.css';
import { Link } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

const RegistrationPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email_id, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  

  
  const handleSubmit = (e) => {


    e.preventDefault();
    // register(username, password);
    if (!username || !password || !confirmPassword ||!email_id) {
      setError('Please fill in all fields');
    } else if (password !== confirmPassword) {
      setError('Passwords do not match');
    } 
    else{
      setError('')
      const user={username,password,confirmPassword,email_id}
      // console.log("before ",user);
    
      EmployeeService.addRegsiteredUser(user).then((response)=>{
          console.log("success registerred!!",response.data);
          navigate("/login");
      })
      .catch((e)=>{
        console.log(e);
      })
    }
  };

  return (
    <div className="registration-page">
      <div className="background-image" />
      <div className="registration-form">
       <center> <h2>Registration</h2></center>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={e=>setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={e=>setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={e=>setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">email</label>
            <input
              type="email"
              id="email"
              value={email_id}
              onChange={e=>setEmail(e.target.value)}
            />
          </div>
          {/* <div className="form-group">
            <label htmlFor="phone">Phone No.</label>
            <input
              type="email"
              id="phone"
              value={phoneNumber}
              onChange={e=>setphoneNumber(e.target.value)}
            />
          </div> */}
          <button type="submit">Register</button>
          <span>already signed in   </span>
          <Link to={`/login`}>Login</Link>
        </form>
      </div>
    </div>
  );
};

// const mapDispatchToProps = {
//   register,
// };

export default RegistrationPage;
