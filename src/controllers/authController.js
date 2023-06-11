import { Router } from 'express';
import { getSignedToken } from '../../index.js';

const router = Router();

router.get('/login', async (req, res) => {
  
    const token = getSignedToken();
  
    return res.status(200).json(token);
  });
  
  export default router;