import { Menu, Container } from 'semantic-ui-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetUser } from './features/user/userSlice';
import PersonSharpIcon from '@mui/icons-material/PersonSharp';
import { logout } from './features/user/userApi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((st) => st.user.currentUser);
  let userName=user;
  const handleItemClick = (path) => {
    navigate(path);
  };

  return (
 
    <Container    style={{width:"100%",textAlign:"center"
    ,justifyContent: 'center' ,position: "sticky",top:"0", zIndex: "1000"}}>

      
      
       <Menu stackable  pointing inverted   style={{width:"100%",
         justifyContent: 'center'}}>



             {user !== null && (
           <Menu.Item   style=
           {{width:"10%",justifyContent:"center"}}
            name="logout"
            onClick={() => {
              logout().then(res=>{dispatch(resetUser());
              handleItemClick('/login');}).
              catch(err=>{
                toast.error("הפעולה נכשלה. ארעה שגיאה", {
                  position: 'top-center',
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
              });
                toast.error(err.response?.data, {
                    position: 'top-center',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
              }
              )
              
            }}
           
          >
            יציאה
          </Menu.Item>
        )}
       
           <Menu.Item    style=
           {{width:"10%",justifyContent:"center"}}
            name="addAppointment"
            as={NavLink}
            to="/addAppointment"
            activeClassName="active"
            onClick={() => handleItemClick('/addAppointment')}
          >
        לקביעת תור
                      </Menu.Item>
       
        
     
          
        <Menu.Item   style=
        {{width:"10%",justifyContent:"center"}}
          name="appointments"
          as={NavLink}
          to="/appointments"
          activeClassName="active"
          onClick={() => handleItemClick('/appointments')}
        >
          רשימת התורים
        </Menu.Item>
     
        {!userName&&<Menu.Item   style=
        {{width:"10%",justifyContent:"center"}}
          name="login"
          as={NavLink}
          to="/login"
          activeClassName="active"
          onClick={() => handleItemClick('/login')}
        >
          להתחברות
        </Menu.Item>}
     
      {userName&&(
      <Menu.Item header    style=
      {{width:"10%",justifyContent:"center"}}      
        name="hello">
        
        
      {userName}
      
         <PersonSharpIcon style={{marginLeft:"6px"}}/>
        </Menu.Item>)}

      </Menu>
    </Container>
  );
};

export default NavBar;