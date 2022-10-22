const express = require('express')
const app = express()
const cors = require('cors')
const { movies } = require("./movies");
const PORT = 8000

// const XLSX = require("xlsx")
// const movieDB = XLSX.readFile("kinderhorror.xlsx")
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(cors());


app.get('/', (request, response) => {
  if (movies) {
    response.render('index.ejs', {movies});
  } else {
    // respond with status 500 if the resources array could not be loaded from resources.js
		res.status(500).json({
			error: 'Movies were not able to be loaded from movies.js.'
		});
  }
});

app.get('/api', (request, response) => {
  response.json(movies);
})

// *** GET Routes - display pages ***
// // Root Route
app.get('/api/:name', function(req, res) {
  let movieName = req.params.name.toLowerCase()
  console.log("finding your movie: " + movieName)
  if( movies[movieName] ){
    res.json(movies[movieName])
  }
  if (movieName === "random") {
    const randomNum = Math.floor(Math.random() * Object.values(movies).length)
    movieName = (Object.keys(movies)[randomNum])
    console.log(movieName)
    res.json(movies[movieName])
  }
  else{
    res.json(movies['unknown'])
  }
  //still can't get random to work in the render template, shows only the name of the film

  //this works!
  // if (!movies[movieName]){
  //   movieName="unknown"
  // }

  
  //   res.render('index', {
  //     title: movies[movieN],
  //     review: movies[movieName]["review"],
  //     summary: movies[movieName]["summary"],
  //     kids: movies[movieName]["for kids"],
  //     rating: movies[movieName]["rating"],
  //     trigger: movies[movieName]["trigger warnings"],
  //     imdblink: movies[movieName]["imdb link"],
  //     wikilink: movies[movieName]["wiki link"]
  //     // trailer: movies[movieName]["trailer link"]


  //   })

  

});



// app.get('/api/:name', (request, response) => {
//   const movieName = request.params.name.toLowerCase()
//   console.log("finding your movie: " + movieName)

//   if (movies[movieName]) {
//     response.json(movies[movieName])
//   }
//   if (movieName === "random") {
//     const randomNum = Math.floor(Math.random() * Object.values(movies).length)
//     response.json(Object.values(movies)[randomNum])
//   }
//   else {
//     response.json(movies['unknown'])
//   }

// })

app.listen(process.env.PORT || PORT, () => {
  console.log(`The server is now running on port ${PORT}! Betta Go Catch It!`)
})