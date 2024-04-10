// to connect with medicine Collection 
const Medicine = require('../../Model/Medicine.js');

const deleteMedicine = async(req, res) =>{
    try{
        let medicine = await Medicine.findById(req.params.id)
        if (!medicine) {
            return res.status(404).send("No such medicine.")
        }

        // without admin auth-token, this api won't work. task achieved

        // but what about deleting thhe restaurant's menu? That should be deleted first else it won't be deleted then forever.
        medicine = await Medicine.findByIdAndDelete(req.params.id)
        return res.json({ "Success": "Deleted the medicine successfully", signal: "green" })
    }catch(e){
        console.log(e);
        res.status(500).json({error: "some error occured", signal: 'red'});
    }
}

module.exports = deleteMedicine