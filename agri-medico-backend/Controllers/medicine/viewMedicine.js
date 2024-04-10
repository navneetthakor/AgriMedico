// to connect with medicine Collection 
const Medicine = require('../../Model/Medicine.js');

const viewMedicine = async(req,res) =>{
    try{
        const medicines = await Medicine.find()

        if(!medicines){
            return res.status(400).json({error: "No medicines."})
        }

        return res.status(200).json({medicines, signal: "green"})
        
    }catch(e){
        console.log(e);
        res.status(500).json({error: "some error occured", signal: 'red'});
    }
};

module.exports = viewMedicine;