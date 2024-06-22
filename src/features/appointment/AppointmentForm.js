import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Box } from '@mui/material';
import { Dropdown } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import './AppointmentForm.css';
import { getAllHaircuts } from '../haircut/haircutApi';


const AppointmentForm = ({ func ,item}) => {

  if(item==null)
    {
      
  item= {
    appointmentTime: new Date(),
    haircutId:1
    }
   }
  
///------ DATETIME המרת מטיפוס APPOINTMENTTIME 
// לשני משתנים
 // DATE  ו- TIME
 // בפורמטים שיתאימו ל
 //INPUTS
 // של תאריך ושעה  
    const dateTime=new Date(item.appointmentTime);
    const year = dateTime.getFullYear();
    const month = String(dateTime.getMonth() + 1).padStart(2, '0');
    const day = String(dateTime.getDate()).padStart(2, '0');
    const hours = String(dateTime.getHours()).padStart(2, '0');
    const minutes = String(dateTime.getMinutes()).padStart(2, '0');
  
    const date = `${year}-${month}-${day}`;
    const time = `${hours}:${minutes}`;
    let today=new Date();
    const yearOfToday = today.getFullYear();
    const monthOfToday = String(today.getMonth() + 1).padStart(2, '0');
    const dayOfToday = String(today.getDate()).padStart(2, '0');
    today=`${yearOfToday}-${monthOfToday}-${dayOfToday}`;
///------//
  const { control, handleSubmit, setValue, 
    formState: { errors,isValid } } = useForm({
      
    defaultValues: {
      date,
      time,
     haircut:item.haircutId
    }
  });
  
  const [arrHaircuts, setArrHaircuts] = useState([]);

  const onSubmit = (data) => {
   
  
    if(isValid){
  
    const dateParts = data.date.split('-'); // מפרקים את התאריך למערך של שנה, חודש ויום
    const timeParts = data.time.split(':'); // מפרקים את השעה למערך של שעה ודקה

    // מבצעים את בניית האובייקט Date עם ערכי התאריך והשעה
    let dateTime = new Date(dateParts[0], dateParts[1] - 1, dateParts[2], timeParts[0], timeParts[1]);
    const year = dateTime.getFullYear();
    const month = String(dateTime.getMonth() + 1).padStart(2, '0');
    const day = String(dateTime.getDate()).padStart(2, '0');
    const hours = String(dateTime.getHours()).padStart(2, '0');
    const minutes = String(dateTime.getMinutes()).padStart(2, '0');
    dateTime= `${year}-${month}-${day}T${hours}:${minutes}`;
    func(dateTime,data.haircut);
}

  };

  const fetchHaircuts = () => {
    getAllHaircuts()
      .then(res => setArrHaircuts(res.data))
      .catch(err => console.log(err));
  };

  useEffect(fetchHaircuts, []);

  const haircutOptions = arrHaircuts.map(haircut => ({
    key: haircut.id,
    text: `${haircut.haircutType} ${haircut.price}₪`,
    value: haircut.id,
  }));

  return (
    <>
      <h1>קביעת תור למספרה</h1>
      <h2>אנא בחר את התאריך והשעה שברצונך להגיע אלינו</h2>
      <Box 
        component="form" 
        onSubmit={handleSubmit(onSubmit)} 
        sx={{ display: 'flex', flexDirection: 'column', width: 300, margin: 'auto' }}
      >
        <Controller
          name="date"
          control={control}
          rules={{required:"נדרש לבחור תאריך"}}
          render={({ field }) => (
            <TextField
              {...field}
              label="תאריך"
              type="date"
              InputLabelProps={{ shrink: true }}
              inputProps={{ min: today}}
              error={!!errors.date}
              helperText={errors.date ? errors.date.message : ""}
              sx={{ mb: 2 }}
            />
          )}
        />
        
        <Controller
          name="time"
          control={control}
          rules={{required:"נדרש לבחור שעה"}}
          render={({ field }) => (
            <TextField
              {...field}
              label="שעה"
              type="time"
              InputLabelProps={{ shrink: true }}
              inputProps={{ min: "10:00", max: "20:00" }}
              error={!!errors.time}
              helperText={errors.time ? errors.time.message : ""}
              sx={{ mb: 2 }}
            />
          )}
        />
        
        
        <Controller
          name="haircut"
          control={control}
          render={({ field }) => (
            <div style={{textAlign:"center",color:'#007bff'}}>
            <label  >סוג התספורת</label>
            <Dropdown
              {...field}
              fluid
              selection
              options={haircutOptions}
              onChange={(e, { value }) => setValue("haircut", value)}
              style={{ textAlign: 'center', color: '#007bff' }}
            />
          </div>
           
          )}
        />
       

        <Button type="submit" variant="contained" color="primary">
          אישור
        </Button>
      </Box>
    </>
  );
};

export default AppointmentForm;


// import React, { useState, useEffect } from 'react';
// import { useForm, Controller } from 'react-hook-form';
// import { TextField, Button, Box } from '@mui/material';
// import { Dropdown } from 'semantic-ui-react';
// import 'semantic-ui-css/semantic.min.css';
// import './AppointmentForm.css';
// import { getAllHaircuts } from '../haircut/haircutApi';

// const AppointmentForm = ({ func, item }) => {

//   if (item == null) {
//     item = {
//       appointmentTime: new Date(),
//       haircutId: ''
//     }
//   }

//   // Convert DateTime to separate date and time strings
//   const dateTime = new Date(item.appointmentTime);
//   const year = dateTime.getFullYear();
//   const month = String(dateTime.getMonth() + 1).padStart(2, '0');
//   const day = String(dateTime.getDate()).padStart(2, '0');
//   const hours = String(dateTime.getHours()).padStart(2, '0');
//   const minutes = String(dateTime.getMinutes()).padStart(2, '0');

//   const date = `${year}-${month}-${day}`;
//   const time = `${hours}:${minutes}`;

//   const { control, register, handleSubmit, setValue, formState: { errors } } = useForm({
//     defaultValues: {
//       date,
//       time,
//       haircut: item.haircutId
//     }
//   });

//   const [arrHaircuts, setArrHaircuts] = useState([]);

//   const onSubmit = (data) => {
//     const dateParts = data.date.split('-');
//     const timeParts = data.time.split(':');
//     let dateTime = new Date(dateParts[0], dateParts[1] - 1, dateParts[2], timeParts[0], timeParts[1]);
//     const year = dateTime.getFullYear();
//     const month = String(dateTime.getMonth() + 1).padStart(2, '0');
//     const day = String(dateTime.getDate()).padStart(2, '0');
//     const hours = String(dateTime.getHours()).padStart(2, '0');
//     const minutes = String(dateTime.getMinutes()).padStart(2, '0');
//     dateTime = `${year}-${month}-${day}T${hours}:${minutes}`;
//     func(dateTime, data.haircut);
//   };

//   const fetchHaircuts = () => {
//     getAllHaircuts()
//       .then(res => setArrHaircuts(res.data))
//       .catch(err => console.log(err));
//   };

//   useEffect(fetchHaircuts, []);

//   const haircutOptions = arrHaircuts.map(haircut => ({
//     key: haircut.id,
//     text: `${haircut.haircutType} ${haircut.price}₪`,
//     value: haircut.id,
//   }));

//   return (
//     <>
//       <h1>קביעת תור למספרה</h1>
//       <h2>אנא בחר את התאריך והשעה שברצונך להגיע אלינו</h2>
//       <Box 
//         component="form" 
//         onSubmit={handleSubmit(onSubmit)} 
//         sx={{ display: 'flex', flexDirection: 'column', width: 300, margin: 'auto' }}
//       >
//         <Controller
//           name="date"
//           control={control}
//            rules={{ required: "נדרש להזין תאריך" }}
//           render={({ field }) => (
//             <TextField
//               {...field}
//               label="תאריך"
//               type="date"
//               InputLabelProps={{ shrink: true }}
//               inputProps={{ min: date}}
//               error={!!errors.date}
//               helperText={errors.date ? errors.date.message : ""}
//               sx={{ mb: 2 }}
//             />
//           )}
//         />
        
//         <Controller
//           name="time"
//           control={control}
//           rules={{ required: "נדרש להזין שעה" }}
//           render={({ field }) => (
//             <TextField
//               {...field}
//               label="שעה"
//               type="time"
//               InputLabelProps={{ shrink: true }}
//               inputProps={{ min: "10:00", max: "20:00" }}
//               error={!!errors.time}
//               helperText={errors.time ? errors.time.message : ""}
//               sx={{ mb: 2 }}
//             />
//           )}
//         />
        
//         <Controller
//           name="haircut"
//           control={control}
//           // rules={{ required: "נדרש לבחור תספורת" }}
//           render={({ field }) => (
//             <Dropdown
//               {...field}
//               placeholder='בחר תספורת'
//                fluid
//               selection
//               options={haircutOptions}
//               onChange={(e, { value }) => setValue("haircut", value)}
//               style={{ textAlign: 'center', color: 'blue' }}
//             />
//           )}
//         />
//       {errors.haircut && <span>{errors.haircut.message}</span>}

//         <Button type="submit" variant="contained" color="primary">
//           אישור
//         </Button>
//       </Box>
//     </>
//   );
// };

// export default AppointmentForm;

