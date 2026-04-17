![Publish Status](https://github.com/ether/ep_list_pads/workflows/Node.js%20Package/badge.svg) [![Backend Tests Status](https://github.com/ether/ep_list_pads/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/ether/ep_list_pads/actions/workflows/test-and-release.yml)

# List an index of pads on the index page

1. Usage 101, visit your Etherpad instance IE http://beta.etherpad.org
1. Click the letter your pad is under..
1. Open pad..

# License
Apache 2

## Installation

Install from the Etherpad admin UI (**Admin → Manage Plugins**,
search for `ep_list_pads` and click *Install*), or from the Etherpad
root directory:

```sh
pnpm run plugins install ep_list_pads
```

> ⚠️ Don't run `npm i` / `npm install` yourself from the Etherpad
> source tree — Etherpad tracks installed plugins through its own
> plugin-manager, and hand-editing `package.json` can leave the
> server unable to start.

After installing, restart Etherpad.
