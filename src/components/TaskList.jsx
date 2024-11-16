import React from 'react';

const TaskList = ({ allTasks, searchedTasks, onDeleteTask, onToggleComplete, onShowAll }) => {
    
    const displayTasks = searchedTasks.length > 0 ? searchedTasks : allTasks;

    return (
        <div className='text-white bg-richblack-800  '>
            {displayTasks.length === 0 ? (
                <p className="text-center text-white font-bold text-4xl overflow-y-hidden">No tasks are present.</p>
            ) : (
                <div className='flex gap-[3vw] flex-wrap px-[5vw] justify-evenly mb-[3vh] bg-richblack-800'>    
                    {displayTasks.map(task => (
                        <div key={task.id} className=" w-[20vw] bg-richblack-600 rounded-lg px-[2vw] py-[2vh] text-xl ">
                            <span className=''>
                                {task.title} 
                            </span>
                            <div className='flex gap-[2vw] mt-[4vh]'>
                                <button onClick={() => onToggleComplete(task.id)}>
                                    {task.completed ? "Completed" : "Incomplete"}
                                </button>
                                { searchedTasks.length === 0 &&
                                    <button onClick={() => onDeleteTask(task.id)}>Delete</button>
                                }
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {searchedTasks.length > 0 && (
                <button 
                    onClick={onShowAll} 
                    className="relative  text-white p-2 rounded-full left-[85vw] "
                >
                    Show All Tasks
                </button>
            )}
        </div>
    );
};

export default TaskList;