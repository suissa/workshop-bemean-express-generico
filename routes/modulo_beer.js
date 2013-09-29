var mongoose = require("mongoose")
  , Schema = mongoose.Schema
  , url = require("url");

mongoose.connect('mongodb://localhost/workshop-sampa');

var db = mongoose.connection;
db.on('error', function(err){
    console.log('Erro de conexao.', err)
});

db.once('open', function () {
  console.log('Conexão aberta.')
});

var BeerSchema = new Schema({
  name: { type: String, default: '' },
  description: { type: String, default: '' },
  type: { type: String, default: '' }
});

var Beer = mongoose.model('Beer', BeerSchema);

exports.create = function(req, res){
  // CREATE
  var dados = {
    name: "Baden Baden - Chocolate",
    description: "Tem gosto de chocolá",
    type: "Stout"
  };

  var beer = new Beer(dados);

  beer.save(function(err) {
    if(err){
      console.log(err);
    } else {
      console.log('Cerveja cadastrada com sucesso');
    }
  });

} //fim create


exports.retrieve = function(req, res, id){  
  // RETRIEVE 
  // console.log("query", query);
  Beer.find({ "_id": id}, function (err, beers) {
    console.log('achou algo?');
    if(err) {
      console.log('Houve algum erro, tente novamente', err);
    } else {
      console.log(beers);
      res.end(beers.toString());
    }
  })
}

exports.list = function(req, res){  
  // RETRIEVE

  // var url_parts = url.parse(req.url, true)
  // , query = url_parts.query;

  Beer.find(function (err, beers) {
    if(err) {
      console.log('Houve algum erro, tente novamente', err);
    } else {
      res.end(beers.toString());
    }
  })
}

exports.update = function(req, res){
// UPDATE
  ObjectId("522fc571ffd8647932000001")
  var beer_id = "522fc5f0542a6bf832000001";
  var dados = {
    type: "Weiss"
  };
  Beer.update({_id: beer_id}, dados, function(err, beer) {
    if(err) {
      console.log(err);
    } else {
      console.log('Cerveja atualizada com sucesso');
    }
  });
}

exports.delete = function(req, res, id){
  // DELETE
  Beer.remove({_id: id}, function(err) {
    if(err) {
      console.log(err);
    } else {
      res.end('Cerveja deletada com sucesso!');
    }
  });
}










