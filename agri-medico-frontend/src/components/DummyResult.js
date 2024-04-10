import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/system';
import fetchContext from '../context/fetch/fetchContext';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

const DummyResult = () => {
    const navigate = useNavigate()
    const context = useContext(fetchContext)
    const { dummyResult } = context
    const [diseaseData, setDiseaseData] = useState({});
    const [medicineData, setMedicineData] = useState([]);
    const [userFileName, setUserFilename] = useState("")
    // useEffect for disease and medicine data.
    useEffect(() => {      
        if (Object.keys(dummyResult).length === 0) {
            navigate('/')
          }
        if (dummyResult.diseaseDetailsResponse) {
          setDiseaseData(dummyResult.diseaseDetailsResponse.disease);
        }
        if (dummyResult.medicineDetailsResponse) {
          setMedicineData(dummyResult.medicineDetailsResponse.medicines);
        }
        if (dummyResult.imagePath) {
          setUserFilename(dummyResult.imagePath);
        }
      }, [dummyResult]);

    
    // useEffect(() => {
    // }, [])
    

    return (
        <div style={{ marginLeft: '10vw' }}>
            {(
                <>
                    {Object.keys(diseaseData).length > 0 && (
                        <div>
                            <h1><u>Disease:</u></h1>
                            <Card sx={{
                                maxWidth: 345,
                                marginTop: '4vh',
                            }}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        width="200"
                                        height="300"
                                        image={`http://localhost:5001/public/${userFileName}`}
                                        alt="user uploaded photo"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {diseaseData.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {diseaseData.description}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </div>
                    )}

                    {medicineData.length > 0 && (
                        <div>
                            <h1><u>Medicines:</u></h1>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'row',
                            }}>
                                {medicineData.map((medicine, index) => (
                                    <Card key={index} sx={{ maxWidth: 345, marginRight: '4vw' }}>
                                        <CardActionArea>
                                            <CardMedia
                                                component="img"
                                                width="200"
                                                height="300"
                                                image={`http://localhost:5001/public/${medicine.images[0]}`}
                                                alt="medicine"
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="div">
                                                    {medicine.name}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    <b>Description</b>: {medicine.description}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary" sx={{ marginTop: '5px' }}>
                                                    {medicine.urls.map((url,index) => {
                                                        return (
                                                            <span key={index} style={{ marginTop: '5px' }}>
                                                                <b>Url</b>: <a href={url} target="_blank" rel="noopener noreferrer" style={{ color: 'white' }}>{url}</a>
                                                            </span>
                                                        )
                                                    })}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                ))}
                            </Box>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default DummyResult