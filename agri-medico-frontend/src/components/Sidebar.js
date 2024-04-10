import {
  Box,
  DialogTitle,
  Drawer,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import FlexBetween from "./FlexBetween";
import { ChevronLeft, Image } from "@mui/icons-material";
import { useTheme } from "@emotion/react";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import HistoryIcon from "@mui/icons-material/History";
import InfoIcon from "@mui/icons-material/Info";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { useNavigate } from 'react-router-dom'
import fetchContext from '../context/fetch/fetchContext';
import logo from '../asset/agri-medico-logo.png';
import logo2 from '../asset/Agri-Medico-logo2.png';
import { useSelector } from "react-redux";

function Sidebar(props) {
  const navigate = useNavigate()
  const context = useContext(fetchContext)
  const { setUserHistoryData, historyData } = context
  const { isSidebarOpen, isNonMobile, setIsSidebarOpen, isUserLoggedin } = props;
  const [userHistory, setUserHistory] = useState({})

  // to access current mode 
  const mode = useSelector((state) => state.currMode.mode);

  // to use theme
  const theme = useTheme();

  // help button logic
  const [isHelpMenuOpen, setIsHelpMenuOpen] = useState(false);
  const handleHelpButtonClick = () => {
    setIsHelpMenuOpen(!isHelpMenuOpen);
  };

  // --- user history related logic 
  const getUserHistory = async () => {
    try {
      if (localStorage.getItem('usertoken')) {

        const history = await fetch(`${process.env.REACT_APP_BACKEND_IP}/userHistory/getUserHistory`, {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "usertoken": localStorage.getItem("usertoken")
          }
        })
        const data = await history.json()
        console.log(data);
        if (data.signal === 'green') {
          setUserHistory(data.history);
        }
      }
      else {
        setUserHistory({});
      }
    } catch (e) {
      console.log(e)
    }
  }

  const handleHistory = (item) => {
    console.log("item is : ", item)
    setUserHistoryData(item)

    navigate(`/result/${userHistory._id}/${item._id}`)
  }

  useEffect(() => {
    getUserHistory();
  }, [isUserLoggedin])

  const handleAboutUs = () => {
    navigate('/aboutus')
  }

  const headToHomePage = () => {
    navigate('/')
  }

  return (
    <Drawer
      sx={{
        "& .MuiDrawer-paper": {
          overflow: 'hidden',
          width: "270px",
          boxSizing: "border-box",
          backgroundColor: theme.palette.background.alt,
        },
      }}
      variant="persistent"
      anchor="left"
      open={isNonMobile ? true : isSidebarOpen}
    >
      {/* heading  */}
      <DialogTitle
        sx={{
          height: "10vh",
        }}
      >
        <FlexBetween>
          <Box
            sx={{
              height: '8vh',
              width: '230px',
              cursor: 'pointer',
              overflow: 'hidden'
            }}
            onClick={() => navigate('/')}
          >
            <img style={{ height: '100%', width: '100%' }} src={mode === 'dark' ? logo2 : logo} alt='logo' />
          </Box>
          {!isNonMobile && (
            <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              <ChevronLeft sx={{ fontSize: "25px" }} />
            </IconButton>
          )}
        </FlexBetween>
      </DialogTitle>

      {/* body  */}
      <Box
        className="scrollbarBody"
        sx={{
          height: "70vh",
          borderTop: "1px solid",
          borderColor: "divider",
          overflowY: "scroll",
          padding: 1.5,
        }}
      >
        <List>
          {userHistory.search_history?.map((iteam) => (
            <ListItem
              sx={{
                height: "8vh",
                cursor: "pointer"
              }}
              key={iteam.search_date}
              onClick={() => handleHistory(iteam)}
            >
              <ChatBubbleOutlineIcon />
              {/* <Typography marginLeft='10px' variant="h6">{iteam.search_date.substring(0,19)}</Typography> */}
              <Typography marginLeft='10px' variant="h6">Date: {iteam.search_date.substring(0, 10)}<br />Time: {iteam.search_date.substring(11, 19)}</Typography>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* footer  */}
      <Box
        sx={{
          height: "20vh",
          overflow: 'hidden',
          background: theme.palette.background.alt,
          display: "flex",
          gap: "5%",
          p: 1.5,
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        {/* hellp menu  */}
        <List>
          <ListItem>
            <HelpOutlineIcon />
            <Typography
              variant="h6"
              marginLeft='10px'
              sx={{ cursor: "pointer" }}
              onClick={handleHelpButtonClick}
            >
              Help
            </Typography>
          </ListItem>
          <Menu
            id="basic-menu"
            open={isHelpMenuOpen}
            onClose={handleHelpButtonClick}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem
              onClick={() =>
                (window.location.href = "mailto:tnavneet8628@gmail.com")
              }
            >
              Email
            </MenuItem>
            <MenuItem onClick={handleHelpButtonClick}>My account</MenuItem>
            <MenuItem onClick={handleHelpButtonClick}>Logout</MenuItem>
          </Menu>

          <ListItem>
            <HistoryIcon />
            <Typography marginLeft='10px' variant="h6">Activity</Typography>
          </ListItem>
          <ListItem>
            <InfoIcon />
            <Typography marginLeft='10px' variant="h6" onClick={handleAboutUs} sx={{ cursor: 'pointer' }}>About Us</Typography>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}

export default Sidebar;
