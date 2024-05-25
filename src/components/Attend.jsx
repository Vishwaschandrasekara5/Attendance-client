import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Attend() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('');
  const [lastUpdatedEntry, setLastUpdatedEntry] = useState(null);
  const [code, setCode] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    const loggedInUserName = localStorage.getItem('name');
    setName(loggedInUserName)
    console.log(loggedInUserName);


    axios.get('http://localhost:3001/attend')
      .then(response => {
        console.log('Response data:', response.data);
        setData(response.data);
      })
      .catch(err => {
        console.log(err);
        setError('Failed to fetch data');
      });
  }, []);

  useEffect(() => {
    if (!data.length) return;

    const filteredData = data.filter(item =>
      item.code.toLowerCase().includes(filter.toLowerCase()) ||
      (item.moduleName && item.moduleName.toLowerCase().includes(filter.toLowerCase()))
    );

    if (filteredData.length > 0) {
      setLastUpdatedEntry(filteredData[filteredData.length - 1]);
    } else {
      setLastUpdatedEntry(null);
    }
  }, [data, filter]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/attend', { name, code })
      .then(result => {
        console.log(result);
        if (result.data.message === "Success") {
          alert("Attendance marked");
          setCode(''); 
        } else {
          setError(result.data.message);
        }
      })
      .catch(err => {
        console.error(err);
        setError("An error occurred while marking attendance");
      });
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data.length) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Filter by code or module name"
        value={filter}
        onChange={e => setFilter(e.target.value)}
      />
      {lastUpdatedEntry && (
        <div>
          <div>Code: {lastUpdatedEntry.code}</div>
          <div>Module Name: {lastUpdatedEntry.module}</div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="flex items-center justify-center h-screen">
          <div className="border border-gray-400 p-8 rounded-lg w-[400px]">
            <h1 className="text-center mb-4">Attendance Management System</h1>
            <div className="flex">
              <input
                id='inp'
                type="text"
                className='border border-gray-800 w-full text-center'
                name="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>
            <button
              className='w-full bg-purple-600 p-3 mt-4 rounded-lg text-gray-100 hover:bg-gray-100 hover:text-purple-600'
              type='submit'
            >
              Verify code
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Attend;
