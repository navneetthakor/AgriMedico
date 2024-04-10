import { Box, useMediaQuery } from '@mui/material'
import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'

function RootLayout() {
    // to know whether device is mobile or not 
    const isNonMobile = useMediaQuery('(min-width: 960px)');

    // to tel whether user login-logout change is updated or not 
    const userstate = localStorage.getItem('usertoken') ? true : false;
    const [isUserLoggedin, setIsUserLoggedin] = useState(userstate)

    // to check whether sidebar is open or not 
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <Box
    >
        <Sidebar
        isSidebarOpen={isSidebarOpen}
        isNonMobile={isNonMobile}
        setIsSidebarOpen={setIsSidebarOpen}
        isUserLoggedin={isUserLoggedin}
        />
        <Box
        sx={{
          minHeight: '100vh',
          marginLeft: isNonMobile ? '270px': 'inherite',
        }}
        onClick={()=>{
          if(isSidebarOpen) setIsSidebarOpen(!isSidebarOpen);
        }}
        flexGrow={1}>
            <Navbar
            isSidebarOpen={isSidebarOpen}
            isNonMobile={isNonMobile}
            setIsSidebarOpen={setIsSidebarOpen}
            isUserLoggedin={isUserLoggedin}
            setIsUserLoggedin={setIsUserLoggedin}
            />
            <Box
            sx={{
              marginRight: isNonMobile ? '80px': 'inherite',
              width: '100%'
            }}
            >
            <Outlet context={isNonMobile} />

            </Box>
        </Box>
      
    </Box>
  )
}

export default RootLayout
