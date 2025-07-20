const jwt = require("jsonwebtoken");
const User = require("../Models/user"); 

const authToken = async(req, res, next) => {
  const token = req.cookies.token;
  
  console.log("Cookies recieved:", req.cookies);

  if (!token) {
    // console.log("No token received in cookies");
    return res.status(401).json({ message: "No token, access denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("Decoded user:", decoded);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authToken; 

