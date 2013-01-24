var eejs = require('ep_etherpad-lite/node/eejs')
  , padManager = require('ep_etherpad-lite/node/db/PadManager')
  , log4js = require('log4js')
  , logger = log4js.getLogger("plugin:ep_list_pads");

exports.eejsBlock_indexWrapper = function (hook_name, args, cb) {
  args.content = args.content + eejs.require("ep_list_pads/templates/letters.ejs");
  return cb();
}

exports.registerRoute = function (hook_name, args, cb) {
  args.app.get('/list/:letter(*)', function(req, res) {
    var letter = req.params.letter;

    var pads=padManager.listAllPads().padIDs
      , data={
        progress : 1
        , message: "Search done."
        , query: letter
        , total: pads.length
      }
      , maxResult=0
      , result=[]
    ;

    pads.forEach(function(padID){
      if(padID[0] == letter || padID[0] == letter.toUpperCase()){
        result.push(padID);
      }
    });

    var render_args = {
      errors: [],
      pads: result,
      letter: letter
    };
    res.send( eejs.require("ep_list_pads/templates/pads.html", render_args) );
  });
};
