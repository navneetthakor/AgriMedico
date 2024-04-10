// to connect with disease Collection 
const Disease = require('../../Model/Disease.js');

const deleteDisease = async(req, res) => {
    try{
        let disease = await Disease.findById(req.params.id)
        if (!disease) {
            return res.status(404).send("No such disease.")
        }

        // without admin auth-token, this api won't work. task achieved

        // but what about deleting thhe restaurant's menu? That should be deleted first else it won't be deleted then forever.
        disease = await Disease.findByIdAndDelete(req.params.id)
        return res.json({ "Success": "Deleted the disease successfully", signal: "green" })
    }catch(e){
        console.log(e);
        res.status(500).json({error: "some error occured", signal: 'red'});
    }
}

module.exports = deleteDisease