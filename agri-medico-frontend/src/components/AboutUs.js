import React from 'react';
import { Box } from '@mui/system';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import EmailIcon from '@mui/icons-material/Email';
import CallIcon from '@mui/icons-material/Call';
import { useOutletContext } from "react-router-dom";


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    position: 'relative', // Add position relative for overlay
    cursor: 'pointer', // Add cursor pointer for hover effect
    '&:hover': {
        opacity: 0.8, // Reduce opacity on hover
    },
    '&:hover > img': {
        filter: 'brightness(20%)', // Reduce brightness of image on hover
    },
    '&:hover > .overlay': {
        opacity: 1, // Make overlay text visible on hover
    },
}));

const Overlay = styled('div')({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    opacity: 0, // Initially hidden
    transition: 'opacity 1s ease', // Smooth transition
    color: '#fff',
    maxWidth: '200px'
});

const AboutUs = () => {

    const isNonMobile = useOutletContext();

    
    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '2vh',
                }}
            >
                <Typography gutterBottom variant="h1" component="div">
                    Agri-Medico
                </Typography>
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '2vh',
                }}
            >
                <Stack direction={isNonMobile ? "row" : "column"} spacing={2}>
                    <Item>
                        <img src="banana1.jpg" alt="" width={'200px'} />
                        <Overlay className="overlay">
                            <h4>Step-1</h4>
                            Upload a clear leaf image with the help of upload file button.
                            Make sure to involve that part of leaf image which consists of the
                            affected region for accurate predictions.
                        </Overlay>
                    </Item>
                    <Item>
                        <img src="banana2.jpg" alt="" width={'200px'} />
                        <Overlay className="overlay">
                            <h4>Step-2</h4>
                            Get the disease information and corresponding medications. Lighten your task of finding those
                            medicines by directly navigating to the links we provide.
                        </Overlay>
                    </Item>
                    <Item>
                        <img src="banana3.jpg" alt="" width={'200px'} />
                        <Overlay className="overlay">
                            <h4>Step-3</h4>
                            Take control of viewing your past queries with our feature to see
                            the past response. You can also delete your history as per your
                            wish. Feel free to contact us anytime!
                        </Overlay>
                    </Item>
                </Stack>
            </Box>

            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '4vh',
                marginLeft: '8vw'
            }}>
                <Typography variant="h5">
                    Agri-Medico aims to help their users by accurately predicting the problems by using advanced machine learning algorithms which analyzes the images uploaded by users and predicting the diseases timely, helping to identify and address the diseases and their remedies.
                </Typography>
            </Box>

            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: '4vh',
                marginLeft: '8vw'
            }}>
                <Typography variant="h5">
                    Feel free to contact us any time by mailing us or by contacting us on our toll free number.
                </Typography>
            </Box>

            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: '2vh',
                marginLeft: '8vw'
            }}>
                <EmailIcon /> <Typography onClick={() =>
                (window.location.href = "mailto:tnavneet8628@gmail.com")
              } sx={{cursor:'pointer', marginLeft:'5px'}}>abc@gmail.com</Typography>
            </Box>

            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: '2vh',
                marginLeft: '8vw'
            }}>7
                <CallIcon /> <Typography onClick={() =>
                (window.location.href = 'tel:+919999999999')
              } sx={{cursor:'pointer', marginLeft:'5px'}}>+919999999999</Typography>
            </Box>
        </>
    );
};

export default AboutUs;
