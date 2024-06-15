import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRouteForUser = ({children}) => {
    const user=useSelector(st=>st.user.currentUser);
   
    if(user==null){
        
          return <Navigate to="/login"/>;
    }
  
    return children;
}
 
export default ProtectedRouteForUser;