const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('common')); // let's see what 'common' format looks like

const apps = require('./playstore');

app.get('/apps', (req, res) => {
  // ALL OUR CODE HERE
    const { genres = '', sort } = req.query;
    if (sort) {
        if (!['rating', 'app'].includes(sort)) {
            return res
            .status(400)
            .send('Sort must be one of rating or app');
        }
    }

    if(genres) {
        if(!['action', 'puzzle', 'strategy', 'casual', 'arcade', 'card'].includes(genres)) {
            return res
            .status(400)
            .send('Genre must be Action, Puzzle, Strategy, Casual, Arcade, or Card')
        }
    }

    let results = apps
        .filter(app =>
          app
             .Genres
             .toLowerCase()
             .includes(genres.toLowerCase()));

    if (sort) {
        apps
        .sort((a, b) => {   
            return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
        });
    }
  res
  .json(results);

});

app.listen(8000, () => {
  console.log('Server started on PORT 8000');
});