import axios from 'axios'

const EMPLOYEE_BASE_REST_API_URL='http://localhost:8080/api/v1/employees'
const REGISTER_BASE_REST_API_URL='http://localhost:8080/api/v1/registers'
// https://employeemanagementsystembackend-production-aaf5.up.railway.app
// http://localhost:8080
class EmployeeService{

    getAllEmployees(currentUserId){
        return axios.get(EMPLOYEE_BASE_REST_API_URL);
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

    addRegsiteredUser(registeredUser){
        return axios.post(REGISTER_BASE_REST_API_URL,registeredUser)
    }

    validateLoggedInuser(user){
        return axios.post(REGISTER_BASE_REST_API_URL+'/user',user)
    }

    addEmployee(employee){

        return axios.post(REGISTER_BASE_REST_API_URL+'addemployee',employee)
         
     }
    
}

export default new EmployeeService();