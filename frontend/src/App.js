import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import TestPage from './components/TestPage';
import FinishTest from './components/FinishTest';
import CameraPreview from './components/CameraPreview';
import ConnectionTest from './components/ConnectionTest';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/finish" element={<FinishTest />} />
        <Route path='/' element={<Login/>}/>
        <Route path='/camera' element={<CameraPreview/>}/>
        <Route path='/connection' element={<ConnectionTest/>}/>

      </Routes>
    </Router>
  );
};

export default App;
