var mongoose = require("mongoose")
  , Schema = mongoose.Schema;

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

exports.model = mongoose.model('Beer', BeerSchema);