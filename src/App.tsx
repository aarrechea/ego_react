// Imports
import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/home/Home';
import CarPage from './components/carPage/CarPage';
import CarFile from './components/carPage/CarFile';



// App
function App() {
  return (
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/car-page' element={<CarPage/>}/>
        <Route path='/car-file' element={<CarFile/>}/>
    </Routes>
  );
}



// Exports
export default App;
