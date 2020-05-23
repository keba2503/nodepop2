'use strict'

const express = require('express');
const app = express();
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition : {
        info:{
            versión: '1.0.0',
            title: 'API NodePop',
            description: 'Api Documentation',
            contact: {
                name: 'Karen Borrero Arias'
            },
            servers: ['https://localhost:3000']
        }
    },
    basePath: '/',
    apis: ['./routes/api/anuncios.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/', swaggerUI.serve, swaggerUI.setup(swaggerDocs));


     
module.exports = app; 