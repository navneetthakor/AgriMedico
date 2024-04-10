// to connect with medicine Collection 
const Disease = require('../../Model/Disease.js');

const viewDisease = async(req, res) => {
    try{
        const disease = await Disease.find()

        if(!disease){
            return res.status(400).json({error: "No disease."})
        }

        return res.status(200).json({disease, signal: "green"})
        
    }catch(e){
        console.log(e);
        res.status(500).json({error: "some error occured", signal: 'red'});
    }
}

module.exports = viewDisease