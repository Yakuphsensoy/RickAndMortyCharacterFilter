import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './style/style.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { characterLoader } from './components/Character'


import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import Characters from './components/Characters';
import Character from './components/Character';

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/characters', element: <Characters /> },
  { path: '/character/:id', element: <Character />, loader: characterLoader }

])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
