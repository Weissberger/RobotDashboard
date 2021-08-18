import React, {useEffect, useState} from 'react';
import TextInput from '../../shared/components/UIElements/TextInput.js';
import {useHistory} from 'react-router-dom';

const axios = require("axios");

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [validationError, setValidationError] = useState('');
    const [isSignup, setIsSignup] = useState(false);

    let history = useHistory()
    // clear validation errors on change
    useEffect(()=> {setValidationError('')}, [email, password, isSignup])


    function validateEmail(email) {
        //https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const login = (data)=> {
        axios
            .post(`http://localhost:5000/api/auth/login`, data)
            .then(res => {
                history.push({
                    pathname: '/',
                    state: {user:email} //not ideal, but I'm avoiding creating a global state for user
                })
            })
            .catch(err => setValidationError("Invalid credentials provided"))
    }

    const onSubmit = e => {
        e.preventDefault();
        if(!email || !validateEmail(email)){
            return setValidationError('Invalid email');
        }
        if(!password){
            return setValidationError('Invalid Password');
        }
        if(isSignup && (password !== confirmPassword)){
            return setValidationError('Passwords do not match')
        }
        const userData = {email, password}
        if(isSignup){
            axios
                .post(`http://localhost:5000/api/auth/register`, userData)
                .then(()=>login(userData))
                .catch(err => setValidationError("Unable to register user"))
        }
        else{
            login(userData);
        }
    }

    return (
        <div  className='flex flex-column align-center justify-center h-full'>
            <div style={{top:'35%'}} className='h-72 flex flex-col justify-center m-auto p-4 rounded border-4 border-gray-700 bg-gray-500  absolute'>
                <h3 className='text-gray-800 font-semibold mb-3'>{`${!isSignup? 'Login to Indoor Robotics:' : 'Signup for Indoor Robotics'}`}</h3>
                <TextInput placeholder='enter email' type='email' updateFunc={setEmail}/>
                <TextInput placeholder='enter password' type='password' updateFunc={setPassword}/>
                {isSignup && <TextInput placeholder='confirm password' type='password' updateFunc={setConfirmPassword}/>}
                <div className='flex w-full justify-between align-center py-3'>
                    <span onClick={()=>{setIsSignup(!isSignup); }} className='text-white text-sm cursor-pointer hover:underline font-semibold'>
                        {`${!isSignup?'Sign up': 'Cancel sign up'}`}
                    </span>
                    <span onClick={onSubmit} className='text-white text-sm cursor-pointer hover:underline font-semibold'>Submit</span>
                </div>
                <span className='text-xs text-red-500'>{validationError}</span>
            </div>
   
        </div>
    )
}

export default Login;