
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Workshop Sampa' });
};

exports.expose = function(req, res){
  var dir = req.params.dir;
  var name = req.params.name;
  var view = dir+ "/" +name;
  res.render(view);
};