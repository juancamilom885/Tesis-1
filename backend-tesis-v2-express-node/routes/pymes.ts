import { Router, Request, Response } from 'express';
import { mockPymes } from '../data/pymes.mock';

const router = Router();

/* GET /pymes */
router.get('/', (_req: Request, res: Response): void => {
  res.json(mockPymes);
});

/* GET /pymes/:id */
router.get('/:id', (req: Request, res: Response): void => {
  const { id } = req.params;
  const insight = mockPymes.find((ins) => ins.id === id);

  if (!insight) {
    res.status(404).json({ message: 'Pyme not found' });
    return;
  }

  res.json(insight);
});

export default router;
