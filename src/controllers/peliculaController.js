import { Router } from 'express';
import { PeliculaOSerieService } from '../services/peliculaService.js';
import { Authenticate } from '../common/jwt.strategy.js';

const router = Router();
const peliculaService = new PeliculaOSerieService();


router.get('', Authenticate , async (req, res) => {
  console.log(`This is a get operation`);
  
  const peliculas= await peliculaService.getPeliculaOSerie();

  return res.status(200).json(peliculas);
});

router.get('/:id', Authenticate, async (req, res) => {
  console.log(`Request URL Param: ${req.params.id}`);
  console.log(`This is a get operation`);

  const peliculaId = await peliculaService.getpeliculaOSerieById(req.params.id);

  return res.status(200).json(peliculaId);
});

router.post('', Authenticate, async (req, res) => {
  console.log(`This is a post operation`);

  const crearpelicula = await peliculaService.createpeliculaOSerie(req.body);

  return res.status(201).json(crearpelicula);
});

router.put('/:id', Authenticate,  async (req, res) => {
  console.log(`Request URL Param: ${req.params.id}`);
  console.log(`This is a put operation`);

  const updatepelicula = await peliculaService.updatepeliculaOSerieById(req.body,req.params.id);

  return res.status(200).json(updatepelicula);
});

router.delete('/:id',Authenticate,  async (req, res) => {
  console.log(`Request URL Param: ${req.params.id}`);
  console.log(`This is a delete operation`);

  const eliminarpelicula = await peliculaService.deletepeliculaOSerieById(req.params.id);

  return res.status(200).json(eliminarpelicula);
});

export default router;