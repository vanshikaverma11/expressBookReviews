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
const token = req.session.authorization ? req.session.authorization.accessToken : null;

if (!token) {
  return res.status(403).json({ message: "User not authenticated. Please login first." });
}

jwt.verify(token, "access", (err, decoded) => {
  if (err) {
    return res.status(403).json({ message: "Invalid or expired token." });
  }
  req.user = decoded; // Store the decoded token data (user info)
  next(); // Proceed to the next middleware or route
});
});
 
const PORT =5000;

app.use("/customer", customer_routes);
app.use('/public', public_users);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running"));
