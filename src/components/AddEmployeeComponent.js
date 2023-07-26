
import React, { useState, useEffect } from 'react'
import EmployeeService from '../services/EmployeeService'
import { Link, useParams } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const AddEmployeeComponent = () => {
    const [firstName, setfirstName] = useState("")
    const [lastName, setlastName] = useState("")
    const [emailId, setemail] = useState("")
    const [phoneNo, setphone] = useState("")
    const { id } = useParams()
    const register = useSelector(state => state.loggedInUser)
    const navigate = useNavigate();
    const [open, setOpen] = useState(true);

    const [message, setMessage] = useState('');
    const [severityy, setSeverity] = useState('');
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

    const SnackBarHandle=(message,severity)=>{
    
        setOpen(true);
        setMessage(message)
        setSeverity(severity)
        
      }

    const saveEmployee = (e) => {
        e.preventDefault();
        

        const employee = { firstName, lastName, emailId, phoneNo, register }
        
        if (id) {
            EmployeeService.updateEmployee(id, employee).then((response) => {
                
                SnackBarHandle("Employee updated Successfully","success")
                setTimeout(() => {
                    
                    navigate("/employees")
                }, 2000);
            })
                .catch((er) => {
                    console.log(er);
                })
        }
        else {
            EmployeeService.addEmployee(employee).then((response) => {
                
                SnackBarHandle("Employee added Successfully","success")
                setTimeout(() => {
                    
                    navigate("/employees")
                }, 2000);
            })
                .catch(err => {
                    console.log(err);
                })
        }

    }

    useEffect(() => {

        if (id) {

            EmployeeService.getEmployeeById(id).then((response) => {

                setfirstName(response.data.firstName)
                setlastName(response.data.lastName)
                setemail(response.data.emailId)
                setphone(response.data.phoneNo)
            }).catch(error => {
                console.log(error)
            })

        }
    }


        , [])


    const title = () => {

        if (id) {
            return <h2 className="text-center">Update Employee</h2>
        } else {
            return <h2 className="text-center">Add Employee</h2>
        }
    }

    return (
        <div>

            <br></br><br></br>

            <div className='container'>
                <div className='row'>

                    <div className='card col-md-6 offset-md-3 offset-md-3 '>
                        {title()}
                        <div className='card-body'>


                            <div className='form-group mb-2'>
                                <label className='form-label'>First Name :</label>
                                <input
                                    type='text'
                                    placeholder='Enter First Name'
                                    className='form-control'
                                    value={firstName}
                                    onChange={(e) => setfirstName(e.target.value)}
                                />
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Last Name :</label>
                                <input
                                    type='text'
                                    placeholder='Enter Last Name'
                                    className='form-control'
                                    value={lastName}
                                    onChange={(e) => setlastName(e.target.value)}
                                />
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Email  :</label>
                                <input
                                    type='text'
                                    placeholder='Enter Email'
                                    className='form-control'
                                    value={emailId}
                                    onChange={(e) => setemail(e.target.value)}
                                />
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Phone  :</label>
                                <input
                                    type='text'
                                    placeholder='Enter phone '
                                    className='form-control'
                                    value={phoneNo}
                                    onChange={(e) => setphone(e.target.value)}
                                />
                            </div>

                            <button className='btn btn-success' style={{ marginRight: "10px" }} onClick={(e) => saveEmployee(e)}>Save </button>

                            <Link to="/employees" className='btn btn-danger'>cancel</Link>
                            <Snackbar anchorOrigin={{ vertical, horizontal }} open={open} autoHideDuration={2000} onClose={handleClose}>
                                <Alert onClose={handleClose} severity={severityy} sx={{ width: '100%' }}>
                                    {message}
                                </Alert>
                            </Snackbar>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default AddEmployeeComponent
