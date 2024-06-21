import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Modal, Segment } from 'semantic-ui-react';
import {Icon} from 'semantic-ui-react';
import { deleteAppointment } from './appointmentApi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ListItem = ({ item,fetchData}) => {
    const [open, setOpen] = useState(false);
    const user=useSelector(st=>st.user.currentUser);
    const navigate=useNavigate();

    const handleDelete = async () => {
        const userConfirmed = window.confirm('האם אתה בטוח שברצונך לבטל תור זה?');
    
        if (userConfirmed) {
         
          try {
            let res = await deleteAppointment(item.id)
      
             toast.success( '! תורך בוטל בהצלחה  ', {
              position: 'top-center',
              autoClose: 3000, // מספר המילישני שתוצג ההתראה
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            }); 
            fetchData();
          
           
        
        } catch (err) {
           
                
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
               
               }
            }

    const formatDate = (dateString) => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('he-IL', options);
    };

    
 


    const formatTime2 = (dateString) => {
        const options = { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Jerusalem' };
        const date = new Date(dateString);
       
        return date.toLocaleTimeString('he-IL', options);
    };

    return (
        <Segment.Group raised>
            <Segment  onClick={() => setOpen(true)} style={{ cursor: 'pointer',backgroundColor:"rgb(241, 236, 236)" }}>
                
                
                <p>מועד התור: {formatDate(item.appointmentTime)} בשעה {formatTime2(item.appointmentTime)}</p>
                <p> {item.userName} : שם הלקוח  </p>
                <p>{item.haircutType} : סוג התספורת</p>
               
                {item.userName==user&&<Icon name="trash" style={{"color":"rgb(69, 195, 195)"}} onClick={handleDelete} />}
                {item.userName==user&&<Icon name="edit"style={{"color":"rgb(69, 195, 195)"}}  onClick={()=>navigate("/editAppointment/"+item.id,
                      { state: { item: item } }
                )} />}
            </Segment>

            <Modal style={{"direction":"rtl","textAlign":"center"}}
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
            >
                <Modal.Header>פרטי התור</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <p>שם הלקוח: {item.userName}</p>
                        <p>מועד התור: {formatDate(item.appointmentTime)} בשעה {formatTime2(item.appointmentTime)}</p>
                        <p>זמן יצירת התור: {formatDate(item.schedulingDate)} בשעה {formatTime2(item.schedulingDate)}</p>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='black' onClick={() => setOpen(false)}>
                        סגור
                    </Button>
                </Modal.Actions>
            </Modal>
        </Segment.Group>
    );
}

export default ListItem;
