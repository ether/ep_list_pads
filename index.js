var eejs = require('ep_etherpad-lite/node/eejs')
  , padManager = require('ep_etherpad-lite/node/db/PadManager');

exports.eejsBlock_indexWrapper = function (hook_name, args, cb) {
  args.content = args.content + eejs.require("ep_list_pads/templates/letters.ejs");
  return cb();
}

exports.registerRoute = function (hook_name, args, cb) {
  args.app.get('/list/:letter(*)', function(req, res) {

    var letter = req.params.letter;

    search(letter, function(pads){
      var render_args = {
        errors: [],
        pads: pads,
        letter: letter
      };
      res.send( eejs.require("ep_list_pads/templates/pads.html", render_args) );
    });

  });
};

var search = function(letter, callback){
  var pads=padManager.listAllPads().padIDs
    , data={
      progress : 1
      , message: "Search done."
      , letter: letter
      , total: pads.length
    }
    , maxResult=0
    , result=[]
  ;
  var data = [];

  pads.forEach(function(padID){
    if(padID[0] == letter || padID[0] == letter.toUpperCase()){
      data.push(padID);
    }
  });

  callback(data);
}


