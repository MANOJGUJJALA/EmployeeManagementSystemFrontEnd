
import './App.css';
import AddEmployeeComponent from './components/AddEmployeeComponent';
import FooterComponent from './components/FooterComponent';
import HeaderComponent from './components/HeaderComponent';
import ListEmployeeComponent from './components/ListEmployeeComponent';
import {BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import Login from './components/Login';
import RegistrationPage from './components/Register';

function App() {
  return (
    <div >
      <Router>

      <HeaderComponent/>
      <div className='container'>
        <Routes>
          <Route exact path='/' Component={RegistrationPage}> </Route>
          <Route exact path='/login' Component={Login}> </Route>
          <Route path='/employees' Component={ListEmployeeComponent}> </Route>
          <Route path='/add-employee' Component={AddEmployeeComponent}> </Route>
          <Route path='/edit-employee/:id' Component={AddEmployeeComponent}> </Route>
        </Routes>

      </div>
     
      <FooterComponent/>

      </Router>
    </div>
  )
      
}

export default App;
