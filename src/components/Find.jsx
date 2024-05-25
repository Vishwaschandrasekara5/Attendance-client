import React from 'react';
import { Link } from 'react-router-dom';

function Find() {
  return (
    <div>
      <div>
        <h1 className='text-xl font-bold'>Signup as a</h1>
      </div>
      <div>
        <Link to="/Signup">
          <button className='bg-purple-600 rounded-lg p-3  m-8 text-gray-200'>Sign In</button>
        </Link>
       
      </div>
    </div>
  );
}

export default Find;
