import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

router.post('/', async (req, res) => {
  // À implémenter
  res.send('Formulaire reçu (test)');
});

export default router;
