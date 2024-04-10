// to connect with collections
const UserHistory = require("../../Model/UserHistory");
const Disease = require("../../Model/Disease");

// to validate body parameters
const { validationResult, check } = require("express-validator");

const addToUserHistory = async (req, res) => {
  try {
    // validate body params
    // const err = validationResult(req);
    // if (!err.isEmpty()) {
    //   return res.status(400).json({ error: err.array(), signal: "red" });
    // }
    // check whether disease exists or not
    const disease = await Disease.findById(req.body.disease_obj.disease);
    if (!disease) {
      return res
        .status(400)
        .json({ error: "disease not exists", signal: "red" });
    }
    // we are not checking for User existance because
    // if user exists then only it's document ins UserHistory collection will exists
    // so existance of user is implicit

    // find UserHistory collection for given user_id
    const userHistory = await UserHistory.findOne({
      user_id: req.user.id,
    });
    if (!userHistory) {
      return res.status(400).json({ error: "User not exists", signal: "red" });
    }
    // now all safe to add current disease_id to userHistory document
    const updtUserHistory = await UserHistory.findByIdAndUpdate(
      userHistory._id,
      { $push: { search_history: req.body.disease_obj } },
      { new: true }
    );


    // getting userhistoryid and searchhistoryid for returning
    const getData = await UserHistory.find({user_id: req.user.id})
    const filteredData = getData[0].search_history.filter(data => data.img === req.body.disease_obj.img)
      return res.json({historyId: getData[0]._id, data: filteredData[0], signal:"green"})
    // return res.json({ userHistory: updtUserHistory, signal: "green" });
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ error: "Internal server error", signal: "red" });
  }
};

module.exports = addToUserHistory;
