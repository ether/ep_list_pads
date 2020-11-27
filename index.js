const eejs = require('ep_etherpad-lite/node/eejs/');
const padManager = require('ep_etherpad-lite/node/db/PadManager');
const ERR = require('ep_etherpad-lite/node_modules/async-stacktrace');
const async = require('ep_etherpad-lite/node_modules/async');
const express = require('ep_etherpad-lite/node_modules/express');

exports.eejsBlock_indexWrapper = function (hook_name, args, cb) {
  args.content += eejs.require('ep_list_pads/templates/letters.ejs');
  return cb();
};

exports.registerRoute = function (hook_name, args, cb) {
  args.app.get('/list/:letter(*)', async (req, res) => {
    const data = [];
    const letter = req.params.letter.toLowerCase();
    let pads = await padManager.listAllPads();
    pads = pads.padIDs;

    const render_args = {};

    if (letter === 'hash') {
      // all others.
      render_args.pads = pads.filter((pad) => pad.toLowerCase().match(/^[0-9]/i));
      render_args.description = 'a number';
    } else {
      render_args.pads = pads.filter((pad) => pad.toLowerCase().startsWith(letter.toLowerCase()));
      render_args.description = `the letter ${letter}`;
    }

    res.send(eejs.require('ep_list_pads/templates/pads.html', render_args));
  });
};
