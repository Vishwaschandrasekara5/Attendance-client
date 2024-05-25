import React, { useState } from 'react';
import axios from 'axios';

function Create() {
  const [inputValue, setInputValue] = useState('');
  const [module, setModule] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const selectmod = (e) => {
    setModule(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/create', { code: inputValue, module })
      .then(result => {
        console.log(result);
        setSuccessMessage('Session created successfully');
        setErrorMessage('');
      })
      .catch(err => {
        console.log(err);
        setErrorMessage('Failed to create session');
        setSuccessMessage('');
      });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="border border-gray-400 p-8 rounded-lg w-[400px]">
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="digit" className="block mb-2">Enter the 4 Number Digit:</label>
            <input 
              id="atd" 
              type="number" 
              className="border border-gray-800 w-full p-2" 
              name="code"
              value={inputValue} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="mb-5">
            <label htmlFor="module" className="block mb-2">Select Module:</label>
            <select 
              id="module"
              className="border border-gray-800 w-full p-2"
              onChange={selectmod}
              name="module"
              value={module}
              required
            >
              <option value="" disabled>Select a module</option>
              <option value="Maths">Maths</option>
              <option value="Sinhala">Sinhala</option>
              <option value="History">History</option>
            </select>
          </div>
          <div className="text-3xl text-center mt-10">
            <h1 className="font-bold">Attendance Code is: <span className="text-green-600">{inputValue}</span></h1>
            <h2 className="font-bold">Selected Module: <span className="text-green-600">{module}</span></h2>
          </div>
          {successMessage && <div className="text-green-600 mt-4">{successMessage}</div>}
          {errorMessage && <div className="text-red-600 mt-4">{errorMessage}</div>}
          <button type="submit" className="w-full bg-purple-600 p-3 mt-4 rounded-lg text-gray-100 hover:bg-gray-100 hover:text-purple-600">
            Create Session
          </button>
        </form>
      </div>
    </div>
  );
}

export default Create;
