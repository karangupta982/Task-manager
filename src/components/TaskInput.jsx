import React, { useState,useEffect } from 'react';
import { IoMdAdd } from "react-icons/io";
import { useForm } from 'react-hook-form';


const TaskInput = ({ onAddTask }) => {
    const [isModalOpen,setIsModalOpen] = useState(false)


    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful },
      } = useForm()
    

      const submitContactForm = (data) => {
        onAddTask(data);
        setIsModalOpen(false);
    };

    useEffect(() => {
        if (isSubmitSuccessful) {
          reset({
            title: "",
            priority: ""
          })
        }
      }, [reset, isSubmitSuccessful])
    

    

      
    return (
        <>
        <button className=' w-[12vw] h-[10vh] text-white flex justify-center relative left-[70vw] -top-[15vh] text-xl rounded-full items-center cursor-pointer '
                onClick={() => setIsModalOpen(true)}>
            Add Task <span className='decoration-white ml-[0.2vw]'><IoMdAdd /></span>
        </button>


        {isModalOpen && 
            (
                <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center  bg-white bg-opacity-10 backdrop-blur-sm">
                    <div className="w-11/12 max-w-[30vw] rounded-lg border border-richblack-400 bg-richblack-800 p-6">

                    <form onSubmit={handleSubmit(submitContactForm)}>
                        <div className="flex flex-col gap-2 lg:w-[100%] mb-[2vh]">
                            <label htmlFor="title" className="text-white text-2xl">
                                Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                placeholder="eg. Home Work"
                                className="px-[1vw] py-[0.5vh] rounded "
                                {...register("title", { required: true })}
                            />
                            {errors.title && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                Please enter Title.
                                </span>
                            )}
                        </div>

                        <div className="flex flex-col gap-2 lg:w-[100%] mb-[5vh]">
                            <label htmlFor="priority" className="text-white text-2xl">
                                Priority
                            </label>
                            <input
                                type="text"
                                name="priority"
                                id="priority"
                                placeholder="eg. 1"
                                className="px-[1vw] py-[0.5vh] rounded "
                                {...register("priority", { required: true })}
                            />
                            {errors.priority && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                Please enter priority.
                                </span>
                            )}
                        </div>

                        <div className='flex flex-row gap-[3vw] '>
                            <button type="submit" className="border-[2px] border-white text-white hover:text-richblack-800 font-bold">Add Task</button>

                            <button onClick={()=>setIsModalOpen(false)} className=" text-white hover:text-richblack-800 font-bold ">Cancel</button>
                        </div>
                    </form>

                    </div>
                </div>
            ) 
        }

        </>
    );
};

export default TaskInput;











