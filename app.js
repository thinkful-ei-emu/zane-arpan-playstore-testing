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
  console.log(sort);
  console.log(genres);

  if (!(req.query.genres) && !(sort)) {
    console.log('no queries provided');
    res.status(200).json(filteredApps);
    return;
  }
  
  const validGenres = ['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'];

  const validSorts = ['Rating', 'App'];
  console.log(validGenres.includes(genres));
  console.log(validSorts.includes(sort));

  if((genres && !(validGenres.includes(genres))) || (sort && !(validSorts.includes(sort)))) {
    res.status(404).json('Please enter a valid genre.');
    return;
  }
  else {

    if (validGenres.includes(genres)) {
      console.log('filtering by genre');
      console.log()
      filteredApps = filteredApps.filter((app) => {
        console.log(app['Genres']);
        return app['Genres'].includes(genres);
      });
    }
  
    if (validSorts.includes(sort)) {
      console.log('sorting apps');
      filteredApps.sort((a, b) => a[sort] < b[sort] ? 1 : -1);
    }
  }

  res.status(200).json(filteredApps);
});

app.listen(8000, () => {
  console.log('Server started on PORT 8000');
});