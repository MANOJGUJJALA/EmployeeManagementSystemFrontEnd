
import React from 'react'
import { useSelector } from 'react-redux'
import '../CSS/navbar.css'

const HeaderComponent = () => {
  const currentUser=useSelector(state=>state.loggedInUser)
  return (
    <div>
      <header>
        <nav className='navbar navbar-expand-md navbar-dark bg-dark'>

            <div>
                <a href='/' className='navbar-brand'>
                    Employee Management Application
                </a>
            </div>
           {
            currentUser&&(<div className='logout'>
            <a href='/' className='navbar-brand'>
               Log Out
            </a>
        </div>)
           }
            
           
       
        <ul>
          <li>
            Log Out
          </li>
        </ul>
    


      
      
  
     
        </nav>
      </header>
    </div>
  )
}

export default HeaderComponent
