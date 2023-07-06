
import React, { useState,useEffect } from 'react'
import EmployeeService from '../services/EmployeeService'
import { Link, useParams } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

const AddEmployeeComponent = () => {
    const [firstName,setfirstName]=useState("")
    const [lastName,setlastName]=useState("")
    const [emailId,setemail]=useState("")
    const [phoneNo,setphone]=useState("")
    const {id}=useParams()
    const register=useSelector(state=>state.loggedInUser)
    const navigate = useNavigate();

    const saveEmployee=(e)=>{
        e.preventDefault();

        const employee={firstName,lastName,emailId,phoneNo,register}
        console.log("----",firstName,lastName,emailId,phoneNo,register.id);
        if(id){
            EmployeeService.updateEmployee(id,employee).then((response)=>{
          console.log("update success");
          navigate("/employees")
            })
            .catch((er)=>{
                console.log(er);
            })
        }
        else{
            EmployeeService.addEmployee(employee).then((response)=>{
                navigate("/employees")
            })
            .catch(err=>{
                console.log(err);
            })
        }
        
    }

    useEffect(() => {

        if(id){

            EmployeeService.getEmployeeById(id).then((response) =>{
             
                setfirstName(response.data.firstName)
                setlastName(response.data.lastName)
                setemail(response.data.emailId)
                setphone(response.data.phoneNo)
            }).catch(error => {
                console.log(error)
            })

        }
    }
    
    
    ,[])
        
  
    const title = () => {

        if(id){
            return <h2 className = "text-center">Update Employee</h2>
        }else{
            return <h2 className = "text-center">Add Employee</h2>
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
                                onChange={(e)=>setfirstName(e.target.value)}
                            />
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Last Name :</label>
                            <input
                                type='text'
                                placeholder='Enter Last Name'
                                className='form-control'
                                value={lastName}
                                onChange={(e)=>setlastName(e.target.value)}
                            />
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Email  :</label>
                            <input
                                type='text'
                                placeholder='Enter Email'
                                className='form-control'
                                value={emailId}
                                onChange={(e)=>setemail(e.target.value)}
                            />
                        </div>
                        <div className='form-group mb-2'>
                            <label className='form-label'>Phone  :</label>
                            <input
                                type='text'
                                placeholder='Enter phone '
                                className='form-control'
                                value={phoneNo}
                                onChange={(e)=>setphone(e.target.value)}
                            />
                        </div>

                        <button className='btn btn-success' style={{marginRight:"10px"}} onClick={(e)=>saveEmployee(e)}>Save </button>

                        <Link to="/employees" className='btn btn-danger'>cancel</Link>
                   

                </div>

            </div>

        </div>

    </div>

    </div>
  )
}

export default AddEmployeeComponent
