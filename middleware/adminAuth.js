const jwt = require("jsonwebtoken");
const adminAuth = (req, res, next) => {
    const SECRET = process.env.SECRET || 'alphaMale1';
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).send("No token provided");
    }
    req.id  = jwt.verify(token, SECRET).id;
    next();
}
module.exports = adminAuth;