import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Sidebar from '../components/Sidebar';
import { toast } from 'react-toastify';
import {LogoutIcon, MenuIcon} from '../components/Icons';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { tasksAPI } from '../utils/APIs';
import Loader from '../components/Loader';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [taskInput, setTaskInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [isOpened, setIsOpened] = useState(window.screen.width > 768);
  const [taskCategories, setTaskCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(undefined);

  const [loading, setLoading] = useState(true);

  //for editing
  const [editId, setEditId] = useState(null);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    if(!user){
      navigate("/login");
    }
  }, [user, navigate])

  useEffect(()=>{
    const fetchTasks = async () =>{
      try{
        const res = await axios.get(tasksAPI, {
          params:{
            userId: user.id,
            categoryId: selectedCategory.id
          }
        });
        if(res.data.status === true){
          setTasks(res.data.tasks);
          setTaskInput("");
          toast.success(res.data.message);
        }else{
          toast.error(res.data.message);
        }
      }catch(err){
        console.log(err);
        toast.error(err.message);
      }
    }
    if(user && selectedCategory){
      fetchTasks();
      setLoading(false);
    }

  }, [user, selectedCategory])

  useEffect(() => {
    if(taskCategories){
      setSelectedCategory(taskCategories[0]);
    }
  }, [taskCategories])

  const handleTask = async (e, categoryId) => {
    e.preventDefault();
    if (taskInput.length > 0) {
      setLoading(true);
      const new_task = {categoryId: categoryId, userId: user.id, name: taskInput};
      try{
        const res = await axios.post(tasksAPI, new_task);
        if(res.data.status === true){
          setTasks([...tasks, { ...new_task, id: res.data.taskId, completed: 0 }]);
          setTaskInput("");
          toast.success(res.data.message);
        }else{
          toast.error(res.data.message);
        }
      }catch(err){
        console.log(err);
        toast.error(err.message);
      }
      setLoading(false);
    } else {
      return toast.error("Enter task name");
    }
  }

  const SelectCategory = (category) => {
    setSelectedCategory(category);
    if (window.screen.width <= 768) {
      setIsOpened(!isOpened);
    }
  }

  const handleDeleteTask = async (task) => {
    try{
      setLoading(true);
      const res = await axios.delete(`${tasksAPI}/${task.id}`);
      if(res.data.status === true){
        const new_tasks = tasks.filter(item => item.id !== task.id);
        console.log(new_tasks);
        setTasks(tasks => tasks.filter(item => item.id !== task.id));
        toast.success(res.data.message);
      }else{
        toast.error(res.data.message);
      }
      setLoading(false);
    }catch(err){
      console.log(err);
      toast.error(err.message);
    }
  }

  const handleTaskStatus = async (e, task) => {
    setLoading(true);
    try{
      const res = await axios.patch(tasksAPI, {
        action: 'STATUS_CHANGE',
        taskId: task.id,
        completed: e.target.checked        
      });
      if(res.data.status === true){
        setTasks(tasks.map(item => item.id === task.id ? { ...task, completed: !task.completed } : item));
        toast.success(res.data.message);
      }else{
        toast.error(res.data.message);
      }
    }catch(err){
      console.log(err);
      toast.error(err.message);
    }
    setLoading(false);
  }

  const handleEditTask = (task) => {
    setEditId(task.id);
    setNewTask(task.name);
  }

  const handleSaveTask = async (taskId) => {
    setLoading(true);
    try{
      const res = await axios.patch(tasksAPI, {
        action: 'NAME_CHANGE',
        taskId: taskId,
        name: newTask,
        userId: user.id,
        categoryId: selectedCategory.id
      });
      if(res.data.status === true){
        setTasks(tasks.map(task => task.id === taskId ? { ...task, name: newTask } : task));
        setEditId(null);
        setNewTask("");
        toast.success(res.data.message);
      }else{
        toast.error(res.data.message);
      }
    }catch(err){
      console.log(err);
      toast.error(err.message);
    }
    setLoading(false);


  }

  const handleSidebar = () => {
    setIsOpened(!isOpened);
  }

  return (
    <>
    <Container>
        <Sidebar
          user={user}
          setTasks={setTasks}
          tasks={tasks}
          selectedCategory={selectedCategory} SelectCategory={SelectCategory} isOpened={isOpened} setIsOpened={setIsOpened} taskCategories={taskCategories} setTaskCategories={setTaskCategories} />
    {loading ? <Loader /> : 
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
                            <input type="checkbox" checked={task.completed} onChange={(e) => handleTaskStatus(e, task)} />
                            <span className={`${task.completed && 'completed'}`}>  
                            {task.name}
                            </span>
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
                return null;
              })}
            </div>
          </> : <h1>No Tasks</h1>}
        </section>
    }
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

${'' /* & .searchbar-container{
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
} */}
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

  & .completed{
    text-decoration: line-through;
  }

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