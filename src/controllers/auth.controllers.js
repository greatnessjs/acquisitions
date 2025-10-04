import { registerSchema } from '#validations/auth.validations.js';
import { format } from 'morgan';
import logger from '#config/logger.js';
import { createUser } from '#services/auth.service.js';
import { jwtToken } from '#utils/jwt.js';
import { cookies } from '#utils/cookies.js';
import { formatError } from '#utils/format.js';

export const signup =async(req, res) => {
  try {
    const validationResult = registerSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        message: 'Validation error',
        details: formatError(validationResult.error),
      });
    }

    const { name, email, password, role } = validationResult.data;

    const user = await createUser({ name, email, password, role });

    const token =  jwtToken.sign(user);

    cookies.set(res, 'token', token);

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        ...user, password: undefined,
      },
      token
    });

  } catch (error) {
    logger.error('Error during user registration:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
