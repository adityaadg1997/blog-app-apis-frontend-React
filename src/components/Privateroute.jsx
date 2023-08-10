import React from 'react'
import {Outlet, Navigate} from 'react-router-dom'
import { isLoggedIn } from '../auth'
import Login from '../pages/Login'

const Privateroute=()=> {
   return isLoggedIn() ? <Outlet /> : <Navigate to={'/login'} />
}

export default Privateroute