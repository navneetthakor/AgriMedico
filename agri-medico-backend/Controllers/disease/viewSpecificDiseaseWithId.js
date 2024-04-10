const Disease = require('../../Model/Disease.js');
const Medicine = require('../../Model/Medicine.js');


const viewSpecificDiseaseWithId = async (req, res) => {
    try {
        const disease = await Disease.findById(req.body.id);

        if (!disease) {
            return res.status(400).json({ error: "No diseases." })
        }

        const medicine = disease.medicine_name

        const medicines = await Medicine.find({ name: { $in: medicine } });
        if (!medicines) {
            return res.status(400).json({ error: "No medicines." })
        }
        return res.status(200).json({ disease, medicines, signal:"green" })

    } catch (e) {
        console.log(e);
        res.status(500).json({ error: "some error occured", signal: 'red' });
    }
}

module.exports = viewSpecificDiseaseWithId