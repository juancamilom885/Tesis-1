import { Router, Request, Response } from 'express';

const router = Router();

/* POST /auth/login */
router.post('/login', (req: Request, res: Response): void => {
  const { username, password } = req.body as {
    username: string;
    password: string;
  };

  const CXO_USER_NAME = 'juancamilo';
  const CXO_PASSWORD = '123456';
  const CXO_USER_DATA = {
    firstName: 'juancamilo',
    lastName: 'Martinez',
    username: 'juancamilo',
    role: 'ceo',
    jwtToken: 'mock-jwt-token',
  };

  if (username === CXO_USER_NAME && password === CXO_PASSWORD) {
    res.json(CXO_USER_DATA);
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

export default router;
