import * as authService from '../services/auth.service.js';


export const login = async (req, res, next) => {
  const { email, password } = req.body;

  
  const token = await authService.loginUser(email, password);

  res.json({ token });

};