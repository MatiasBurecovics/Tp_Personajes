import sql from 'mssql'
import config from '../../db.js'
import 'dotenv/config'

const personajeTabla = process.env.DB_TABLA_PERSONAJE;
const PerYPelTabla = process.env.DB_TABLA_PERSONAJE_PELICULA;
const peliculaTabla = process.env.DB_TABLA_PELICULAOSERIE;

export class PersonajeService {

    getPersonajes = async (name = '', age = 0,weight=0,movies=0) => {
        const pool = await sql.connect(config);
        let query=`SELECT Imagen, Nombre, Id from ${personajeTabla}`
        let where =false
        if (name) {

          if(where)
          {
            
            query += ` AND Nombre LIKE '%${name}%'`;
          }
           else
           {
            query += ` WHERE Nombre LIKE '%${name}%'`;
          where=true
           }
          
          }
            if (age) {

            if(where)
          {
            query += ` AND Edad LIKE '%${age}%'`;
          }
           else
           {
            query += ` WHERE Edad LIKE '%${age}%'`;
            where=true
           }
          }

          if (weight) {
            if(where)
            {
              query += ` AND Peso LIKE '%${weight}%'`;
            }
             else
             {
              query += ` WHERE Peso LIKE '%${weight}%'`;
              where=true
             }
          }
          if (movies) {
            if (where) {
              query += ` AND Id IN (SELECT Id_Personaje FROM ${PerYPelTabla} WHERE Id_PeliculaOSerie = ${movies})`;
            } 
            else {
              query += ` WHERE Id IN (SELECT Id_Personaje FROM ${PerYPelTabla} WHERE Id_PeliculaOSerie = ${movies})`;
              where = true;
            }
          }
        const response = await pool.request().query(query);
        console.log(response)
        return response.recordset;
    }

    getPersonajesById = async (id) => {
        const pool = await sql.connect(config);
        const response = await pool.request().input("pId", sql.Int,id).query(`SELECT * FROM ${personajeTabla} WHERE Id = @pId`)
        const response2 = await pool.request().input("pId", sql.Int,id).query(`SELECT Titulo FROM ${peliculaTabla} INNER JOIN ${PerYPelTabla} ON ${peliculaTabla}.Id = ${PerYPelTabla}.Id_PeliculaOSerie WHERE ${PerYPelTabla}.Id_Personaje= @pId`)
        const personaje = response.recordset[0]
        personaje.peliculaoserie = response2.recordset
        return personaje;
    }

    createPersonaje= async (personaje) => {

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
            .query(`UPDATE ${personajeTabla} SET Imagen = @Imagen , Nombre = @Nombre, Edad = @Edad, Peso = @Peso, Historia = @Historia WHERE personaje.Id = @Id`);
        console.log(response)

        return response.recordset;
    }

    deletePersonajeById = async (id) => {

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('Id',sql.Int, id)
            .query(`
            DELETE FROM ${PerYPelTabla} WHERE Id_Personaje = @Id;
            DELETE FROM ${personajeTabla} WHERE Id = @Id;
          `);
        console.log(response)

        return response.recordset;
    }
}