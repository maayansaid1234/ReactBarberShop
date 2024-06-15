import AppointmentForm from "./AppointmentForm"
import {  updateAppointment } from './appointmentApi';
import {toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import "../../toastCss.css"
import { useParams,useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';

 const EditAppointment = () => {
    const navigate=useNavigate()
    const id=useParams().id;
    let location=useLocation();
    let item=location.state.item;
    

   const update=(dateTime,haircutId)=>{

      
        updateAppointment(id,{appointmentTime:dateTime,haircutId}).then(res=>{
        toast("! תורך נקלט בהצלחה במערכת ", {
          position: 'top-center',
          className: "toast-message",
        });
          console.log(res.data);
        }).catch(
          err=>{
            console.log(err)
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
                toast.error("מועד זה תפוס כבר, אנא בחר מועד אחר  "
              , {
                position: 'top-center',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

              else
              toast.error("הפעולה נכשלה.ארעה שגיאה ", {
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
      };
 
     
     return (<AppointmentForm func={update} item={item}/>  );
 }
export default EditAppointment;
