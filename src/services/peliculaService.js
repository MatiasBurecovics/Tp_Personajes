import sql from 'mssql'
import config from '../../db.js'
import 'dotenv/config'

const peliculaOSerieTabla = process.env.DB_TABLA_peliculaOSerie;
const PerYPelTabla = process.env.DB_TABLA_peliculaOSerie_PELICULA;
const peliculaTabla = process.env.DB_TABLA_PELICULAOSERIE;

export class PeliculaOSerieService {

    getPeliculaOSerie = async () => {
        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        const response = await pool.request().query(`SELECT Imagen, Nombre, Id from ${peliculaOSerieTabla}`);
        console.log(response)

        return response.recordset;
    }

    getpeliculaOSerieById = async (id) => {
        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        const response = await pool.request()
       .input("pId", sql.Int,id)
        .query(`SELECT * FROM ${peliculaOSerieTabla} WHERE Id=@pId`);
        console.log(response)

        return response.recordset;
    }

    createpeliculaOSerie= async (peliculaOSerie) => {
        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('Imagen',sql.NChar, peliculaOSerie?.imagen ?? '')
            .input('Nombre',sql.NChar, peliculaOSerie?.nombre ?? '')
            .input('Edad',sql.Int, peliculaOSerie?.edad ?? 0)
            .input('Peso',sql.Float, peliculaOSerie?.peso ?? 0)
            .input('Historia',sql.NChar, peliculaOSerie?.historia ?? '')
            .query(`INSERT INTO ${peliculaOSerieTabla}(Imagen, Nombre, Edad,Peso, Historia) VALUES (@Imagen, @Nombre, @Edad,@Peso, @Historia)`);
        console.log(response)

        return response.recordset;
    }

    updatepeliculaOSerieById = async (peliculaOSerie,id) => {

      const pool = await sql.connect(config);
        const response = await pool.request()
            .input('Id',sql.Int, id)
            .input('Imagen',sql.NChar, peliculaOSerie?.imagen ?? '')
            .input('Nombre',sql.NChar, peliculaOSerie?.nombre ?? '')
            .input('Edad',sql.Int, peliculaOSerie?.edad ?? 0)
            .input('Peso',sql.Float, peliculaOSerie?.peso ?? 0)
            .input('Historia',sql.NChar, peliculaOSerie?.historia ?? '')
            .query(`UPDATE ${peliculaOSerieTabla} SET Imagen = @Imagen , Nombre = @Nombre, Edad = @Edad, Peso = @Peso, Historia = @Historia WHERE Id = @Id`);
        console.log(response)

        return response.recordset;
    }

    deletepeliculaOSerieById = async (id) => {
        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('Id',sql.Int, id)
            .query(`DELETE FROM ${peliculaOSerieTabla}, ${PerYPelTabla} WHERE Id_peliculaOSerie = @id`);
        console.log(response)

        return response.recordset;
    }
}