const jwt = require("jsonwebtoken");
const secret = "gaurav1234"


function token(user) {
    return jwt.sign(user, secret)
}

// const generateToken = (id) => {
//   const expiresIn = process.env.JWT_AUTH_TOKEN_EXPIRY_IN_DAYS +"d"
//   return jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn
//   });
// };

module.exports = {token};