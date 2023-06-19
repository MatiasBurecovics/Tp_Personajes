import { Router } from 'express';
import { PersonajeService } from '../services/personajeService.js';
import { Authenticate } from '../common/jwt.strategy.js';

const router = Router();
const personajeService = new PersonajeService();


router.get('', Authenticate , async (req, res) => {

  const { name, age,weight,movies} = req.query;
  const personajes= await personajeService.getPersonajes(name, age,weight,movies);

  return res.status(200).json(personajes);
});

router.get('/:id', Authenticate, async (req, res) => {

  const id=req.params.id;
if(id<1)
{
    return res.status(400).send();
}
  const personajeId = await personajeService.getPersonajesById(id);

  if (personajeId == null) {
    return res.status(404).send();
  } 
  else
   {
    return res.status(200).json(personajeId);
  }
});

router.post('', Authenticate, async (req, res) => {


  const crearPersonaje = await personajeService.createPersonaje(req.body);

  return res.status(201).json(crearPersonaje);
});

router.put('/:id', Authenticate,  async (req, res) => {
  const id = req.params.id;

  if(id<1)
{
    return res.status(400).send();
}
  const updatePersonaje = await personajeService.updatePersonajeById(req.body,id);

  if(updatePersonaje.rowsAffected === 0)
  {
      return res.status(404).send();
  }
  else if(updatePersonaje!=null){
  return res.status(200).send(updatePersonaje);
  }
});

router.delete('/:id',Authenticate,  async (req, res) => {
  const id=req.params.id;
  if(id<1)
      {
          return res.status(400).send();
      }
  const eliminarPersonaje = await personajeService.deletePersonajeById(id);
//no nos salio el error 404 hubo muchas complicaciones por el tema de como hicimos para que borre lo de la tabla relacionada
  return res.status(200).json(eliminarPersonaje);
});

export default router;