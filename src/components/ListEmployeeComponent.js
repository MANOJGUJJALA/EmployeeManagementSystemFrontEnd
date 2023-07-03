
import React, { useEffect, useState } from 'react'
import EmployeeService from '../services/EmployeeService';
import { Link } from 'react-router-dom';

const ListEmployeeComponent = () => {
  const [employees,setemployees]=useState([]);
  const [search,setSearch]=useState('')

  useEffect(()=>{

    getAllEmployees()

  },[])

  const getAllEmployees=()=>{
    EmployeeService.getAllEmployees().then((Response)=>{
        setemployees(Response.data)
        
    }).catch((er)=>{
        console.log(er);
    })

  }

  const deleteEMployee=(employeeId)=>{


    EmployeeService.deleteEmployee(employeeId).then((response)=>{

            getAllEmployees()

    })
    .catch((err)=>{
        console.log(err);
    })
  }


  return (
    <div className='container'>
        <h2 className='text-center'>List Employees</h2>
        <div className='search'>
        <Link to="/add-employee" className='btn btn-primary mb-2'>Add Employee</Link>

        <input type='text' 
         placeholder='search here..'
          className='searchBar'
         value={search}
         onChange={(event)=>setSearch(event.target.value)}/> 
         <span class="icon">🔍</span>
        </div>

      <div className='outer-wrapper'> 
          <div className='table-wrapper'>

         

        <table className='table table-bordered table-striped'>
        <thead>
                    <th> Employee Id </th>
                    <th> Employee First Name </th>
                    <th> Employee Last Name </th>
                    <th> Employee Email Id </th>
                    <th>  Phone Number </th>
                    <th> Actions </th>
                </thead>
            <tbody>
                {
                  employees.filter((employee)=>{
                      if(search===""){
                        return employee
                      }
                      else if(employee.firstName.toLowerCase().includes(search.toLowerCase())){
                          return employee
                      }
                      else if(employee.lastName.toLowerCase().includes(search.toLowerCase())){
                        return employee
                    }
                    else if(employee.emailId.toLowerCase().includes(search.toLowerCase())){
                      return employee
                  }
                  else if(employee.phoneNo.toLowerCase().includes(search.toLowerCase())){
                    return employee
                }
                  })
                    .map(employee=>
                    
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.emailId}</td>
                                <td>{employee.phoneNo}</td>
                                <td>
                                    <Link to={`/edit-employee/${employee.id}`} className='btn btn-info'>Update</Link>
                                    <button className='btn btn-danger' onClick={()=>deleteEMployee(employee.id)}
                                    
                                    style={{marginLeft:"10px"}}>Delete</button>
                                   
                                </td>
                        </tr>
                    
                     )
                }
            </tbody>

        </table>
        </div>
      </div>
      
    </div>
  )
}

export default ListEmployeeComponent
