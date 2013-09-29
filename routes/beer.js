var Beer = require("../models/beer.js").model;

var _model = {};
_model.find = function(req, res, mensagem){
  Beer.find(function (err, beers) {
    if(err) {
      console.log('Houve algum erro, tente novamente', err);
    } else {
      res.render('beer_list', {cervejas: beers, msg: mensagem});
    }
  });
}; 
_model.create = function(req, res){
  var dados = req.body;
  var beer = new Beer(dados);

  beer.save(function(err) {
    if(err){
      console.log(err);
      res.render("beer_list", {msg: err})
    } else {
      var mensagem = 'Cerveja cadastrada com sucesso';
      _model.find(req, res, mensagem);
      // res.render("beer_list", {msg: mensagem})
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
} //fim create

exports.get_create = function(req, res){
  res.render('beer_create', {msg: "Vamos cadastrar"});
}

exports.retrieve = function(req, res){  
  // RETRIEVE 
  var id = req.params.id;

  Beer.find({ "_id": id}, function (err, beer) {
    console.log('achou algo?');
    if(err) {
      console.log('Houve algum erro, tente novamente', err);
    } else {
      res.render('beer_update', {cerveja: beer});
    }
  })
}

exports.list = function(req, res){  
  // RETRIEVE

  _model.find(req, res, "Listando as brejas");
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










