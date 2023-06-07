import sql from 'mssql'
import config from '../../db.js'
import 'dotenv/config'

const personajeTabla = process.env.DB_TABLA_PERSONAJE;
const PerYPelTabla = process.env.DB_TABLA_PERSONAJE_PELICULA;

export class PersonajeService {

    getPersonajes = async () => {
        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        const response = await pool.request().query(`SELECT Imagen, Nombre, Id from ${personajeTabla}`);
        console.log(response)

        return response.recordset;
    }

    getPersonajesById = async (id) => {
        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        const response = await pool.request()
       .input("pId", sql.Int,id)
        .query(`SELECT * FROM ${personajeTabla} WHERE Id=@pId`);
        console.log(response)

        return response.recordset;
    }

    createPersonaje= async (personaje) => {
        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('Imagen',sql.NChar, personaje?.imagen ?? '')
            .input('Nombre',sql.NChar, personaje?.nombre ?? '')
            .input('Edad',sql.Int, personaje?.edad ?? 0)
            .input('Peso',sql.Float, personaje?.peso ?? 0)
            .input('Historia',sql.NChar, personaje?.historia ?? '')
            .query(`INSERT INTO ${personajeTabla}(Imagen, Nombre, Edad,Peso, Historia) VALUES (@Imagen, @Nombre, @Edad,@Peso, @Historia)`);
        console.log(response)

        return response.recordset;
    }

    updatePersonajeById = async (personaje,id) => {

      const pool = await sql.connect(config);
        const response = await pool.request()
            .input('Id',sql.Int, id)
            .input('Imagen',sql.NChar, personaje?.imagen ?? '')
            .input('Nombre',sql.NChar, personaje?.nombre ?? '')
            .input('Edad',sql.Int, personaje?.edad ?? 0)
            .input('Peso',sql.Float, personaje?.peso ?? 0)
            .input('Historia',sql.NChar, personaje?.historia ?? '')
            .query(`UPDATE ${personajeTabla} SET Imagen = @Imagen , Nombre = @Nombre, Edad = @Edad, Peso = @Peso, Historia = @Historia WHERE Id = @Id`);
        console.log(response)

        return response.recordset;
    }

    deletePersonajeById = async (id) => {
        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('Id',sql.Int, id)
            .query(`DELETE FROM ${personajeTabla}, ${PerYPelTabla} WHERE Id_personaje = @id`);
        console.log(response)

        return response.recordset;
    }
}
