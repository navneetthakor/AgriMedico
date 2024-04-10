import React, { useState, useEffect } from 'react';
import { Box } from '@mui/system';
import { useNavigate, useParams } from 'react-router-dom';


const HistoryResult = () => {
    const {userHistoryId} = useParams()
    const [result, setResult] = useState({})
    const [isResult, setIsResult] = useState(false);

    // for navigation 
    const navigate = useNavigate();

    const fetchDiseaseDetails = async () => {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_IP}/disease/getdiseasebyid`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "usertoken": localStorage.getItem('usertoken')
            },
            body: JSON.stringify({ id: userHistoryId })
        })
        const data = await response.json()
        
        if(data.signal === 'green'){
            setResult(data.result);
            setIsResult(true);
            return;
        }
        alert('server not responding');
        navigate('/');

        
    }

    useEffect(() => {
        fetchDiseaseDetails()
    }, [userHistoryId])

    return (
        <>
           {isResult && <Box>Hello</Box>}
            {/* <div style={{ marginLeft: '10vw' }}>
                <h2>Search Date: {historyData.search_date.substring(0, 10)} and Time: {historyData.search_date.substring(11, 19)}</h2>
                {showDiseaseContent && (
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
                                            height="140"
                                            image="img.jpg"
                                            alt="disease"
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

                        {showMedicineContent && medicineData.length > 0 && (
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
                                                    height="140"
                                                    image="img.jpg"
                                                    alt="medicine"
                                                />
                                                <CardContent>
                                                    <Typography gutterBottom variant="h5" component="div">
                                                        {medicine.name}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {medicine.description}
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
            </div> */}
        </>
    )
}

export default HistoryResult