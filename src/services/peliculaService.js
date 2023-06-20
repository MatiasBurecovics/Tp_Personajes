import sql from 'mssql'
import config from '../../db.js'
import 'dotenv/config'

const personajeTabla = process.env.DB_TABLA_PERSONAJE;
const PerYPelTabla = process.env.DB_TABLA_PERSONAJE_PELICULA;
const peliculaTabla = process.env.DB_TABLA_PELICULAOSERIE;

export class PeliculaOSerieService {

    getPeliculaOSerie = async (name = '', order = '') => {
       
        const pool = await sql.connect(config);
  
        let query = `SELECT Id, Imagen, Titulo, Fecha_de_creacion FROM ${peliculaTabla}`;
        
        if (name) {
          query += ` WHERE Titulo LIKE '%${name}%'`;
        }
        
        if (order.toUpperCase() === 'ASC' || order.toUpperCase() === 'DESC') {
            query += ` ORDER BY Fecha_de_creacion ${order.toUpperCase()}`;
          } 
        const response = await pool.request().query(query);
        console.log(response);
  
  return response.recordset;
    }

    getpeliculaOSerieById = async (id) => {
        const pool = await sql.connect(config);
        const response = await pool.request().input("pId", sql.Int,id).query(`SELECT * FROM ${peliculaTabla} WHERE Id = @pId`)
        if (response.recordset.length == 0) {
            return null
          }
        const response2 = await pool.request().input("pId", sql.Int,id).query(`SELECT Nombre FROM ${personajeTabla} INNER JOIN ${PerYPelTabla} ON ${personajeTabla}.Id = ${PerYPelTabla}.Id_Personaje WHERE ${PerYPelTabla}.Id_PeliculaOSerie= @pId`)
        const peliculaOSerie = response.recordset[0]
        peliculaOSerie.Personaje = response2.recordset
        return peliculaOSerie;
    }

    createpeliculaOSerie= async (peliculaOSerie) => {

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('Imagen',sql.NChar, peliculaOSerie?.imagen ?? '')
            .input('Titulo',sql.NChar, peliculaOSerie?.titulo ?? '')
            .input('Fecha_de_creacion',sql.DateTime, peliculaOSerie.fecha_de_creacion)
            .input('Calificacion',sql.Float, peliculaOSerie?.calificacion ?? 0)
            .query(`INSERT INTO ${peliculaTabla}(Imagen, Titulo, Fecha_de_creacion,Calificacion) VALUES (@Imagen, @Titulo, @Fecha_de_creacion,@Calificacion)`);
        console.log(response)

        return response.recordset;
    }

    updatepeliculaOSerieById = async (peliculaOSerie,id) => {
        const pool = await sql.connect(config);
        const valoresOriginales =  await this.getpeliculaOSerieById(id)
        const response = await pool.request()
           .input('Id',sql.Int, id)
           .input('Imagen', sql.NChar, peliculaOSerie.imagen?? (valoresOriginales?.Imagen || ''))
           .input('Titulo', sql.NChar, peliculaOSerie.titulo ??(valoresOriginales?.Titulo || ''))
           .input('Fecha_de_creacion', sql.DateTime, peliculaOSerie.fecha_de_creacion ?? (valoresOriginales?.Fecha_de_creacion || new Date()))
           .input('Calificacion', sql.Float, peliculaOSerie.calificacion?? (valoresOriginales?.Calificacion || 0))
            .query(`UPDATE ${peliculaTabla} SET Imagen = @Imagen , Titulo = @Titulo, Fecha_de_creacion = @Fecha_de_creacion, Calificacion = @Calificacion WHERE Id = @Id`);
        console.log(response)

        return {
          rowsAffected: response.rowsAffected[0],
          recordset: response.recordset
        };
    }

    deletepeliculaOSerieById = async (id) => {
        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('Id',sql.Int, id)
            .query(`
            DELETE FROM ${PerYPelTabla} WHERE Id_PeliculaOSerie = @Id;
            DELETE FROM ${peliculaTabla} WHERE Id = @Id;
          `);
        console.log(response)
      
        return response.recordset;
    }
}