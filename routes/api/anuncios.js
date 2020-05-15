'use strict'

const express = require('express');
const router = express.Router();
const Anuncios = require('../../models/Anuncios');

//Document con Swagger
//https://github.com/Surnet/swagger-jsdoc/blob/HEAD/docs/GETTING-STARTED.md

/**
 * @swagger
 * /api/anuncios:
 *  get:
 *      summary: Get Anuncios
 *      description: use for all ads
 *      produces:
 *         - application/json
 *      responses:
 *       200:
 *         description: Anuncios
 *         schema:
 *         type: json
 */


router.get('/', async (req, res, next) => {
    try {
        const name = req.query.name;
        const price = req.query.price;
        const tags  = req.query.tags
        const sale = req.query.sale;
        const limit = parseInt(req.query.limit) || 1000;
        const skip = parseInt(req.query.skip);
        const filter = {};
        
        if (typeof tags !== 'undefined') {
          filter.tags = tags;
        }

        if (typeof name !== 'undefined') {
          filter.name = name;
        }

        if(typeof price !== 'undefined'){
          filter.price = price;
        }
        
        if (typeof sale !== 'undefined') {
          filter.sale = sale;
        }

        const docs = await Anuncios.list(filter, limit, skip);
        res.json(docs);
    } catch(err) {
        next(err);
    }
});

//list tags
router.get('/tags', function (req, res) {
  res.json({tags: Anuncios.Tags() });
});

//Id search
router.get('/:id', async (req, res, next) => {
    try {
        const _id = req.params.id;
        const anuncios = await Anuncios.findOne({ _id: _id });
        res.json({ result: anuncios });
    } catch (err) {
        next(err);
    }
});

/**
 * @swagger
 * /api/anuncios:
 *  post:
 *      summary: Create Anuncio
 *      description: Use to create new anuncio
 *      produces:
 *         - application/json
 *      parameters:
 *         - in: body
 *           description: Anuncio Create
 *           schema:
 *               $ref: '#/definitions/Anuncios'
 *      responses:
 *       201:
 *         description: Create
 */

//POST
router.post('/', async (req, res, next) => {
  try {
    const anunciosData = req.body;
    console.log(req.body);
    //create
    const anuncios = new Anuncios(anunciosData);
    //save
    const anunciosSave = await anuncios.save();
    res.status(201).json({ result: anunciosSave });
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /api/anuncios/{id}:
 *  put:
 *      summary: Update and edit
 *      description: Anuncios update
 *      produces:
 *         - application/json
 *      parameters:
 *         - in: path
 *           name: id
 *           description: ID of advertisement
 *         - in: body
 *           description: Anuncio update
 *           schema:
 *               $ref: '#/definitions/Anuncios'
 *      responses:
 *       200:
 *         description: Updated
 */

//PUT
router.put('/:id', async (req, res, next) => {
  try {
    const _id = req.params.id;
    const anunciosData = req.body;
    const anunciosSave = await Anuncios.findOneAndUpdate({ _id: _id }, anunciosData, {
      new: true,
      useFindAndModify: false,
    });
    res.json({ resul: anunciosSave });
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /api/anuncios/{id}:
 *  delete:
 *      summary: Delete anuncio
 *      description: delete anuncio ID
 *      produces:
 *         - application/json
 *      parameters:
 *         - in: path
 *           name: id
 *           description: Delete Id Anuncio
 *      responses:
 *       200:
 *         description: Delete
 *         schema:
 *         type: json
 */

//Delete
router.delete('/:id', async (req, res, next) => {
  try {
    const _id = req.params.id;
    await Anuncios.deleteOne({ _id });
    res.json();
  } catch (err) {
    next(err)
  }
});


/**
 * @swagger
 * definitions:
 *  Anuncios:
 *      type: object
 *      properties:
 *          name:
 *              type: string
 *          type:
 *              type: string
 *          price:
 *              type: number
 *          sale: 
 *               type: boolean
 *          tags:
 *              type: array
 *              items:
 *                  type: string
 *            
 *              enum:
 *                  - work
 *                  - lifestyle
 *                  - motor
 *                  - mobile
 *                  - electronic
 */

  module.exports = router;

