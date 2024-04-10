import React from "react";
import {
  Box,
  CircularProgress,
  Skeleton,
} from "@mui/material";
import { useOutletContext } from "react-router-dom";

function Loading() {
  const isNonMobile = useOutletContext();
  return (
    <Box
    sx={{
        position: 'relative',
        margin: '4vh 4vw 4vh 10vw'
    }}
    >
    
    <h1><u>Disease:</u></h1>
    <Box
    sx={{
        display: 'flex',
        flexDirection: isNonMobile ? 'row': 'column',
        justifyContent:'space-Between'
    }}
    >
        <Skeleton variant="rectangular" width={ isNonMobile ? 300 : '90%'} height={345} animation="wave" />
        <Box width={ isNonMobile ? '30%' : '90%'} marginRight={'15%'} marginTop={!isNonMobile && '10%'}>
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />

        <Skeleton sx={{marginTop: '10%'}} variant="rectangular" width={100} height={30} animation="wave" />
        </Box>
    </Box>

    <Box marginTop={isNonMobile ? '5%' : '10%'}>
    <h1><u>Medicines:</u></h1>
    <Box
    display={'flex'}
    flexDirection={isNonMobile ? 'row' : 'column'}
    gap={'4vw'}
    marginTop={ '4vh'}
    >
        <Skeleton width={ isNonMobile ? 300 : '90%'} height={345} variant="rectangular" animation="wave" />
    </Box>
    </Box>
    </Box>
  );
}

export default Loading;