import React, { useEffect, useState ,useRef} from 'react';
import "./App.css"
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import SearchInput from './components/SearchInput';
import { createTask } from './models/task';
import { toast } from "react-hot-toast";
import Spinner from './components/spinner';
import gsap from 'gsap';



const App = () => {



    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [loading,setLoading] = useState(false);

    const circleRefs = [useRef(null),useRef(null),useRef(null), useRef(null), useRef(null)];

    


    useEffect(() => {
        const fetchTasks = async () => {
            setLoading(true);
            const savedTasks = localStorage.getItem('task');
            console.log("Retrieved Tasks: ", savedTasks);
            if (savedTasks) {
                try {
                    const parsedTasks = JSON.parse(savedTasks);
                    setTasks(parsedTasks);
                } catch (error) {
                    console.error("Failed to parse tasks from localStorage:", error);
                }
            }
            setLoading(false);
        };

        fetchTasks();
    }, []);

    

    const addTask = (taskData) => {
        const newTask = createTask(taskData.title);
        newTask.priority = taskData.priority; 
        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
        console.log("saving tasks: ",updatedTasks)
        localStorage.setItem('task', JSON.stringify(updatedTasks)); 
        const savedTasks = localStorage.getItem('task');
        console.log("Retrieved tasks:", savedTasks);
        toast.success(`Task "${taskData.title}" added successfully!`);

        
    };
    

    const deleteTask = (id) => {
        const updatedTasks = tasks.filter(task => task.id !== id);
        setTasks(updatedTasks);
        localStorage.setItem('task', JSON.stringify(updatedTasks)); 
        toast.success("Task deleted successfully!");
    };

    const toggleComplete = (id) => {
        
        const updatedTasks = tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task, 
            
        );
        setTasks(updatedTasks);
        if(filteredTasks.length > 0){
            const tk = filteredTasks.map(task =>
                task.id === id ? { ...task, completed: !task.completed } : task, 
                
            );
            setFilteredTasks(tk)
        }
        localStorage.setItem('task', JSON.stringify(updatedTasks)); 
    };

    const handleSearch = (term) => {
        if (term) {
            const filtered = tasks.filter(task =>
                task.title.toLowerCase().includes(term.toLowerCase())
            );
            setFilteredTasks(filtered);
            if (filtered.length === 0) {
                toast.error(`No Task Exist for ${term}`);
            }
        }
    };

    const sortedTasks = [...tasks].sort((a, b) => a.priority - b.priority);

    const showAllTasks = () => {
        setFilteredTasks([]); 
    };



    const animateCircles = () => {
        for (let i = 0; i < circleRefs.length; i++) {
            let xPos = Math.random() * (window.innerWidth - 100); 
            let yPos = Math.random() * (window.innerHeight - 100); 

            while(xPos > 1024 && yPos>1024){
                xPos = Math.random() * (window.innerWidth - 100);
                yPos = Math.random() * (window.innerHeight - 100);
            }
            

            gsap.to(circleRefs[i].current, {
                x: xPos,
                y: yPos,
                duration:6,
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut",
            },{scope:"#main"});
        }
    };
    

    return (
        <div className=' bg-richblack-800 h-full pt-[5vh] w-screen overflow-x-hidden' onClick={animateCircles}>

            <div ref={circleRefs[0]} className='absolute top-[4vh] bg-richblack-5 w-[80px] h-[80px] rounded-full opacity-35'></div>

            <div ref={circleRefs[1]} className='absolute top-[40vh] bg-richblack-5 w-[100px] h-[100px] rounded-full opacity-30'></div>

           <div ref={circleRefs[3]} className='absolute top-[4vh] bg-richblack-5 w-[80px] h-[80px] rounded-full opacity-35'></div>

            <div ref={circleRefs[4]} className='absolute top-[40vh] bg-richblack-5 w-[100px] h-[100px] rounded-full opacity-30'></div>
            
            <div ref={circleRefs[2]} className='absolute top-[60vh] bg-richblack-5 w-[120px] h-[120px] rounded-full opacity-40'
            ></div>


            <SearchInput onSearch={handleSearch} />
            <TaskInput onAddTask={addTask} />
            <h1 className='text-7xl font-bold inline-block relative left-[6vw] -top-[8vh] overflow-y-hidden'>Tasks</h1>
            {loading ? <Spinner/> :( <TaskList 
                allTasks={sortedTasks} 
                searchedTasks={filteredTasks} 
                onDeleteTask={deleteTask} 
                onToggleComplete={toggleComplete} 
                onShowAll={showAllTasks} 
            />)
        }
        </div>
    );
};

export default App;


