'use strict'

const mongoose = require('mongoose');

//schematic creation
//https://mongoosejs.com/docs/schematypes.html
const anuncioSchema = mongoose.Schema({
    name: { type: String },
    price: { type: Number },
    sale: { type: Boolean },
    tags: {type: [String]},
    imagen:  String,
});

//schema  method static
anuncioSchema.statics.list = function(filter, limit, skip) {
const query = Anuncios.find(filter);
query.limit(limit);
query.skip(skip);
return query.exec();
};

//static list tags
anuncioSchema.statics.Tags = function () {
    return [ 'motor', 'mobile', 'lifestyle', 'work',];
};



//Models creation
const Anuncios = mongoose.model('Anuncio', anuncioSchema);



//Export
module.exports = Anuncios;
