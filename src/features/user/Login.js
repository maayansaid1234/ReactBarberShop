import { TextField } from "@mui/material";
import {useForm} from "react-hook-form";
import { login } from "./userApi";
import React,{useState} from "react";
import "./signUpCss.css"
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Button, Container } from "semantic-ui-react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import { saveUser } from "./userSlice";
import {Link,useNavigate } from "react-router-dom"


const Login = () => {
 
  const navigate=useNavigate()
    const dispatch=useDispatch();
    let [showLoading, setShowLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
      setShowPassword(!showPassword);
    };
    let {register,handleSubmit,formState:{errors,isValid}}=useForm({mode:"onSubmit"});
    const save=(data)=>{
    if(isValid)
    {
      setShowLoading(true);
        login(data).then(res =>{
           dispatch(saveUser(res.data)); 
          console.log(res.data)
           navigate("/appointments")
        setShowLoading(false)}).catch((err)=> {
          
                setShowLoading(false)
                toast.error(' הפעולה נכשלה.ארעה שגיאה', {
                  position: 'top-center',
                  autoClose: 2000, // מספר המילישני שתוצג ההתראה
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                }); 
                toast.error(err.response?.data, {
                  position: 'top-center',
                  autoClose: 5000, // מספר המילישני שתוצג ההתראה
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                }); 
                     console.log(JSON.stringify(err.message)) })
            
    }   
   }
 

    return ( <>
    <Container style={{"textAlign":"center"}}>
    {showLoading&&(<h1 style={{marginTop:"20px"  }}> ... אנא המתן</h1>)}
    {showLoading&&<Button  loading></Button>}
   {!showLoading&&<div>
 <h2 style={{marginTop:"20px"  }}> ! ברוכים השבים אלינו</h2>
    <form onSubmit={handleSubmit(save)} noValidate>
    <TextField
  placeholder=" שם משתמש"
  {...register("userName", {
    required: { value: true, message: "!שם משתמש הוא שדה חובה" },
    
  })}
/>
{errors.userName && <span className="error-message">{errors.userName.message}</span>}
   
        <TextField placeholder=" סיסמא"  type={showPassword ? 'text' : 'password'}  InputProps={{
        startAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleClickShowPassword} edge="end" style={{marginRight:"1px"}}>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
           {...register("password" ,{required:{value:true,message:"!סיסמא שדה חובה"}})}  />
        {errors.password&&<span className="error-message">{errors.password.message}</span>}

   <Button type="submit"  style={{marginBottom:"3vh"}}  color="blue"> להתחברות</Button>
    </form>
    <b>
     <div style={{"textAlign":"center"}}>    משתמש חדש ?     <Link style={{color:"blue",fontWeight:"bold"}}  to="/signUp" >   לחץ כאן להרשמה</Link> </div> 
    </b>
    </div>}
    </Container>  </> );
}
 
export default Login;