const rateLimit = require("express-rate-limit")

//limiting the amounth of request send to our API 
const apiLimiter = rateLimit({
     windowMs: 15 * 60 * 1000, //for an amounth of time of 15 mins 
     max: 100 //limiting the number of IP 
});

// exporting
module.exports = apiLimiter 