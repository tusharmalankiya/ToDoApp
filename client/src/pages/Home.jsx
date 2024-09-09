import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Sidebar from '../components/Sidebar';

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(undefined);
  const [taskInput, setTaskInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [isOpened, setIsOpened] = useState(window.screen.width > 768);

  useEffect(() => {
    async function fetchData() {
      setTasks([...tasks, {name:"Task 1", status:true}, {name: "Task 2", status:true}]);
      if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
        console.log("Not found");
        // navigate("/login");
      } else {
        setUser(await JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)));
      }
    }
    fetchData();
  }, [])

  const handleTask = (e) =>{
    e.preventDefault();
    if(taskInput.length > 0){
      setTasks([...tasks, {name:taskInput, status: false}]);
      setTaskInput("");
    }
  }

  return (
    <>
      <Container>
        <Sidebar isOpened={isOpened} setIsOpened={setIsOpened} />
        <section className='home'>
          <div className='searchbar-container'>
            <input placeholder='search' />
          </div>
          <h2>Tasks</h2>
          <div className='tasks-container'>
            <form onSubmit={handleTask}>
              <input 
              name="task"
              value={taskInput}
              onChange={(e)=>setTaskInput(e.target.value)}
              placeholder='Enter task' />
              <button type="submit">Add Task</button>
            </form>
            {tasks.map((task, index)=>{
              return (
            <label key={index} className='task-container'>
              <input type="checkbox" defaultChecked={task.status} />
              {task.name}
            </label>
              )
            })}
          </div>
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

& .home{
width: 100%;
height: 100%;
padding: 0 20px;
overflow: auto;


@media screen and (max-width: 768px){
  width: ${props => (props.$isOpened ? "100%" : "0%")};
  padding: ${props => (props.$isOpened ? "20px" : "0")};
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
}

& .tasks-container{
font-size: 20px;

& .task-container{
  display: flex;
  gap: 20px;
  margin: 20px 0;

  & input{
    height: 30px;
    width: 30px;
    border-radius: 100px;
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