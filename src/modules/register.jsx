import{ useEffect,useState} from 'react'

import {useNavigate} from 'react-router-dom'
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


const Register = () => {
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL;
  
    // console.log(API_URL);
    // console.log("API_URL:", API_URL);

const [showPassword, setShowPassword] = useState(false);
const [showCPassword, setShowCPassword] = useState(false);
    // useEffect(() => {
    //     console.log("Register is mounted");
    //     return () => {
    //         console.log("Register is unmounted");
    //     }
    // }, []);
 
     const [userdetails,setuserdetails]= useState( {
          username: '',
          email: '',
          password: '',
          c_password: ''
        });
        const handleClickShowPassword = () => setShowPassword((show) => !show);
        const handleClickShowCPassword = () => setShowCPassword((show) => !show);
       
        const handlechange = (e) => {
            const { name, value } = e.target;
            // console.log(name,value);
            setuserdetails((prevstate) => ({...prevstate, [name]: value}));
        };
               
const handleregister = async () => {
    console.log("all userdetails:", userdetails);
    if(!userdetails.username || !userdetails.email || !userdetails.password || !userdetails.c_password)
       {
        alert("Please fill in all fields");
        return;
    }

    if (userdetails.password !== userdetails.c_password) {
        alert("Password and Confirm Password do not match");
        return;
    }

    const payload = {
        username: userdetails.username,
        email: userdetails.email,
        password: userdetails.password,
        cpassword: userdetails.c_password
    };
  await axios.post(
           `${API_URL}/auth/register`,
           payload
       ).then((response) => {
            // console.log("Response:", response);
           if(response.status === 201) {
                alert("User registered successfully!");
                navigate('/login');
            }
        }).catch((error) => {
  // console.log("Error:", error.response?.data || error.message);
  alert(error.response?.data?.message || "Error occurred during registration.");
});
  
    }

    return (
        <div>
            <h1>Register page </h1>
            <Box sx={{mt:2}}>
                <TextField required 
                label="Username"
                name="username"
                placeholder="Enter your username" 
                 value={userdetails.username}
                onChange={handlechange}
                />
            </Box>
             <Box sx={{mt:2}}>
                <TextField required 
                label="Email"
                name="email"
                type="email"
                placeholder="Enter your email" 
                 value={userdetails.email}
                onChange={handlechange}
                />
            </Box>
        
            <Box sx={{mt:2}}>
         <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor={`PasswordId-input`}>Password</InputLabel>
          <OutlinedInput
            id={`PasswordId-input`}
            name="password"
            value={userdetails.password}
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
             <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor={`CPasswordId-input`}>Confirm Password</InputLabel>
          <OutlinedInput
            id={`CPasswordId-input`}
            name="c_password"
            value={userdetails.c_password}
            onChange={handlechange}
            type={showCPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showCPassword ? 'hide the password' : 'display the password'
                  }
                  onClick={handleClickShowCPassword}
                              edge="end"
                >
                  {showCPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Confirm Password"
          />
        </FormControl>
            </Box>
            <Box sx={{mt:2}}>
            <Button variant="contained" onClick={handleregister}>
                Register
            </Button>
            </Box>
          <Box sx={{mt:2}}>
          <Button variant="outlined" onClick={() => navigate('/login')}>
            Already have an account? Login
          </Button>
          </Box>

        </div>
    )
};
export default Register

