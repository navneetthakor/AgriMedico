import { Box } from "@mui/system";
import React, { useContext, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import fetchContext from "../context/fetch/fetchContext";
import { useNavigate, useOutletContext } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useTheme } from "@emotion/react";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function Welcome() {

  // to use theme Object 
  const theme = useTheme();

  // to know wheteher device is mobile or not
  const isNonMobile = useOutletContext();

  const context = useContext(fetchContext);
  const { result, getDummyResult } = context;
  const navigate = useNavigate();

  const handleImageSubmit = async (event) => {
    const file = event.target.files[0];
    console.log("file is : ", file);
    const formData = new FormData();
    formData.append("image", file);
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_IP}/flask/fetchdiseasename`,
      {
        method: "POST",
        mode: "cors",
        body: formData,
      }
    );
    const json = await response.json();

    if (!localStorage.getItem('usertoken')) {
      console.log("json is : ", json)
      getDummyResult(json)
      navigate('/result')
      return;
    }

    //storing to userhistory
    const disease_obj = {
      disease: json.diseaseDetailsResponse.disease._id,
      img: json.imagePath,
    };
    const response2 = await fetch(
      `${process.env.REACT_APP_BACKEND_IP}/userHistory/addToUserHistory`,
      {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          usertoken: localStorage.getItem("usertoken"),
        },
        body: JSON.stringify({ disease_obj }),
      }
    );

    const json2 = await response2.json();
    console.log("json2 is : ", json2, "time is : ", Date.now);
    if (json2.signal === "green") {
      console.log("hi")
      navigate(`/result/${json2.historyId}/${json2.data._id}`);
      return;
    }
    alert("server not responding")
    navigate('/')
  };

  // made just for checking context variable result value
  useEffect(() => {
    console.log("result is : ", result);
  }, []);

  return (
    <>
      <Box
        sx={{
          flexGrow: '1',
          marginTop: "40px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginLeft: '40px',
          gap: "10px",
        }}
      >
        {/* <img
          src={logo}
          height={"100px"}
          width={"100px"}
          alt="Logo"
          style={{ marginTop: "-10vh" }}
        /> */}
        <Box>
          <h1
            style={{
              fontSize: isNonMobile ? "70px " : "40px",
              margin: "0",
              color: "transparent",
              background:
                "linear-gradient(45deg, #4285f4, #9b72cb, #9b72cb, #d96570, #131314)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
            }}
          >
            Welcome to, Agri-Medico
          </h1>
          <h1
            style={{
              fontSize: isNonMobile ? "70px" : "30px",
              margin: "0",
              color: "#666666",
            }}
          >
            Your AI Doctor...
          </h1>
        </Box>

        <Box
          sx={{
            width: "80%",
            height: isNonMobile ? "200px" : "550px",
            overflow: "hidden",
            display: "flex",
            flexDirection: isNonMobile ? "row" : "column",
            justifyContent: "space-around",
            alignItems: "center",
            marginTop: `15px`,
            padding: '0 10px'
          }}
        >
          <Card
            sx={{
              maxWidth: isNonMobile ? 245 : 'inherite',
              borderRadius: "10px",
              boxShadow: "1px 1px 8px #4285f4",
            }}
          >
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Step-1
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Upload a clear leaf image with the help of upload file button.
                Make sure to involve that part of leaf image which consists of the
                affected region for accurate predictions.
              </Typography>
            </CardContent>
          </Card>

          <Card
            sx={{
              maxWidth: isNonMobile ? 245 : 'inherite',
              borderRadius: "10px",
              boxShadow: "1px 1px 8px #9b72cb",
            }}
          >
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Step-2
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Obtain the disease information and guidelines regarding
                appropriate medicines. Lighten your task of finding those
                medicines by directly navigating to the links we provide.
              </Typography>
            </CardContent>
          </Card>

          <Card
            sx={{
              maxWidth: isNonMobile ? 245 : 'inherite',
              borderRadius: "10px",
              boxShadow: "1px 1px 8px #d96570",
            }}
          >
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Step-3
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Take control of viewing your past queries with our feature to see
                the past response. You can also delete your history as per your
                wish. Feel free to contact us anytime!
              </Typography>
            </CardContent>
          </Card>
        </Box>

        {/* to behave like input field  */}
        <Box
          component={Button}
          onClick={() => document.getElementById('fileInputButton').click()}
          startIcon={<CloudUploadIcon />}
          sx={{
            marginTop: '20px',
            marginBottom: '50px',
            height: '50px',
            width: isNonMobile ? '60%' : '80vw',
            background: theme.palette.background.alt,
            borderRadius: '25px',
            color: theme.palette.neutral[100],
          }}
        >

          {isNonMobile && 'click here to'} upload image
        </Box>
        <Button
          id="fileInputButton"
          sx={{ display: 'none' }}
          component="label"
          variant="contained"
          tabIndex={0}
          startIcon={<CloudUploadIcon />}
          type="submit"
          onChange={handleImageSubmit}
        >
          Upload file
          <VisuallyHiddenInput type="file" />
        </Button>
      </Box>
    </>
  );
}

export default Welcome;
