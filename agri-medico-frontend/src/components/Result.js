import React, { useContext, useState, useEffect } from 'react';
import { Box } from '@mui/system';
import fetchContext from '../context/fetch/fetchContext';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea } from '@mui/material';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import Loading from './Loading';
const Result = () => {
  const navigate = useNavigate()
  const { userHistoryId, searchHistoryId } = useParams()
  const context = useContext(fetchContext);
  const { result, updateResult } = context;
  const [diseaseData, setDiseaseData] = useState({});
  const [medicineData, setMedicineData] = useState([]);
  const [userFileName, setUserFilename] = useState("")
  const [isResult, setIsResult] = useState(false);
  const isNonMobile = useOutletContext();
  // for result page to navigate to welcome page when user logs out
  useEffect(() => {
    if (!localStorage.getItem('usertoken')) {
      navigate('/')
    }
  }, [localStorage.getItem('usertoken')])


  const showResult = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_IP}/userHistory/getdiseasebyhistoryid`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "usertoken": localStorage.getItem('usertoken')
        },
        body: JSON.stringify({ userHistoryId, searchHistoryId })
      })
      const json = await response.json()
      console.log("data by backend : ", json)
      if (json.signal === 'green') {
        updateResult(json)
        setTimeout(()=>{
          setIsResult(true);
        },2000)
        return;
      }
      alert('server not responding');
      navigate('/');
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    showResult()
  }, [searchHistoryId])


  // useEffect for disease and medicine data.
  useEffect(() => {
    if (result.medicines) {
      setDiseaseData(result.disease);
    }
    if (result.medicines) {
      setMedicineData(result.medicines);
    }
    if (result.img) {
      console.log("img is : ", result.img)
      setUserFilename(result.img)
    }
  }, [result]);

  if (result.error) {
    return (
      <p>No results found.</p>
    );
  }

  return (
    <>
    { isResult ?
     <Box
     sx={{
      position: 'relative',
      margin: '4vh 4vw 4vh 10vw',
      marginRight: !isNonMobile && '10vw',
  }}
      >

          {Object.keys(diseaseData).length > 0 && (
            <>
            <h1><u>Disease:</u></h1>
            <Box
            sx={{
              display: 'flex',
              flexDirection: isNonMobile ? 'row': 'column',
              justifyContent:'space-Between',
          }}
            >
              <Card
                width={ isNonMobile ? 300 : '80%'} 
                height={345}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    width={isNonMobile ? "300" : '90%'}
                    height="300"
                    image={`${process.env.REACT_APP_BACKEND_IP}/public/${userFileName}`}
                    alt="user uploaded photo"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {diseaseData.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>

              <Box width={ isNonMobile ? '30%' : '100%'} marginRight={'15%'} marginTop={!isNonMobile && '10%'}>
                <Typography >{diseaseData.description}</Typography>

                <Button variant="outlined" sx={{marginTop: '7%', fontWeight: '700', color: 'skyblue'}} width={100} height={30} > Read more </Button>
              </Box>
            </Box>
            </>
          )}

          {medicineData.length > 0 && (
            <Box  marginTop={isNonMobile ? '5%' : '10%'}>
              <h1><u>Medicines:</u></h1>
              <Box
              display={'flex'}
              flexDirection={isNonMobile ? 'row' : 'column'}
              gap={'4vw'}
              marginTop={ '4vh'}
              >
                {medicineData.map((medicine, index) => (
                  <Card key={index} sx={{ maxWidth: 345, marginRight: '4vw' }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        width={isNonMobile ? "300" : '90%'}
                        height="300"
                        image={`${process.env.REACT_APP_BACKEND_IP}/public/${medicine.images[0]}`}
                        alt="medicine"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {medicine.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          <b>Description</b>: {medicine.description}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{marginTop:'5px'}}>
                          {medicine.urls.map((url)=>{
                            return(
                              <div style={{marginTop:'5px'}}>
                                <b>Url</b>: <a href={url} target="_blank" rel="noopener noreferrer" style={{color:'white'}}>{url}</a>
                              </div>
                            )
                          })}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                ))}
              </Box>
            </Box>
          )}
    </Box>
    : <Loading /> }
    </>
  );
};

export default Result;