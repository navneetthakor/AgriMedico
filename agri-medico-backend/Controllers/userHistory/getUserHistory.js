// to connect with collection 
const UserHistory = require("../../Model/UserHistory");

const getUserHistory = async (req,res) => {
    try{
        const history = await UserHistory.findOne({user_id: req.user.id});
        if(!history){
            return res.status(400).json({error: "No history.", signal: 'red'})
        }
        return res.status(200).json({history: history, signal: 'green'});

    } catch (e) {
        console.log(e);
        return res
          .status(500)
          .json({ error: "Internal server error", signal: "red" });
      }
};

module.exports = getUserHistory;