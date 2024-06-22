import { TextField, MenuItem, Select, FormControl, InputLabel, FormHelperText } from "@mui/material";
import "./signUpCss.css";
import { useForm } from "react-hook-form";
import { addUser } from "./userApi";
import { Button, Container } from "semantic-ui-react";
import { saveUser } from "./userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
    let dispatch = useDispatch();
    let navigate = useNavigate();
    let [showLoading, setShowLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);


    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    let { register, handleSubmit, formState: { errors, isValid }, watch } = useForm({ mode: "onSubmit" });
    const save = (data) => {
        if (isValid) {
            setShowLoading(true);
            if(data.phone&&data.phonePrefix)
            data.tel = data.phonePrefix + "-" + data.phone
            const user = {
                tel: data.tel,
                password: data.password, userName: data.userName,
                email: data.email
            }


            addUser(user).then(res => {
                dispatch(saveUser(res.data));

                navigate("/appointments");
                setShowLoading(false);
            }).catch((err) => {
                setShowLoading(false);
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
            });
        }
    }

    const email = watch("email");
    const phone = watch("phone");
    const phonePrefix = watch("phonePrefix");
    return (
        <Container style={{ "textAlign": "center" }}>
            {showLoading && (<h1 style={{ marginTop: "20px" }}> ... אנא המתן</h1>)}
            {showLoading && <Button style={{ "justify": "center" }} loading></Button>}
            {!showLoading &&
                <div>
                    <h2 style={{ marginTop: "20px" }}>! ברוך הבא משתמש חדש </h2>
                    <form onSubmit={handleSubmit(save)} noValidate>
        <TextField
        placeholder="שם משתמש"
        type="text"
        {...register("userName", {
          pattern: {
            value: /^(?!.*[\u0590-\u05FF]).*$/,
            message: "שם משתמש אינו תקין- כלול רק אותיות באנגלית ומספרים בשמך"
          },
          required: {
            value: true,
            message: "!שם משתמש הוא שדה חובה"
          },
          minLength: {
            value: 2,
            message: "!שם קצר מידי"
          },
          maxLength: {
            value: 12,
            message: "שם ארוך מידי!"
          }
        })}
      />
      {errors.userName && <span className="errors">{errors.userName.message}</span>}

                        <TextField placeholder=" סיסמא" type={showPassword ? 'text' : 'password'} InputProps={{
                            startAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleClickShowPassword} edge="end" style={{ marginRight: "1px" }}>
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                            {...register("password", {
                                required: { value: true, message: "!סיסמא שדה חובה" },
                            })} />
                        {errors.password && <span className="errors">{errors.password.message}</span>}

                        <h3>בחר אמצעי קשר (לפחות אחד)</h3>

                        <TextField
                            placeholder="אימייל"
                            {...register("email", {
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                    message: "! כתובת אימייל אינה תקינה",
                                },
                            })}
                        />
                        {errors.email && <span className="errors">{errors.email.message}</span>}

                        <FormControl error={Boolean(errors.phonePrefix || errors.phone)} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '10px' }}>
                            <InputLabel htmlFor="phonePrefix">קידומת</InputLabel>
                            <Select
                                id="phonePrefix"
                                {...register("phonePrefix", { required: false }

                                )}
                                style={{ marginRight: '10px', minWidth: '80px' }}
                            >

                                <MenuItem value="050">050</MenuItem>
                                <MenuItem value="051">051</MenuItem>
                                <MenuItem value="052">052</MenuItem>
                                <MenuItem value="053">053</MenuItem>
                                <MenuItem value="054">054</MenuItem>
                                <MenuItem value="055">055</MenuItem>
                                <MenuItem value="058">058</MenuItem>
                            </Select>

                            <TextField
                                placeholder="מספר טלפון"

                                {...register("phone", {
                                    pattern: {
                                        value: /^[0-9]{7}$/,
                                        message: "! מספר הטלפון חייב להיות באורך 7 ספרות ולכלול ספרות בלבד",
                                    },
                                })}
                                style={{ marginLeft: '10px' }}
                            />
                        </FormControl>
                        {(errors.phonePrefix || errors.phone) && <FormHelperText error>{errors.phonePrefix?.message || errors.phone?.message}</FormHelperText>}

                        {(errors.email || (!email && !phone)||(phone&&!phonePrefix)) && <span className="errors">עלייך למלא לפחות אחד מאמצעי הקשר אימייל או טלפון</span>}

                        <Button type="submit" color="blue"> להרשמה</Button>
                    </form>
                </div>
            }
        </Container>
    );
}

export default SignUp;




