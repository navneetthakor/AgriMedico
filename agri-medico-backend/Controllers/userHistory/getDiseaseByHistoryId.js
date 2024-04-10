// to connect with collections
const UserHistory = require("../../Model/UserHistory");
const Disease = require("../../Model/Disease");
const Medicine = require("../../Model/Medicine");

const getDiseaseByHistoryId = async (req, res) => {
    try {
        const userHistory = await UserHistory.findById(req.body.userHistoryId);
        console.log(userHistory.search_history);
        const historyObj = userHistory.search_history.filter(searchObj => searchObj._id.toString() === req.body.searchHistoryId);

        const diseaseId = historyObj[0].disease;
        const userImg = historyObj[0].img
        const disease = await Disease.findById(diseaseId);

        if (!disease) {
            return res.status(400).json({ error: "No diseases." })
        }

        const diseaseObj = {
            name: disease.name,
            description: disease.description
        };

        const medicine = disease.medicine_name;

        const medicines = await Medicine.find({ name: { $in: medicine } }).select("-_id -__v -date ");
        if (!medicines) {
            return res.status(400).json({ error: "No medicines." });
        }

        return res.status(200).json({ disease: diseaseObj, medicines: medicines, img: userImg, signal: "green" })
    } catch (e) {
        console.log(e);
        return res
            .status(500)
            .json({ error: "Internal server error", signal: "red" });
    }
}

module.exports = getDiseaseByHistoryId