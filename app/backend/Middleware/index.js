const jwt  = require("jsonwebtoken")
require('dotenv').config()
const secret = process.env.SECRET_JWT


module.exports = (req,res,next)=>{
	const authHeader = req.headers.authorization;
    
    if (!authHeader) return res.status(401).json({ message: 'Token not provided' });
    
    const parts = authHeader.split(' ');
  
    if (parts.length !== 2) return res.status(401).json({ message: 'Invalid token format' });
    
  
    const [scheme, token] = parts;
  
    if (!/^Bearer$/i.test(scheme)) return res.status(401).json({ message: 'Invalid token format' });
    
    try {
      const decoded = jwt.verify(token, secret);
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
}