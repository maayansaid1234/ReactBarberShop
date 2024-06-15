import AppointmentForm from "./AppointmentForm"
import { addAppointment } from './appointmentApi';
import {toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import "../../toastCss.css"
import { useNavigate } from "react-router-dom";

 const AddAppointment = () => {
  const navigate=useNavigate();
     const add=(dateTime,haircutId)=>{
       
        addAppointment({appointmentTime:dateTime,haircutId}).then(res=>{
        toast("! תורך נקלט בהצלחה במערכת ", {
          position: 'top-center',
          className: "toast-message",
        });
          console.log(res.data);
        }).catch(
          err=>{
            console.log(err.response?.request?.status)
            if(err.response?.request?.status==401)
              {
                toast.error("  פג תוקף משתמש. הנך מועבר לדף כניסה למערכת ", {
                  position: 'top-center',
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
               
                }); 
              navigate("/login")
              }
            else
              if(err.response?.request?.status==409)
              toast.error("מועד זה תפוס כבר, אנא בחר מועד אחר  ", {
                  position: 'top-center',
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
               
                });

              else
              toast("הפעולה נכשלה.ארעה שגיאה ", {
                position: 'top-center',
                className: "error-message",
              });
            }
         
        )
      };
 
     
     return (<AppointmentForm func={add}/>  );
 }
export default AddAppointment;