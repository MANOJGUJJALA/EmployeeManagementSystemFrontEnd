
import React, { useEffect, useState } from 'react'
import EmployeeService from '../services/EmployeeService';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';


const ListEmployeeComponent = () => {
  const [employees, setemployees] = useState([]);
  const [search, setSearch] = useState('')


  const loggeduser = useSelector(state => state.loggedInUser)

  useEffect(() => {
    if (loggeduser) {

      getAllEmployees(loggeduser.id)
    }


  }, [])

  const getAllEmployees = (currentUserId) => {
    EmployeeService.getAllEmployees(currentUserId).then((Response) => {

      setemployees(Response.data)

    }).catch((er) => {
      console.log(er);
    })

  }

  const deleteEMployee = (employeeId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {

        EmployeeService.deleteEmployee(employeeId).then((response) => {

          getAllEmployees(loggeduser.id)

          Swal.fire(
            'Deleted!',
            `Employee ${employeeId} has been deleted.`,
            'success'
          )
        })
          .catch((err) => {
            console.log(err);
          })

      }
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
          onChange={(event) => setSearch(event.target.value.toString())} />
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
                employees.filter((employee) => {
                  // console.log("------",employee.phoneNo.toString(),employee.phoneNo.toLowerCase());
                  if (search === "") {
                    return employee
                  }
                  else if (employee.firstName?.toLowerCase().includes(search.toLowerCase())) {
                    return employee
                  }
                  else if (employee.lastName?.toLowerCase().includes(search.toLowerCase())) {
                    return employee
                  }
                  else if (employee.emailId?.toLowerCase().includes(search.toLowerCase())) {
                    return employee
                  }
                  else if (employee.phoneNo?.toString().includes(search.toLowerCase())) {
                    return employee
                  }
                })
                  .map(employee =>

                    <tr key={employee.id}>
                      <td>{employee.id}</td>
                      <td>{employee.firstName}</td>
                      <td>{employee.lastName}</td>
                      <td>{employee.emailId}</td>
                      <td>{employee.phoneNo}</td>
                      <td>
                        <Link to={`/edit-employee/${employee.id}`} className='btn btn-info'>Update</Link>
                        <button className='btn btn-danger' onClick={() => deleteEMployee(employee.id)}

                          style={{ marginLeft: "10px" }}>Delete</button>

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
