var Beer = require("../models/beer.js").model;

var _model = {};
_model.find = function(req, res){

  var query = {};

  Beer.find(query, function (err, beers) {
    if(err) {
      console.log('Houve algum erro, tente novamente', err);
    } else {
      res.json(beers);
    }
  });
}; 

_model.retrieve = function(req, res){

  var id = req.params.id;
  var query = { "_id": id};

  Beer.findOne(query, function (err, beer) {
    console.log('achou algo?');
    if(err) {
      console.log('Houve algum erro, tente novamente', err);
    } else {
      res.json(beer);
    }
  });
  
}

_model.create = function(req, res){
  var dados = req.body;
  var beer = new Beer(dados);

  beer.save(function(err, data) {
    if(err){
      console.log(err);
      res.render("beer_list", {msg: err})
    } else {
      res.json(data);
    }
  });
};

_model.delete = function(req, res, id){
  Beer.remove({_id: id}, function(err) {
    if(err) {
      console.log(err);
    } else {
      var mensagem = 'Cerveja deletada com sucesso';
      _model.find(req, res, mensagem);
    }
  });
}

exports.create = function(req, res){
  _model.create(req, res);
} 

exports.retrieve = function(req, res){  
  _model.retrieve(req, res);
}

exports.list = function(req, res){  
  _model.find(req, res);
}

exports.update = function(req, res){
// UPDATE
  // ObjectId("522fc571ffd8647932000001")
  // var beer_id = "522fc5f0542a6bf832000001";
  var beer_id = req.params.id;
  var dados = req.body;

  console.log("dados", dados);
  Beer.update({_id: beer_id}, dados, function(err, beer) {
    if(err) {
      console.log(err);
    } else {
      // res.render('beer_update', {cerveja: beer});
      _model.find(req, res); // refatorado

    }
  });
}

exports.delete = function(req, res, id){
  // DELETE
  var beer_id = req.params.id;
  _model.delete(req, res, beer_id);
}










