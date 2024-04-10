// to connect with collection in mongoDb 
const Admin = require('../../Model/Admin');

const adminAuthtokenLogin = async (req,res)=>{

    try {
        // fetching the id provided by fetchCustomer middleware 
        const adminId = req.admin.id;

        // gethering the details of custmr with provided id 
        const admin = await Admin.findById(adminId).select("-password");
        if(!admin){
           return res.status(401).json({error: "Authentication fail please login", signal: 'red'});
        }
        return res.json({admin:admin, signal: 'green'});

    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal Server Error", signal: "red"}); 
    }
 };

 module.exports = adminAuthtokenLogin;