import sql from 'mssql'
import config from '../../db.js'
import 'dotenv/config'

const personajeTabla = process.env.DB_TABLA_PERSONAJE;

export class PersonajeService {

    getPersonajes = async () => {
        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        const response = await pool.request().query(`SELECT Imagen, Nombre, Id from ${personajeTabla}`);
        console.log(response)

        return response.recordset;
    }

    getPizzaById = async (id) => {
        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('id',sql.Int, id)
            .query(`SELECT * from ${pizzaTabla} where id = @id`);
        console.log(response)

        return response.recordset[0];
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

    updatePizzaById = async (id, pizza) => {
        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('id',sql.Int, id)
            .input('Nombre',sql.NChar, pizza?.nombre ?? '')
            .input('LibreGluten',sql.Bit, pizza?.libreGluten ?? false)
            .input('Importe',sql.NChar, pizza?.importe ?? 0)
            .input('Descripcion',sql.NChar, pizza?.description ?? '')
            .query(`UPDATE Pizzas SET Nombre = @Nombre, LibreGluten = @LibreGluten, Importe = @Importe, Descripcion = @Descripcion WHERE id = @Id`);
        console.log(response)

        return response.recordset;
    }

    deletePizzaById = async (id) => {
        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('id',sql.Int, id)
            .query(`DELETE FROM ${pizzaTabla} WHERE id = @id`);
        console.log(response)

        return response.recordset;
    }
}