'use strict'

var express = require('express');
var router = express.Router();

const Anuncio = require('../models/Anuncios');

router.get('/', async (req, res, next) => {
  try {
    const name = req.query.name;
    const tags = req.query.tag;
    const price = req.query.price;
    const limit = parseInt(req.query.limit || 10);
    const skip = parseInt(req.query.skip);
    const includeTotal = true

    

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
    
      const anuncio = await Anuncio.list(filter, limit, skip, includeTotal);
      
   
      res.render('anuncios', {anuncio});
  } catch (error) {
    next(error);
  }
});

module.exports = router;


