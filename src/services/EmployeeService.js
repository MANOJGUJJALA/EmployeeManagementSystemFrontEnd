import axios from 'axios'

const EMPLOYEE_BASE_REST_API_URL='https://employeemanagementsystembackend-production-aaf5.up.railway.app/api/v1/employees'
// https://employeemanagementsystembackend-production-aaf5.up.railway.app
// http://localhost:8080
class EmployeeService{

    getAllEmployees(){
        return axios.get(EMPLOYEE_BASE_REST_API_URL);
    }

    addEmployee(employee){

       return axios.post(EMPLOYEE_BASE_REST_API_URL,employee)
        
    }

    getEmployeeById(employeeid){

       return axios.get(EMPLOYEE_BASE_REST_API_URL+`/`+employeeid);
    }

    updateEmployee(id,employee){
        
        return axios.put(EMPLOYEE_BASE_REST_API_URL+ '/' +id,employee)
    }

    deleteEmployee(employeeId){
        return axios.delete(EMPLOYEE_BASE_REST_API_URL+'/'+employeeId)
    }
}

export default new EmployeeService();