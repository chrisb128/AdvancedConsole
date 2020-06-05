import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const tokenExpiration = {
  session: 31556926, // 1 year in seconds
  api: 1200 // 20 min in seconds
};

export const signJwtToken = async (userId, username, expiresIn) => {

  const payload = {
    id: userId,
    username: username
  };

  return new Promise((resolve, reject) => {
    // Sign token
    jwt.sign(
      payload,
      process.env.JWT_SECRET, 
      {
        expiresIn: expiresIn
      },
      (error, token) => {
        resolve({ error, token });
      }
    )
  });
};

export const checkPasswordMatch = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

export const generatePasswordHash = async (password) => {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt);
}