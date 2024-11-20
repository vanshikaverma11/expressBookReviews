const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;


const app = express();

app.use(express.json());

app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

app.use("/customer/auth/*", function auth(req,res,next){
//authenication mechanism here
if (!req.session.authorization) {
    return res.status(401).json({ message: "User not authenticated. Please login first." });
  }

  const token = req.session.authorization.accessToken;
  
  // If there is a token in session, verify it
  jwt.verify(token, 'access', (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }

    // If token is valid, attach user info to request object
    req.user = user;
    next(); // Continue to the next middleware or route handler
  });
});
 
const PORT =5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running"));
