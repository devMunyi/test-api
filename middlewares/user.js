const { verify } = require('jsonwebtoken');
const { expressjwt } = require('express-jwt');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const secret = config.JWT_SECRET;

module.exports = {
    //use either requireSignin or checkToken to validate token
    requireSignin: expressjwt({
        secret,
        algorithms: ['HS256'],
    }),

    //validate token
    checkToken: (req, res, next) => {

        let token = req.get('authorization');

        if (token) {
            if(!token.includes('Bearer')){
                return res.status(400).json({ message: "Bad request" })
            }
            token = token.slice(7);
            verify(token, secret, (err, decoded) => {
                if (err) {
                    return res.status(401).json({
                        message: 'You entered invalid token',
                    });
                } else {
                    const { userId } = decoded;
                    req.auth = { userId };
                    next();
                }
            });
        } else {
            res.status(401).json({
                message: 'Invalid token, please login',
            });
        }
    },
};