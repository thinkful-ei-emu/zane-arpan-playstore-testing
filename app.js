const express = require('express');
const morgan = require('morgan');
const playData = require('./play-data')

const app = express();

app.use(morgan('common'));

app.get('/apps', (req, res) => {
  let filteredApps = [ ...playData ];
  let sort;
  let genres;

  if (req.query.sort) {
    sort = req.query.sort.charAt(0).toUpperCase() + req.query.sort.slice(1);
  }

  if (req.query.genres) {
    genres = req.query.genres.charAt(0).toUpperCase()+req.query.genres.slice(1);
  }

  if (!(req.query.genres) && !(sort)) {
    res.status(200).json(filteredApps);
    return;
  }
  
  const validGenres = ['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'];

  const validSorts = ['Rating', 'App'];

  if((genres && !(validGenres.includes(genres))) || (sort && !(validSorts.includes(sort)))) {
    res.status(404).json('Please enter a valid genre or sort method.');
    return;
  }
  else {

    if (validGenres.includes(genres)) {
    
      filteredApps = filteredApps.filter((app) => {
        
        return app['Genres'].includes(genres);
      });
    }
  
    if (validSorts.includes(sort)) {
     
      filteredApps.sort((a, b) => a[sort] > b[sort] ? 1 : -1);
    }
  }

  res.status(200).json(filteredApps);
});

module.exports=app;