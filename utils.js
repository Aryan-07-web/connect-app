import jwt from 'jsonwebtoken';

export const generateToken = (userId, res) => {
  // user will need to authenticate again after 7 days, since this token is generated for authentication and works only for 7 days
  const token = jwt.sign({userId}, process.env.JWT_SECRET, {
    expiresIn: '7d' // Token will expire in 7 days
  })

  res.cookie("jwt",token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
    sameSite: "Strict", // Helps prevent CSRF attacks
    secure: process.env.NODE_ENV !== 'development' // Use secure cookies in production
  })

  return token;
};