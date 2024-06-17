import React, { useEffect, useState } from 'react';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';

const App = () => {
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
      <Route index element={<HomePage />}/>
      <Route path='/chat' element={<ChatPage />}/>


      </Route>
    )
  );
  
  
  
  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App

