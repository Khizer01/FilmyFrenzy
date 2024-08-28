import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/home/Home';
import MovieDetail from './MovieDetail/MovieDetail';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/movDetail/:id' element={<MovieDetail />}/>
    </Routes>
  )
}
