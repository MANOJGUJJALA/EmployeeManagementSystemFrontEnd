
import{ legacy_createStore as createStore} from 'redux'
const initialState={
    
    loggedInUser:null,
    
}

const reducer =(state=initialState,action)=>{

    switch (action.type) {
        case "LOGOUT":
            
            return {
                ...state,
                users:[...state.users,action.payload]
            }
        case 'LOGIN':
            
            return{
                ...state,
                loggedInUser:action.payload
            }
            
       
    
        default:
            return state;
    }

}


export default createStore(reducer)