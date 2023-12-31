import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../CSS/Registration.css';
import { Link } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';
import { Snackbar } from '@mui/material';


import MuiAlert from '@mui/material/Alert';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';


const RegistrationPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email_id, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [message, setMessage] = useState('Success Registered');
  const [severityy, setSeverity] = useState('success');
  const [open, setOpen] = React.useState(false);
  const [visible, setVisible] = useState(true)
  const [confirmvisible, setconfirmVisible] = useState(true)
  const vertical = "bottom";
  const horizontal = "center";


  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });




  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


  const SnackBarHandle = (message, severity) => {

    setOpen(true);
    setMessage(message)
    setSeverity(severity)

  }
  const handleSubmit = (e) => {


    e.preventDefault();
    // register(username, password);
    if (!username || !password || !confirmPassword || !email_id) {
      setError('Please fill in all fields');
    } else if (password !== confirmPassword) {
      setError('Passwords do not match');
    }
    else {
      setError('')
      const user = { username, password, confirmPassword, email_id }
      // console.log("before ",user);

      EmployeeService.addRegsiteredUser(user).then((response) => {
        // console.log("success registerred!!",response.data);

        SnackBarHandle("SuccessFully Registered !!!!", "success")
        setTimeout(() => {

          navigate("/login");
        }, 2000);
      })
        .catch((e) => {
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
              className='form-control'
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group passwordIcon">
            <label htmlFor="password" className=''>Password</label>
            <div className='flex  justify-between items-center '>

              <input
                type={visible ? "text" : "password"}
                id="password"
                value={password}
                className='form-control '
                onChange={e => setPassword(e.target.value)}
              />

              <span className='eyeIcon' onClick={()=>setVisible(!visible)}>
                {visible ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}


              </span>

            </div>
          </div>
          <div className="form-group passwordIcon2">
            <label htmlFor="confirm-password">Confirm Password</label>
            <div className='flex  justify-between items-center '>

            <input
              type={confirmvisible ? "text" : "password"}
              id="confirm-password"
              value={confirmPassword}
              className='form-control'
              onChange={e => setConfirmPassword(e.target.value)}
              />
              </div>
              <span className='eyeIcon2' onClick={()=>setconfirmVisible(!confirmvisible)}>
                {confirmvisible ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}


              </span>
          </div>
          <div className="form-group">
            <label htmlFor="email">email</label>
            <input
              type="email"
              id="email"
              value={email_id}
              className='form-control'
              onChange={e => setEmail(e.target.value)}
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


          <Snackbar anchorOrigin={{ vertical, horizontal }} open={open} autoHideDuration={2000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={severityy} sx={{ width: '100%' }}>
              {message}
            </Alert>
          </Snackbar>
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
