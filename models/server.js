const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');
const fileUpload = require('express-fileupload');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            auth: '/api/auth',
            buscar: '/api/buscar',
            categorias: '/api/categorias',
            uploads: '/api/uploads',
            usuarios: '/api/usuarios',
            productos: '/api/productos',
        }

        //Conectar a base de datos
        this.conectarDB();

        //Middlewares
        this.middlewares();

        //rutas de mi aplicacion
        this.routes();
    };

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio publico
        this.app.use( express.static('public') );

        // Fileupload - Carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));

    };  

    routes() {
        this.app.use(this.paths.auth, require('../routes/auth'))
        this.app.use(this.paths.buscar, require('../routes/buscar'))
        this.app.use(this.paths.categorias, require('../routes/categorias'))
        this.app.use(this.paths.productos, require('../routes/productos'))   
        this.app.use(this.paths.uploads, require('../routes/uploads'))   
        this.app.use(this.paths.usuarios, require('../routes/usuarios'))         
    };

    listen() {
        this.app.listen( this.port, () =>{
            console.log('Servidor corriendo en puerto', this.port);
        });
    };

};

module.exports = Server;