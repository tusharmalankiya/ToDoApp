import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { registerAPI } from '../utils/APIs';
import { toast } from 'react-toastify';

const Register = () => {
  const [values, setValues] = useState({
    username:"",
    email:"",
    password:"",
    confirmPassword:""
})

  const handleValues = (e) =>{
    setValues({...values, [e.target.name]:e.target.value});
}

const checkValues = () =>{
  if(values.username === ""){
    toast.error("Enter username");
    return false;
  }
  if(values.email === ""){
    toast.error("Enter email");
    return false;
  }
  if(values.password === ""){
    toast.error("Enter Password");
    return false;
  }
  if(values.confirmPassword === ""){
    toast.error("Enter Confirm Password");
    return false;
  }
  if(values.password !== values.confirmPassword){
    toast.error("Passwords doesn't match");
    return false;
  }
  return true;
}

const handleSubmit = async (e) =>{
    e.preventDefault();

    if(!checkValues()){
      return
    }

    try{
      const res = await axios.post(registerAPI, values);
      if(res.data.status === true){
        delete values.confirmPassword;
        localStorage.setItem(process.env.REACT_APP_LOCALHOST_KEY, JSON.stringify(res.data.user));
        console.log(await JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)));
        toast.success("Registered");
      }else{
        toast.error(res.data.message);
      }
      }catch(err){
        console.log(err);
        toast.error(err.message);
      }
    }

  return (
    <Container>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input 
          name = "username"
          type="text"
          value={values.username}
          onChange={handleValues}
          placeholder='Username' />
        </div>
        <div>
          <input 
          name="email"
          type="email"
          value={values.email}
          onChange={handleValues}
          placeholder='Email' />
        </div>
        <div>
          <input 
          type="password"
          value={values.password}
          name="password"
          onChange={handleValues}
          placeholder='Password' />
        </div>
        <div>
          <input
          type="password"
          value={values.confirmpassword}
          name="confirmPassword"
          onChange={handleValues}
          placeholder='Confirm password' />
        </div>
        <button type="submit"> Sign Up </button>

      </form>
      <div className='footer'>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </Container>
  )
}

export default Register

const Container = styled.div`
height: 550px;
border: 1px solid grey;
width: 100%;
max-width: 400px;
border-radius: 10px;
padding: 40px;
background: var(--bgcolor-white);
color: var(--text-color-black);
overflow: hidden;
display: flex;
flex-direction: column;
justify-content: space-around;
align-items: center;
gap: 10px;

& h1{
        text-align: center;
    }

& form{
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;

    & input{
        font-size: 17px;
        width: 100%;
        border: none;
        padding: 15px;
        border-bottom: 2px solid grey;
        background: transparent;
        outline: none;
    }

    & button{
        padding: 10px;
        font-size: 20px;
        border: none;
        outline: none;
        background-color: #4C3BCF;
        color: #fff;
        cursor: pointer;
        margin-top: 15px;
    }
}

& .footer{

    p{
        font-size: 15px;
        margin: 7px 0;
        text-align: center;
    }

    & a{
        color: var(--link-color);
    }
}

@media screen and (max-width: 768px){
}

`;