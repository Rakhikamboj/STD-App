import jwt from 'jsonwebtoken';
import Doctor from '../models/Doctor.js';

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get doctor from token
      req.doctor = await Doctor.findById(decoded.id).select('-password');

      if (!req.doctor) {
        return res.status(401).json({
          message: 'Not authorized, doctor not found',
        });
      }

      return next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({
        message: 'Not authorized, token failed',
      });
    }
  }

  return res.status(401).json({
    message: 'Not authorized, no token',
  });
};

export const verifiedOnly = (req, res, next) => {
  if (!req.doctor?.isVerified) {
    return res.status(403).json({
      message: 'Access denied. Your account is pending verification.',
    });
  }
  next();
};

