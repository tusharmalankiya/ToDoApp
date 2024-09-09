import React from 'react'
import styled from 'styled-components'
import { GrMenu } from "react-icons/gr";
import { IoMdLogOut } from "react-icons/io";
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


export const MenuIcon = ({ handleSidebar }) => {
  return (
    <IconContainer onClick={handleSidebar}><GrMenu style={{color:"white", background: "grey"}} /></IconContainer>
  )
}

export const LogoutIcon = () => {
  const {logout} = useAuth();
  const navigate = useNavigate();

  const handleLogout = () =>{
    logout();
    toast.success("Logged Out");
    navigate("/login");
  }

  return (
    <IconContainer>
      <IoMdLogOut onClick={handleLogout} style={{color:"white", background: "red"}} />
    </IconContainer>
  )
}

const IconContainer = styled.i`
        padding: 7px;
        cursor: pointer;
        display: inline-block;

        & svg{
            width: 40px;
            height: 40px;
            font-size: 30px;
            padding:5px;
            border-radius: 4px;
        }

        &:hover{
          opacity: 0.7;
            ${'' /* background: grey; */}
            border-radius: 4px;
        }

        &:active{
            background: black;
        }

        ${'' /* @media screen and (max-width: 768px){
          display:none;
          padding:0;
        } */}
`