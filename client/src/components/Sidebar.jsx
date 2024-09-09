import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { toast } from 'react-toastify';

const Sidebar = ({ tasks, setTasks, selectedCategory, SelectCategory, isOpened, setIsOpened, taskCategories, setTaskCategories }) => {
    const [taskCategoryInput, setTaskCategoryInput] = useState("");

    // edit category
    const [editCategoryId, setEditCategoryId] = useState(null);
    const [newCategory, setNewCategory] = useState("");

    const handleCategory = async (e) => {
        e.preventDefault();
        if(taskCategoryInput.length < 1){
            toast.error("Enter category name");
            return;
        }
        const new_category = { id: Math.random().toString(16).slice(2), title: taskCategoryInput };
        setTaskCategories([...taskCategories, new_category]);
        SelectCategory(new_category);
        setTaskCategoryInput("");

        if (window.screen.width <= 768) {
            setIsOpened(!isOpened);
        }
    }

    
    const handleDeleteCategory = (category) => {
        setTasks(tasks.filter(task => task.categoryId !== category.id));
        const updateCategories = taskCategories.filter(item => item.id !== category.id);

        setTaskCategories(updateCategories);
        SelectCategory(updateCategories[0]);

    }

    const handleEditCategory = (category) => {
        setEditCategoryId(category.id);
        setNewCategory(category.title);
    }

    const handleSaveCategory = (cat) => {
        setTaskCategories(taskCategories.map(category=> category.id === cat.id ? {...category, title: newCategory}: category));
        setEditCategoryId(null);
        SelectCategory({...cat, title: newCategory});
        setNewCategory("");

    }
    return (<>

        <Container $isOpened={isOpened}>
            <nav>
                <h2>Menu</h2>
            </nav>
            <div className='menu-block'>
                <h3>Task Category</h3>
                <ul>
                    <form onSubmit={handleCategory}>
                        <input
                            value={taskCategoryInput}
                            onChange={(e) => setTaskCategoryInput(e.target.value)}
                            placeholder='Add new category' />
                        <button type="submit">Add</button>
                    </form>
                    {taskCategories.map((category, index) => {
                        return (
                            <li key={index} className={`block-item ${category.id === selectedCategory.id && 'active'}`} >
                            {category.id === editCategoryId ?
                                <input type="text"
                                 value={newCategory}
                                 onChange={(e)=>setNewCategory(e.target.value)}

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
max-width: ${props => (props.$isOpened ? "100%" : "0%")};
min-width: ${props => props.$isOpened ? "100%" : "0"};
padding: 15px ${props => props.$isOpened ? "10px" : "0"};
width: ${props => props.$isOpened ? "100%" : "0%"};
}

`;