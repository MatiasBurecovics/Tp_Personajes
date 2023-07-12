# Tp_Personajes
Este proyecto es una API para gestionar información sobre películas, series y personajes relacionados con Disney. Proporciona endpoints para obtener, crear, actualizar y eliminar registros de películas, series y personajes.

## Pelicula y personajes Api

 Este proyecto fue hecho con **Node**, **Nodemon**, **Express**, **MSSQL**, **passport**, **jwt**, **dotenv**

- Passport and jwt: Authentication

- Express: Framework for web application


- Dotenv: Interact with the [.env](./env) file

- MSSQL: Data Base

- Nodemon: When a modification is made, it reloads the project

# Instalacion

1. Clone / Descargar Repositorio
   
```bash
 git clone https://github.com/MatiasBurecovics/Tp_Personajes
```
2. Instalar dependencias
```bash
npm i 
```
# Pasos a seguir
1. Abrir sql managment studio, copiar el nombre del servidor y concetar

2. Con ese nombre que copias, abris el archivo .env y en la parte de DB_SERVER lo pegas
3. En sql managment studio , abris el script "***BD-DISNEY***" lo corres y despues abris "***01 - CreateLoginAndUser***"


# Uso de apis
1. Corre el proyecto
```bash
npm run watch
```	
 2. Para usar el proyecto hay 2 opciones: [Swagger](./SwaggerPersonajes.yaml) o [Postman](./TP_PERSONAJES.postman_collection.json)

3. 
**Autenticacion**:

-Para probar el endpoint de login, haga una petición GET a '/login' y recibirá un token de autenticación.

**Peliculas**:

-Para probar el endpoint de obtener películas, haga una petición GET a '/' y puede agregar los siguientes parámetros de búsqueda opcionales: 'name', 'order'.

-Para probar el endpoint de obtener una película por ID, haga una petición GET a '/:id' y proporcione el ID de la película.

-Para probar el endpoint de agregar una nueva película, haga una petición POST a '/' y proporcione la información de la película.

-Para probar el endpoint de actualizar una película existente, haga una petición PUT a '/:id' y proporcione el ID de la película y la información actualizada.

-Para probar el endpoint de eliminar una película, haga una petición DELETE a '/:id' y proporcione el ID de la película.

**Personajes**:

-Para probar el endpoint de obtener personajes, haga una petición GET a '/' y puede agregar los siguientes parámetros de búsqueda opcionales: 'name', 'age','weight','movies'.

-Para probar el endpoint de obtener un personaje por ID, haga una petición GET a '/:id' y proporcione el ID del personaje.

-Para probar el endpoint de agregar un nuevo personaje, haga una petición POST a '/' y proporcione la información del personaje.

-Para probar el endpoint de actualizar un personaje existente, haga una petición PUT a '/:id' y proporcione el ID del personaje y la información actualizada.

-Para probar el endpoint de eliminar un personaje, haga una petición DELETE a '/:id' y proporcione el ID del personaje.
#


    


    
