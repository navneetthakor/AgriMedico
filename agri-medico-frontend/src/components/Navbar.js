import {
  Alert,
  AppBar,
  Avatar,
  Box,
  Button,
  Dialog,
  Grow,
  IconButton,
  List,
  ListItem,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import FlexBetween from "./FlexBetween";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { useTheme } from "@emotion/react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useDispatch, useSelector } from "react-redux";
import { setMode } from "../store/Mode";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import HistoryIcon from "@mui/icons-material/History";
import { Add, Close } from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { Form, Formik } from "formik";
import * as yup from "yup";
import FlexCenter from "./FlexCenter";
import styled from "@emotion/styled";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

// schema for formik form
const userFormSchema = yup.object().shape({
  image: yup.mixed(),
  username: yup.string(),
  email: yup.string().email().required("enter valid email"),
  password: yup.string().min(4).max(16).required("password required"),
  contact_num: yup.string(),
});

// error style
const ErrorMessage = styled(Typography)({
  color: "orangered",
  padding: 0,
  margin: 0,
});

// ---------------   actual function ---------------
function Navbar(props) {
  const { isSidebarOpen, isNonMobile, setIsSidebarOpen, isUserLoggedin, setIsUserLoggedin } = props;

  //   to access theme
  const theme = useTheme();

  //   accessing mode
  const mode = useSelector((state) => state.currMode.mode);
  const dispatch = useDispatch();

  // to handle open and close operatoin of user account modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChildModalOpen, setIsChildModalOpen] = useState(false);

  const handleModalOpen = (num) => {
    if (num === 1) setIsModalOpen(true);
    else setIsChildModalOpen(true);
  };
  const handleModalClose = (num) => {
    if (num === 1) setIsModalOpen(false);
    else setIsChildModalOpen(false);
  };

  // formik form
  const [selectedImage, setSelectedImage] = useState();
  const [loginSignupState, setLoginSignupState] = useState("signup");

  // to handle form submit
  const handleFormSubmit = async (values) => {
    let url = `${process.env.REACT_APP_BACKEND_IP}/user/`;
    url += loginSignupState === "signup" ? `createuser` : `userlogin`;
    let data;
    let response;

    if (loginSignupState === "signup") {
      const formdata = new FormData();
      if (selectedImage) formdata.append("image", selectedImage);
      for (let [key, value] of Object.entries(values)) {
        console.log(key, value);
        formdata.append(key, value);
      }

      response = await fetch(url, {
        method: "POST",
        body: formdata,
      });
      console.log(response);
      data = await response.json();
      console.log(data);
    } else {
      response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      console.log(response);
      data = await response.json();
      console.log(data);
    }

    if (data.signal === "red") alert(data.error);
    else {
      localStorage.setItem("usertoken", data.usertoken);
      <Alert
        iconMapping={{
          success: <CheckCircleOutlineIcon fontSize="inherit" />,
        }}
      >
        This success Alert uses `iconMapping` to override the default icon.
      </Alert>;
      setIsUserLoggedin(true);
      handleModalClose(2);
    }
  };

  // to toggle login and signup
  const handleLoginSignupToggle = () => {
    if (loginSignupState === "signup") setLoginSignupState("login");
    else setLoginSignupState("signup");
  };
  const formik = (
    <Formik
      initialValues={{
        username: "",
        email: "",
        password: "",
        contact_num: "",
      }}
      validationSchema={userFormSchema}
      onSubmit={(values) => {
        handleFormSubmit(values);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
        <Form onSubmit={handleSubmit}>
          <FlexCenter
            style={{ flexDirection: "column", gap: "10px", height: "65vh" }}
          >
            <Box
              sx={{
                color: "skyblue",
                ":hover": { textDecoration: "underline" },
              }}
              component={Button}
              onClick={handleLoginSignupToggle}
            >
              Click here to{" "}
              {loginSignupState === "signup" ? "Login" : "Sign-Up"}
            </Box>
            {loginSignupState === "signup" && (
              <Avatar
                sx={{
                  width: 110,
                  height: 110,
                  cursor: "pointer",
                }}
                component={Button}
                onClick={() => document.getElementById("image").click()}
              >
                {selectedImage && (
                  <Avatar
                    sx={{width: '100px', height: '100px'}}
                    src={URL.createObjectURL(selectedImage)}
                    alt="uploaded img"
                  />
                )}
              </Avatar>
            )}

            {/* hidden input used by image avtar  */}
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(event) => {
                setSelectedImage(event.target.files[0]);
              }}
            />

            {loginSignupState === "signup" && (
              <Box>
                <TextField
                  sx={{ width: isNonMobile ? "15vw" : "50vw" }}
                  variant="standard"
                  label="userName"
                  type="txt"
                  name="username"
                  id="username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                />
                {values.username === "" && touched.username && (
                  <ErrorMessage>username required </ErrorMessage>
                )}
              </Box>
            )}

            <Box>
              <TextField
                sx={{ width: isNonMobile ? "15vw" : "50vw" }}
                variant="standard"
                label="email"
                type="email"
                name="email"
                id="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {errors.email && touched.email && (
                <ErrorMessage>{errors.email} </ErrorMessage>
              )}
            </Box>
            {loginSignupState === "signup" && (
              <Box>
                <TextField
                  sx={{ width: isNonMobile ? "15vw" : "50vw" }}
                  variant="standard"
                  label="Contact Number"
                  type="txt"
                  name="contact_num"
                  id="contact_num"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.contact_num}
                />
                {errors.contact_num && touched.contact_num && (
                  <ErrorMessage>{errors.contact_num} </ErrorMessage>
                )}
              </Box>
            )}
            <Box>
              <TextField
                sx={{ width: isNonMobile ? "15vw" : "50vw" }}
                variant="standard"
                label="Password"
                type="txt"
                name="password"
                id="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              {errors.contact_num && touched.contact_num && (
                <ErrorMessage>{errors.contact_num} </ErrorMessage>
              )}
            </Box>
            <Button
              sx={{ marginTop: isNonMobile ? "10px" : "25px" }}
              variant="contained"
              type="submit"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </FlexCenter>
        </Form>
      )}
    </Formik>
  );

  const [user, setUser] = useState({
    // username: ''
  });
  useEffect(() => {
    const togetUser = async () => {
      if (localStorage.getItem("usertoken")) {
        const url = `${process.env.REACT_APP_BACKEND_IP}/user/userAuthtokenLogin`;
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            usertoken: localStorage.getItem("usertoken"),
          },
        });
        console.log(response);
        const data = await response.json();
        console.log(data);

        if (data.signal === "green") {
          setUser(data.user);
        }
      }
    };
    togetUser();
  }, [isUserLoggedin]);

  // ----------actually returning component
  return (
    <AppBar
      sx={{
        position: "sticky",
        backgroundColor: theme.palette.background.default,
        top: 0,
        left: 0,
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", padding: "3px 8px" }}>
        {/* leftside button  */}
        
          {!isSidebarOpen && !isNonMobile && (
            <Box>
            <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              <MenuOpenIcon sx={{ fontSize: "30px" }} />
            </IconButton>
            </Box>
          )}
        

        {/* senter logo  */}
        <Box
          sx={{
            display: "flex",
            gap: "10px",
            border: "2px solid gray",
            padding: "5px 10px",
            borderRadius: "25px",
            marginLeft: isNonMobile && '15px'
          }}
        >
          <AutoAwesomeIcon
            sx={{
              fontSize: "25px",
              color: "#4285f4",
            }}
          />
          <Typography
            variant="h3"
            style={{
              fontSize: "22px",
              fontWeight: "700",
              color: "transparent",
              background:
                "linear-gradient(45deg, #4285f4, #9b72cb, #9b72cb, #d96570, #131314)",
              backgroundClip: "text",
            }}
          >
            Experimental
          </Typography>
        </Box>

        {/* right side button  */}
        <FlexBetween>
          {mode === "dark" ? (
            <IconButton onClick={() => dispatch(setMode())}>
              <DarkModeIcon sx={{ fontSize: "30px" }} />
            </IconButton>
          ) : (
            <IconButton onClick={() => dispatch(setMode())}>
              <LightModeIcon sx={{ fontSize: "30px" }} />
            </IconButton>
          )}
          <IconButton
            onClick={() => {
              localStorage.getItem("usertoken")
                ? handleModalOpen(1)
                : handleModalOpen(2);
            }}
            sx={{ marginLeft: isNonMobile ? "5%" : "2%" }}
          >
            <AccountCircleIcon sx={{ fontSize: "30px" }} />
          </IconButton>

          {/*--- user Account setup related  */}
          <Dialog
            open={isModalOpen}
            onClose={() => handleModalClose(1)}
            PaperProps={{
              style: {
                position: "absolute",
                right: 0,
                top: 0,
                transform: "translate(0, 0)",
                height: isNonMobile ? "70vh" : "100vh",
                width: isNonMobile ? "30vw" : "100vw",
                margin: isNonMobile ? "inherite" : "0px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: isNonMobile ? "10px" : '20px',
                borderRadius: "25px",
              },
            }}
          >
            <IconButton
              sx={{
                position: "absolute",
                top: 5,
                right: 8,
              }}
              onClick={() => handleModalClose(1)}
            >
              <Close sx={{ color: "skyblue" }} />
            </IconButton>
            <Typography variant="h6">{user.email && user.email}</Typography>
            <IconButton height>
              {user.image && user.image ? (
                <Avatar
                  sx={{
                    height: "110px",
                    width: "110px",  //"linear-gradient(45deg, #4285f4, #9b72cb, #9b72cb, #d96570, #131314)",
                    borderRadius: "50px" / 2,
                    borderTop: '5px solid #4285f4',
                    borderLeft: '5px solid #9b72cb',
                    borderRight: '5px solid #4285f4',
                    borderBottom: '5px solid #9b72cb'
                  }}
                  src={`${process.env.REACT_APP_BACKEND_IP}/${user.image}`.replace(
                    "/\\/g",
                    "/"
                    )}
                    alt="user"
                    />
              ) : (
                <AccountCircleIcon sx={{ fontSize: "100px" }} />
              )}
            </IconButton>
            <Typography variant="h3">
              Hi {user.username && user.username}!
            </Typography>

            <Box
              sx={{
                marginTop: "10px",
                border: "2px solid gray",
                width: isNonMobile ? "50%" : "60%",
                display: "flex",
                justifyContent: "space-around",
                borderRadius: "50px",
              }}
            >
              <IconButton>
                <BorderColorIcon sx={{ color: "skyblue" }} />
              </IconButton>
              <IconButton>
                <HelpOutlineIcon sx={{ color: "skyblue" }} />
              </IconButton>
              <IconButton>
                <HistoryIcon sx={{ color: "skyblue" }} />
              </IconButton>
            </Box>

            <Box
              sx={{
                width: "80%",
                marginTop: "20px",
              }}
            >
              <List
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "3px",
                  cursor: "pointer",
                }}
              >
                <ListItem
                  sx={{
                    height: "55px",
                    borderTopLeftRadius: "25px",
                    borderTopRightRadius: "25px",
                    background: theme.palette.background.default,
                    ":hover": {
                      background: theme.palette.background.alt,
                    },
                  }}
                  onClick={() => {
                    handleModalClose(1);
                    handleModalOpen(2);
                  }}
                >
                  <Add
                    sx={{
                      color: "skyblue",
                      background: "rbga(255,255,255,0.5)",
                    }}
                  />
                  <Typography variant="h6" sx={{ marginLeft: "15px" }}>
                    {" "}
                    Login with another Account
                  </Typography>
                </ListItem>
                <ListItem
                  sx={{
                    height: "55px",
                    background: theme.palette.background.default,
                    ":hover": {
                      background: theme.palette.background.alt,
                    },
                  }}
                >
                  <NotInterestedIcon
                    sx={{
                      color: "skyblue",
                      background: "rbga(255,255,255,0.5)",
                    }}
                  />
                  <Typography variant="h6" sx={{ marginLeft: "15px" }}>
                    {" "}
                    Remove History Permanently
                  </Typography>
                </ListItem>
                <ListItem
                  sx={{
                    height: "55px",
                    background: theme.palette.background.default,
                    borderBottomLeftRadius: "25px",
                    borderBottomRightRadius: "25px",
                    ":hover": {
                      background: theme.palette.background.alt,
                    },
                  }}
                  onClick={() => {
                    localStorage.removeItem("usertoken");
                    setIsUserLoggedin(false);
                    handleModalClose(1);
                  }}
                >
                  <LogoutIcon
                    sx={{
                      color: "skyblue",
                      background: "rbga(255,255,255,0.5)",
                    }}
                  />
                  <Typography variant="h6" sx={{ marginLeft: "15px" }}>
                    {" "}
                    Logout this Account
                  </Typography>
                </ListItem>
              </List>
            </Box>
          </Dialog>
          {/* login page  */}
          <Dialog
            open={isChildModalOpen}
            onClose={() => handleModalClose(2)}
            PaperProps={{
              style: {
                position: "absolute",
                right: 0,
                top: 0,
                transform: "translate(0, 0)",
                height: isNonMobile ? "70vh" : "100vh",
                width: isNonMobile ? "30vw" : "100vw",
                margin: isNonMobile ? "inherite" : "0px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "10px",
                borderRadius: "25px",
              },
            }}
          >
            <IconButton
              sx={{
                position: "absolute",
                top: 5,
                right: 8,
              }}
              onClick={() => handleModalClose(2)}
            >
              <Close sx={{ color: "skyblue" }} />
            </IconButton>
            {formik}
          </Dialog>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
