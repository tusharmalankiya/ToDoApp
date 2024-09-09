import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Sidebar from '../components/Sidebar';
import { toast } from 'react-toastify';
import {LogoutIcon, MenuIcon} from '../components/Icons';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [taskInput, setTaskInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [isOpened, setIsOpened] = useState(window.screen.width > 768);
  const [taskCategories, setTaskCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(undefined);

  //for editing
  const [editId, setEditId] = useState(null);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    if(!user){
      navigate("/login");
    }
  }, [user])

  useEffect(() => {
    setSelectedCategory(taskCategories[0]);
  }, [])

  const handleTask = (e, id) => {
    e.preventDefault();
    console.log(id);
    if (taskInput.length > 0) {
      setTasks([...tasks, { id: Math.random().toString(16).slice(2), categoryId: id, name: taskInput, status: false }]);
      setTaskInput("");
    } else {
      return toast.error("Enter task name");
    }
  }

  const SelectCategory = (category) => {
    console.log(category);
    setSelectedCategory(category);
    if (window.screen.width <= 768) {
      setIsOpened(!isOpened);
    }
  }

  const handleDeleteTask = (task) => {
    setTasks(tasks.filter(item => item !== task));
  }

  const handleTaskStatus = (e, task) => {
    setTasks(tasks.map(item => item === task ? { ...task, status: e.target.checked } : item));
  }

  const handleEditTask = (task) => {
    setEditId(task.id);
    setNewTask(task.name);
  }

  const handleSaveTask = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, name: newTask } : task));
    setEditId(null);
    setNewTask("");
  }

  const handleSidebar = () => {
    setIsOpened(!isOpened);
  }

  return (
    <>
      <Container>
        <Sidebar
          setTasks={setTasks}
          tasks={tasks}
          selectedCategory={selectedCategory} SelectCategory={SelectCategory} isOpened={isOpened} setIsOpened={setIsOpened} taskCategories={taskCategories} setTaskCategories={setTaskCategories} />
        <section className='home'>
        <div className='menu-icon-container'>
          <MenuIcon isOpened={isOpened} handleSidebar={handleSidebar} />
          <LogoutIcon  />
        </div>
          {/* <div className='searchbar-container'>
            <input placeholder='search' />
          </div> */}
          {selectedCategory ? <>
            <h2>{selectedCategory?.title}</h2>
            <div className='tasks-container'>
              <form onSubmit={(e) => handleTask(e, selectedCategory?.id)}>
                <input
                  name="task"
                  value={taskInput}
                  onChange={(e) => setTaskInput(e.target.value)}
                  placeholder='Enter task'
                  autoComplete='off' />
                <button type="submit">Add Task</button>
              </form>
              {tasks.map((task, index) => {
                if (task?.categoryId === selectedCategory?.id) {
                  return (

                    <label key={index} className='task-container'>
                      {
                        task.id === editId ?
                          <input type='text'
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                          />
                          : <>
                            <input type="checkbox" defaultChecked={task.status} onChange={(e) => handleTaskStatus(e, task)} />
                            {task.name}
                          </>
                      }
                      {editId === task.id ?
                        <button onClick={() => handleSaveTask(task.id)}>Save</button> :
                        <button onClick={() => handleEditTask(task)}>Edit</button>
                      }
                      <button onClick={() => handleDeleteTask(task)}>Delete</button>
                    </label>
                  )
                }
              })}
            </div>
          </> : <h1>No Tasks</h1>}
        </section>
      </Container>
    </>
  )
}

export default Home

const Container = styled.div`
height: 100%;
width:100%;
display: flex;
overflow: hidden;

& .home{
width: 100%;
height: 100%;
padding: 0 20px;
overflow-y: auto;

& h1{
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

& .menu-icon-container{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px;

}

@media screen and (max-width: 768px){
  width: ${props => (props.$isOpened ? "0%" : "100%")};
  padding: 0;

  & .menu-icon-container{
    position: absolute;
    right: 20px;
    margin: 0;
  }
}

& .searchbar-container{
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px;

  & input{
    padding: 10px;
    width: 50%;
    font-size: 17px;
    background: transparent;
    border: 1px solid grey;
    outline: none;
    border-radius: 5px;
    color: white;
  }
}
& h2{
  text-align: center;
  margin: 20px;
  margin-top:70px;
  font-size:45px;
}

& .tasks-container{
font-size: 20px;
${'' /* overflow: auto; */}
${'' /* border: 1px solid red; */}
${'' /* height: 100%; */}

& .task-container{
  display: flex;
  width: 100%;
  gap: 10px;
  margin: 20px 0;

  & input[type=checkbox]{
    height: 30px;
    width: 30px;
    border-radius: 100px;
  }

  & input[type=text]{
    padding: 5px;
    font-size: 16px;
  }

  & button{
    padding: 5px;
  }
}

& form{
  display: flex;
  gap: 10px;
  margin: 20px 0;
}

& form input{
  font-size: 17px;
        width: 100%;
        border: none;
        padding: 15px;
        border-bottom: 2px solid grey;
        background: transparent;
        color: white;

       outline: none;
}
& form button{
  width: 30%;
  font-size: 17px;

}
}
}

`;