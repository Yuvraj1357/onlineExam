import React, { useState, useEffect } from 'react';
import axios from 'axios';
const ConnectionTest = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const response = await axios.get('/api/test');
        setMessage(response.data.message);
      } catch (error) {
        setMessage('Failed to connect to the backend');
        console.error('Error:', error);
      }
    };

    checkConnection();
  }, []);

  return (
    <div>
      <h1>Backend Connection Test</h1>
      <p>{message}</p>
    </div>
  );
};

export default ConnectionTest;
