import React, { useState } from 'react';

const SearchInput = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const handleInputChange = () => {
        onSearch(searchTerm); 
        setSearchTerm('')
    };

    return (
        <>
            <div className="border-2 border-richblack-5 bg-transparent w-[35vw] h-[10vh] m-auto pt-[5vh] mb-[5vh] rounded-full flex justify-between items-center overflow-y-hidden ">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search tasks..."
                    className="bg-transparent text-white text-2xl rounded-full px-[1vw] py-[1.3vh] relative -top-[2.5vh] w-[40vw] outline-none"
                />
                <button className="text-white hover:text-black text-3xl rounded-full py-[1.6vh] relative -top-[2.5vh] cursor-pointer border-none" onClick={handleInputChange}>
                    Search
                </button>
            </div>
        </>
    );
};

export default SearchInput;