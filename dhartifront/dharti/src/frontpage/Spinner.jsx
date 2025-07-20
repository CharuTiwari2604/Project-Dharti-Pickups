import React from 'react';
import '../index.css';

const Spinner = () => (
  <div className="spinner-container flex justify-center items-center h-full">
    <div className="spinner w-12 h-12 border-4 border-gray-200 border-t-green-600 rounded-full animate-spin"></div>
  </div>
);

export default Spinner;


