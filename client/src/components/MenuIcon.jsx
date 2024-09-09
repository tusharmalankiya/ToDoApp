import React from 'react'
import styled from 'styled-components'
import { GrMenu } from "react-icons/gr";


const MenuIcon = ({isOpened, handleSidebar}) => {
  return (
    <MenuIconContainer $isOpened={isOpened} onClick={handleSidebar}><GrMenu /></MenuIconContainer>
  )
}

export default MenuIcon

const MenuIconContainer = styled.i`
        padding: 7px;
        cursor: pointer;
        display: inline-block;
        margin-top: 10px;

        ${'' /* height: fit-content; */}
        ${'' /* position: absolute;
        top: 0; */}
        ${'' /* display: none; */}

        & svg{
            font-size: 30px;
        }

        &:hover{
            background: grey;
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