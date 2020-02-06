# VideoGameCharacterIndex
An index of various video game characters across the gaming universe.

## User Stories
- [x] User should be able to select a character.
- [x] User should be able to select view all sorts of information about the selected character.
- [x] User should be able to hover over certain items and see "tooltips" CSS

## The Website
https://jbrenneman444.github.io/VideoGameCharacterIndex/

## The API
My API key: 8f5e4fe50eb930447615648aa359bbc0ab041539  
https://www.giantbomb.com/api/game/3030-4725/?api_key=  
https://www.giantbomb.com/api/game/3030-4725/?api_key=8f5e4fe50eb930447615648aa359bbc0ab041539

## Struggles
* First, did not realize it was an XML file, rather than a JSON.
* Jay Glickman helped identiy a solution for getting around CORS error.
* Could not get even a simple console log to come back.
* Then, did not realize I could command it to come back in JSON form, if I wished.

## Technologies Used
* HTML
* CSS
* JS / jQuery

## Approach Taken
* First, did a rough wireframe of the VISUAL side of my app.
* Then, tried to test out initial connection of AJAX data and HTML.

## TODO / Unresolved Items
* jQuery should append new images for carousel, rather than hard-coding number
* add "Load more" functionality for games, maybe other fields
* Set up so user can choose Official Art, Fan Art, etc.
* if CHARACTER NOT FOUND, add functionality for "no seach found", make sure doesnt mess up the rest of the page
* figure out how to make name animations smoother, despite AJAX requests
