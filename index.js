   var eejs = require('ep_etherpad-lite/node/eejs/'),
 padManager = require('ep_etherpad-lite/node/db/PadManager'),
        ERR = require("ep_etherpad-lite/node_modules/async-stacktrace"),
      async = require('ep_etherpad-lite/node_modules/async'),
    express = require('ep_etherpad-lite/node_modules/express');

exports.eejsBlock_indexWrapper = function (hook_name, args, cb) {
  args.content = args.content + eejs.require("ep_list_pads/templates/letters.ejs");
  return cb();
}

exports.registerRoute = function (hook_name, args, cb) {
  args.app.get('/list/:letter(*)', function(req, res) {

    var letter = req.params.letter;
    var pads = [];
    var data = [];

    async.series([
      function(callback){
        pads=padManager.listAllPads().padIDs;
        callback();
      },

      function(callback){
        async.forEach(pads, function(padID, callback){
          if(padID[0] == letter || padID[0] == letter.toUpperCase()){
            data.push(padID);
          }
          callback();
        },
        function(err){
          callback();
        });
      },

      function(callback){
        var render_args = {
          errors: [],
          pads: data,
          letter: letter
        };
        res.send( eejs.require("ep_list_pads/templates/pads.html", render_args) );
        callback();
      }
    ]);

  });
};

