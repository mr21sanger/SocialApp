const jwt = require("jsonwebtoken");

const isAuthenticated = async(req,res,next) => {
  try {
    const {token} = req.cookies;
    console.log(token)
  } catch (error) {
    console.log(error)
  }
};

// isAuthenticated()
