import React from 'react'
import {Outlet, Navigate} from 'react-router-dom';
import { isLogin } from '../Auth';

export default function Privateroute() {
  return isLogin()? <Outlet /> : <Navigate to={"/login"} />; 
}
