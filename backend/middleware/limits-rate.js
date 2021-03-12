const rateLimit = require("express-rate-limit")

//limiting the amounth of request send to our API 
const apiLimiter = rateLimit({
     windowMs: 1 * 60 * 1000, //for an amounth of time of 15 mins 
     max: 500 //limiting the number of calls 
});

// exporting
module.exports = apiLimiter 