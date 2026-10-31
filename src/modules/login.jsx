 import{ useEffect, useState } from 'react'
import{ useNavigate } from 'react-router-dom'
import {
    Button,
    TextField,
    Box,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
const Login = () => {
    const navigate = useNavigate();
     const API_URL = import.meta.env.VITE_API_URL;
    const [showPassword, setShowPassword] = useState(false);

  const [userdetails,setuserdetails]= useState( {
          email: '',
          password: '',
       
        });

         const handlechange = (e) => {
            const { name, value } = e.target;
            // console.log(name,value);
            setuserdetails((prevstate) => ({...prevstate, [name]: value}));
        };

        const handlelogin = async () => {
            console.log("all userdetails:", userdetails);
            if(!userdetails.email || 
              !userdetails.password )
       {
        alert("Please fill in all fields");
        return;
    }
     await axios.post(
           `${API_URL}/auth/login`, userdetails).then((response) => {
            // console.log("Response:", response);
           if(response.status === 200) {
                alert("User logged in successfully!");
                navigate('/dashboard');
            }
        }).catch((error) => {
  // console.log("Error:", error.response?.data || error.message);
  alert(error.response?.data?.message || "Error occurred during registration.");
});
        };

    const handleClickShowPassword = () => setShowPassword((show) => !show);
         
    return (
        <div>
            <h1>Login page </h1>
            <Box >
            <TextField required name="email" 
            label="Email"
            type="email"
            placeholder="Enter your email" 
            // value={userdetails.email} 
            onChange={handlechange} /></Box>
           
             <Box sx={{mt:2}}>
         <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor={`PasswordId-input`}>Password</InputLabel>
          <OutlinedInput
            id={`PasswordId-input`}
            name="password"
            onChange={handlechange}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? 'hide the password' : 'display the password'
                  }
                  onClick={handleClickShowPassword}
                              edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
            </Box>
            <Box sx={{mt:2}}>
          <Button variant="contained"
           color="primary" 
           onClick={handlelogin}>
            Login
          </Button>
          </Box>
          <Box sx={{mt:2}}>
          <Button variant="outlined" onClick={() => navigate('/register')}>
            New user? Create an account
          </Button>
          </Box>                
          
        </div>
    )
}
export default Login