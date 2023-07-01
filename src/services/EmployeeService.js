import axios from 'axios'

const EMPLOYEE_BASE_REST_API_URL='https://demo-production-5997.up.railway.app/api/v1/employees'

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