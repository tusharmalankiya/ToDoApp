import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { toast } from 'react-toastify';
import { categoriesAPI } from '../utils/APIs';
import axios from 'axios';
import Loader from './Loader';

const Sidebar = ({ user, tasks, setTasks, selectedCategory, SelectCategory, isOpened, setIsOpened, taskCategories, setTaskCategories }) => {
    const [taskCategoryInput, setTaskCategoryInput] = useState("");

    const [loading, setLoading] = useState(true);

    // edit category
    const [editCategoryId, setEditCategoryId] = useState(null);
    const [newCategory, setNewCategory] = useState("");

    useEffect(()=>{
        const fetchData = async () =>{
            try{
                const res = await axios.get(categoriesAPI, {
                    params:{
                        userId: user.id
                    }
                });
                if(res.data.status === true){
                    setTaskCategories(res.data.categories);
                    toast.success(res.data.message);
                }else{
                    toast.error(res.data.message);
                }
            }catch(err){
                console.log(err);
                toast.error(err.message);
            }
        }
        if(user){
            fetchData();
            setLoading(false);
        }
    }, [user])

    const handleCategory = async (e) => {
        e.preventDefault();
        if(taskCategoryInput.length < 1){
            toast.error("Enter category name");
            return;
        }
        setLoading(true);
        // const new_category = { id: Math.random().toString(16).slice(2), title: taskCategoryInput, userId: user.id};
        const new_category = {title: taskCategoryInput, userId: user.id};
        try{
            console.log(taskCategories);
            const res = await axios.post(categoriesAPI, new_category);
            if(res.data.status === true){
                toast.success(res.data.message);
                // new_category.id = res.data.categoryId;
                setTaskCategories([...taskCategories, {...new_category, id: res.data.categoryId}]);
                SelectCategory(new_category);

                if (window.screen.width <= 768) {
                    setIsOpened(!isOpened);
                }
            }else{
                toast.error(res.data.message);
            }
            setTaskCategoryInput("");
        }catch(err){
            console.log(err);
            toast.error(err.message);
        }
        setLoading(false);
    }

    
    const handleDeleteCategory = async (category) => {
        setLoading(true);
        try{
            const res = await axios.delete(`${categoriesAPI}/${category.id}`);
            if(res.data.status === true){
                toast.success(res.data.message);
                setTasks(tasks.filter(task => task.categoryId !== category.id));
                const updateCategories = taskCategories.filter(item => item.id !== category.id);
                setTaskCategories(updateCategories);
                SelectCategory(updateCategories[0]);
            }else{
                toast.error(res.data.message);
            }

        }catch(err){
            console.log(err);
            toast.error(err.message);
        }
        setLoading(false);

    }

    const handleEditCategory = (category) => {
        setEditCategoryId(category.id);
        setNewCategory(category.title);
    }

    const handleSaveCategory = async (cat) => {
        setLoading(true);
        try{
            const res = await axios.patch(categoriesAPI,
                {
                    categoryId: cat.id,
                    title: newCategory,
                    userId: user.id
                }
            )
            console.log(res.data);
            if(res.data.status === true){
                toast.success(res.data.message);
                setTaskCategories(taskCategories.map(category=> category.id === cat.id ? {...category, title: newCategory}: category));
                setEditCategoryId(null);
                SelectCategory({...cat, title: newCategory});
                setNewCategory("");
            }else{
                toast.error(res.data.message);
            }
        }catch(err){
            console.log(err);
            toast.error(err.message);
        }
        setLoading(false);
    }
    return (<>
        <Container $isOpened={isOpened}>
        {loading ? 
            <Loader /> :<>
            <nav>
                <h2>Menu</h2>
            </nav>
            <div className='menu-block'>
                <h3>Task Categories</h3>
                <ul>
                    <form onSubmit={handleCategory}>
                        <input
                            type='text'
                            value={taskCategoryInput}
                            onChange={(e) => setTaskCategoryInput(e.target.value)}
                            placeholder='Add new category'
                            autoComplete='off' />
                        <button type="submit">Add</button>
                    </form>
                    {taskCategories?.map((category, index) => {
                        return (
                            <li key={index} className={`block-item ${category?.id === selectedCategory?.id && 'active'}`} >
                            {category?.id === editCategoryId ?
                                <input type="text"
                                 value={newCategory}
                                 onChange={(e)=>setNewCategory(e.target.value)}
                                 autoComplete='off'
                                 /> :

                                <span onClick={() => SelectCategory(category)}>
                                    {category.title}
                                </span> 
                            }
                                <div className='btns-container'>
                                    {
                                        category.id === editCategoryId ?
                                            <button onClick={() => handleSaveCategory(category)}>Save</button> :
                                            <button onClick={() => handleEditCategory(category)}>Edit</button>
                                    }
                                    <button onClick={() => handleDeleteCategory(category)}>Delete</button>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
            </> }
            {/* <div className='menu-block'>
                <h3>Notes</h3>
                <ul>
                    <li className='block-item'>Personal</li>
                    <li className='block-item'>Work</li>
                    <form>
                            <input placeholder='Add new task' />
                            <button type="submit">Add</button>
                    </form>
                </ul>
            </div> */}
        </Container>
    </>
    )
}

export default Sidebar


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
    & .block-item{
        padding: 7px 20px;
        font-size: 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin:5px 0;

        & input[type=text]{
            width: 100%;
            padding: 5px;
        }

        & span{
            ${'' /* border: 1px solid red; */}
            width: 100%;
            padding: 5px;
            cursor: pointer;
        }

        & .btns-container{
            ${'' /* width: 100%; */}
            display: flex;
            justify-content: flex-end;
        }

        button{
            padding: 5px;
            margin-left: 10px;
            cursor: pointer;
        }
    }
    & .block-item.active{
        background: grey;
    }
    & .block-item:hover{
        background: grey;
        opacity: 0.8;
    }
    & form{
        padding: 7px 20px;
        font-size: 16px;
        display: flex;
        gap: 10px;
        margin-bottom:20px;

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
position: absolute;
left: ${props => props.$isOpened ? "0%" : "-100%"};
width: 100dvw;
height: 100dvh;
overflow-y: auto;
max-width: 100%;
min-width: 100%;
padding: 15px 10px;
}

`;