const jwt = require('jsonwebtoken');
const config = require('../../config');
const User = require('../models/user.model');

exports.verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).send({ message: 'No token provided!' });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: 'Unauthorized!' });
        }
        req.userId = decoded.id;
        next();
    });
};

exports.isAdmin = (req, res, next) => {
    User.findById(req.userId, (err, user) => {
        if (err) {
            return res.status(500).send({ message: err });
        }

        if (user && user.role === 'admin') {
            next();
            return;
        }

        return res.status(403).send({ message: 'Require Admin Role!' });
    });
};