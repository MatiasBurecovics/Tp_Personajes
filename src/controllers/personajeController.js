import { Router } from 'express';
import { PersonajeService } from '../services/personajeService.js';
import { Authenticate } from '../common/jwt.strategy.js';

const router = Router();
const personajeService = new PersonajeService();

router.get('', Authenticate , async (req, res) => {
  console.log(`This is a get operation`);
  
  const personajes= await personajeService.getPersonajes();

  return res.status(200).json(personajes);
});

router.get('', Authenticate, async (req, res) => {
  console.log(`Request URL Param: ${req.params.id}`);
  console.log(`This is a get operation`);

  const personajeId = await personajeService.getPersonajesById(req.params.id);

  return res.status(200).json(personajeId);
});

router.post('', Authenticate, async (req, res) => {
  console.log(`This is a post operation`);

  const crearPersonaje = await personajeService.createPersonaje(req.body);

  return res.status(201).json(crearPersonaje);
});

router.put('/:id',Authenticate,  async (req, res) => {
  console.log(`Request URL Param: ${req.params.id}`);
  console.log(`This is a put operation`);

  const pizza = await pizzaService.updatePizzaById(req.body);

  return res.status(200).json(pizza);
});

router.delete('/:id',Authenticate,  async (req, res) => {
  console.log(`Request URL Param: ${req.params.id}`);
  console.log(`This is a delete operation`);

  const pizza = await pizzaService.deletePizzaById(req.params.id);

  return res.status(200).json(pizza);
});

export default router;