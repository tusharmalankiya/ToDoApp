import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { loginAPI } from '../utils/APIs';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
    const { user, login } = useAuth();
    // const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username:"",
        password:""
    });

    useEffect(() => {
        if(user){
            navigate("/");
        }
    }, [user])

    const handleValues = (e) =>{
        setValues({...values, [e.target.name]:e.target.value});
    }

    const checkValues = () =>{
        if(values.username === ""){
            toast.error("Enter username");
            return false;
        }
        else if(values.password === ""){
            toast.error("Enter password");
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
            const res = await axios.post(loginAPI, values);
            if(res.data.status === true){
                toast.success("Logged In");
                login(res.data.user);
            }else{
                toast.error(res.data.message)
            }
        }catch(err){
            console.log(err);
            toast.error(err.message);
        }
    }

    // if (loading) return <div>Loading...</div>;

    return (<>
        <Container>
            <h1>Login</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <input 
                name = "username"
                type="text"
                value={values.username}
                onChange={handleValues}
                placeholder='Username'
                autoComplete='off'
                 />
            </div>
            <div>
                <input 
                name="password"
                type="password"
                value={values.password}
                onChange={handleValues}
                placeholder='Password' 
                autoComplete='off'
                />
            </div>
            <button type="submit"> Login </button>
        </form>
        <div className='login-footer'>
        <p>Forgot <Link to="/">password</Link>?</p>
        <p>Don't have an account?<Link to="/register">Sign Up</Link></p>
        </div>
        </Container>
        </>
    )
}

export default Login

const Container = styled.div`
height: 450px;
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

        &:focus{
            border-color: black;
        }
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

& .login-footer{

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