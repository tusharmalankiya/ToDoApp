import React, { useState } from 'react'
import styled from 'styled-components'
import { GrMenu } from "react-icons/gr";

const Sidebar = ({isOpened, setIsOpened}) => {

    const handleSidebar = () => {
        setIsOpened(!isOpened);
    }

    return (<>

        <MenuIcon $isOpened={isOpened} onClick={handleSidebar}><GrMenu /></MenuIcon>
        <Container $isOpened={isOpened}>
            <nav>
                <h2>Menu</h2>
                {/* <MenuIcon onClick={handleSidebar}><GrMenu /></MenuIcon> */}
            </nav>
            <div className='menu-block'>
                <h3>Tasks</h3>
                <ul>
                    <li className='block-item'>Personal</li>
                    <li className='block-item'>Work</li>
                        <form>
                            <input placeholder='Add new task' />
                            <button type="submit">Add</button>
                        </form>
                </ul>
            </div>
            <div className='menu-block'>
                <h3>Notes</h3>
                <ul>
                    <li className='block-item'>Personal</li>
                    <li className='block-item'>Work</li>
                    <form>
                            <input placeholder='Add new task' />
                            <button type="submit">Add</button>
                    </form>
                </ul>
            </div>
        </Container>
    </>
    )
}

export default Sidebar

const MenuIcon = styled.i`
        padding: 7px;
        cursor: pointer;
        height: fit-content;

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
`

const Container = styled.section`
max-width: ${props => (props.$isOpened ? "400px" : "0%")};
min-width: ${props => props.$isOpened ? "400px" : "0"};
padding: 0 ${props => props.$isOpened ? "10px" : "0"};
width: ${props => props.$isOpened ? "100%" : "0%"};
overflow: hidden;
background-color: #000;
box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
transition: all 0.3s ease;

& nav{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid grey;
    margin-bottom: 20px;
}

& .menu-block{
    margin: 25px 15px;
    & h3{
        font-size: 19px;
    }
 ul{
    margin: 10px;
    & .block-item, & form{
        padding: 7px 20px;
        font-size: 16px;
    }
    & .block-item:hover{
        background: grey;
    }
    & form{
        display: flex;
        gap: 10px;

       & input{
        padding: 5px;
        font-size: 17px;
        color: #fff;
        width: 100%;
        background: transparent;
        outline: none;
        border: none;
        border-bottom: 1px solid grey;
       }
       & button{
        padding: 5px;
        font-size: 15px;
        
       }
    }
}
}


@media screen and (max-width: 768px){
max-width: ${props => (props.$isOpened ? "100%" : "0%")};
min-width: ${props => props.$isOpened ? "100%" : "0"};
padding: 0 ${props => props.$isOpened ? "10px" : "0"};
width: ${props => props.$isOpened ? "100%" : "0%"};
}

`;