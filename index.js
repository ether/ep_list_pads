'use strict';

const {template} = require('ep_plugin_helpers');

const eejs = require('ep_etherpad-lite/node/eejs');
const padManager = require('ep_etherpad-lite/node/db/PadManager');

exports.eejsBlock_indexWrapper =
    template('ep_list_pads/templates/letters.ejs');

exports.registerRoute = (hookName, args, cb) => {
  // Express 5 / path-to-regexp v6 doesn't accept the legacy `:letter(*)`
  // capture syntax. Use a regex route and copy the unnamed group into
  // req.params.letter so the rest of the handler is unchanged.
  args.app.get(/^\/list\/(.+)$/, async (req, res) => {
    req.params.letter = req.params[0];
    const letter = req.params.letter.toLowerCase();
    let pads = await padManager.listAllPads();
    pads = pads.padIDs;

    const renderArgs = {};

    if (letter === 'hash') {
      // all others.
      renderArgs.pads = pads.filter((pad) => pad.toLowerCase().match(/^[0-9]/i));
      renderArgs.description = 'a number';
    } else {
      renderArgs.pads = pads.filter((pad) => pad.toLowerCase().startsWith(letter.toLowerCase()));
      renderArgs.description = `the letter ${letter}`;
    }

    res.send(eejs.require('ep_list_pads/templates/pads.html', renderArgs));
  });
  cb();
};
