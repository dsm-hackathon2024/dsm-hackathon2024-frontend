import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import MyPage from './pages/auth/MyPage';
import reportWebVitals from './reportWebVitals';
import { Login, Signup } from './pages/auth'
import ReduxProvider from './utils/store/Provider';
import Toaster from './utils/toast/Toaster';
import { Header } from './components';
import { ProblemReady, ProblemDatail } from './pages/problem';
import AiAnswer from './pages/ai/AiAnswer';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<Header />}>
        <Route path="/" element={<ProblemReady />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/mypage" element={<MyPage />}></Route>
        <Route path="/problem" element={<ProblemDatail />}></Route>
        <Route path="/ai" element={<AiAnswer />}></Route>
      </Route>
    </>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ReduxProvider>
      <RouterProvider router={router} />
      <Toaster />
    </ReduxProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
