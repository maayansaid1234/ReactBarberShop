import ListItem from "./ListItem";
import React, { useState, useEffect } from "react";
import './AppointmentsList.css'; 
import { getAppointments } from "./appointmentApi";
import { Select, Input } from 'semantic-ui-react';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AppointmentsList = () => {

    const navigate=useNavigate()
    let [arr, setArr] = useState([]);
    let [filteredArr, setFilteredArr] = useState([]);
    let [filterType, setFilterType] = useState(''); // Type of filter (name or date)
    let [filterValue, setFilterValue] = useState(''); // Value to filter by (text or date)

    function fetchData() {
        getAppointments()
            .then(res => {
                const relevantAppointments = res.data.sort((a, b) => new Date(a.appointmentTime) - new Date(b.appointmentTime)).filter(a=>new Date(a.appointmentTime).getTime()>=new Date().getTime());
                setArr(relevantAppointments);
                setFilteredArr(relevantAppointments); // Initialize filteredArr with the original data
            }).catch(
                err=>{
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
               
              )
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        filterAppointments();
    }, [filterType, filterValue]);

    const handleFilterTypeChange = (e, { value }) => {
        setFilterType(value);
        setFilterValue(''); // Reset filter value when changing filter type
    };

    const handleFilterValueChange = (e) => {
        setFilterValue(e.target.value);
    };

    const filterAppointments = () => {
        let filtered = [...arr];
        if (filterType === 'name') {
            filtered = filtered.filter(appointment => 
                appointment.userName.toLowerCase().includes(filterValue.toLowerCase())
            );
        } else if (filterType === 'date') {
            filtered = filtered.filter(appointment => 
                appointment.appointmentTime.includes(filterValue)
            );
        }
        setFilteredArr(filtered);
    };

    return (
        <div className="appointments-container">
            <div id="stickyDiv" /*style={{ position: "sticky",top:"90px",zIndex: "999"
                ,backgroundColor:"#cae9f4"
            }} */  >
            <h1>רשימת תורים</h1>
            
            {filterType && (
                <Input 
                    placeholder={filterType === 'name' ? 'הכנס שם לקוח' : 'בחר תאריך'}
                    type={filterType === 'name' ? 'text' : 'date'}
                    onChange={handleFilterValueChange}
                    value={filterValue}
                    style={{ marginBottom: '20px' }}
                />
            )}
            <Select 
                placeholder='בחר סוג סינון' 
                options={[
                    { key: 'none', value: '', text: 'ללא סינון' },
                    { key: 'name', value: 'name', text: 'שם הלקוח' },
                    { key: 'date', value: 'date', text: 'תאריך' }
                ]}
                onChange={handleFilterTypeChange}
                value={filterType}
                style={{ marginBottom: '20px' }}
            />


                        </div>
            <ul className="appointments-list">
                {filteredArr.map(appointment => (
                    <li key={appointment.id} className="appointment-item">
                        <ListItem item={appointment} fetchData={fetchData} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AppointmentsList;
