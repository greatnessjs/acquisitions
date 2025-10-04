import logger from '#config/logger.js';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'app_default_secret_key';
const EXPIRATION_TIME = '1d';

export const jwtToken = {
  sign: payload => {
    try {
      return jwt.sign(payload, SECRET_KEY, { expiresIn: EXPIRATION_TIME });
    } catch (error) {
      logger.error('Error signing JWT:', error);
      throw new Error('Could not sign JWT');
    }
  },

  verify: token => {
    try {
      return jwt.verify(token, SECRET_KEY);
    } catch (error) {
      logger.error('Error verifying JWT:', error);
      throw new Error('Could not verify JWT');
    }
  },
};
