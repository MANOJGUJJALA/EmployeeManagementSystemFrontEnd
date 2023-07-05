import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import '../CSS/LoginPage.css';
import EmployeeService from '../services/EmployeeService';


const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
 
  const dispatch=useDispatch();
  const navigate = useNavigate();


  const checkUser=(user)=>{
    
    EmployeeService.validateLoggedInuser(user).then((response)=>{
      console.log("--",response.data);


      dispatch({
        type:'LOGIN',
        payload:response.data
    })

    navigate("/employees");
    }).catch((e)=>{
      setError('Wrong Credentials')
      setPassword('')
      setUsername('')
        navigate("/login");
      console.log(e);
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // login(username, password);
    if (!username || !password ) {
        setError('Please fill in all fields');
      } 
      else{
        setError('')
        const user={username,password}
        checkUser(user)
        setError('')
      }
  };

  return (
    <div className="login-page">
      
      <div className="login-form">
      <center>  <h2>Login</h2></center>
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
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

// const mapDispatchToProps = {
//   login,
// };

export default LoginPage;
