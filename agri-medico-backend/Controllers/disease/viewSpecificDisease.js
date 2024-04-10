// to connect with medicine Collection 
const Disease = require('../../Model/Disease.js');

// to validate body params 
const {validationResult} = require('express-validator');

const viewSpecificDisease = async(req, res) => {
    try{
        
        const err =  validationResult(req);
        if(!err.isEmpty()){
            // delete uploaded file 
            return res.status(400).json({error: err.array(), signal: "red"})
        }
        
        const disease = await Disease.find({ name: req.body.name});

        if(!disease){
            return res.status(400).json({error: "No diseases."})
        }

        return res.status(200).json({disease: disease[0], signal: "green"})
        
    }catch(e){
        console.log(e);
        res.status(500).json({error: "some error occured", signal: 'red'});
    }F
}

module.exports = viewSpecificDisease