import { Router } from 'express';
import { PeliculaOSerieService } from '../services/peliculaService.js';
import { Authenticate } from '../common/jwt.strategy.js';

const router = Router();
const peliculaService = new PeliculaOSerieService();


router.get('', Authenticate , async (req, res) => {

  
  const { name, order } = req.query;
  
  const peliculas = await peliculaService.getPeliculaOSerie(name, order);


  return res.status(200).json(peliculas);
});

router.get('/:id', Authenticate, async (req, res) => {

  const id=req.params.id;
if(id<1)
{
    return res.status(400).send();
}
  const peliculaId = await peliculaService.getpeliculaOSerieById(id);

  if (peliculaId == null) {
    return res.status(404).send();
  } 
  else
   {
    return res.status(200).json(peliculaId);
  }
});

router.post('', Authenticate, async (req, res) => {
  if (req.body.calificacion < 1 || req.body.calificacion > 5 ) {
    return res.status(400).json({error: "La calificacion no es correcta (tiene que ser entre 1 y 5)"})
  }

  const crearpelicula = await peliculaService.createpeliculaOSerie(req.body);

  return res.status(201).json(crearpelicula);
});

router.put('/:id', Authenticate,  async (req, res) => {
  const id = req.params.id;

  if(id<1)
{
    return res.status(400).send();
}
  if (req.body.calificacion < 1 || req.body.calificacion > 5) {
    return res.status(400).json({ error: "La calificacion no es correcta (tiene que ser entre 1 y 5)" });
  }
  const updatepelicula = await peliculaService.updatepeliculaOSerieById(req.body, id);
  if(updatepelicula.rowsAffected === 0)
  {
      return res.status(404).send();
  }
  else if(updatepelicula!=null){
  return res.status(200).send(updatepelicula);
  }
});

router.delete('/:id',Authenticate,  async (req, res) => {
  const id=req.params.id;
  if(id<1)
      {
          return res.status(400).send();
      }
  const eliminarpelicula = await peliculaService.deletepeliculaOSerieById(id);

 //no nos salio el error 404 hubo muchas complicaciones por el tema de como hicimos para que borre lo de la tabla relacionada
    return res.status(200).send(eliminarpelicula);
  
});

export default router;