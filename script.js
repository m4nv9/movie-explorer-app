//drop down
const movieNumbers = [3, 5, 10];
for (let i = 0; i < movieNumbers.length; i++) {
  const option = document.createElement("option");
  option.value = movieNumbers[i];
  option.textContent = movieNumbers[i];
  document.getElementById("numberOfMovies").appendChild(option);
}

//movie cards
const movieCardContainer = document.querySelector('#movieCardContainer');
//detail card
const movieDetails = document.querySelector('#movieDetails');

function fetchData() {
  //clearing previous movie cards
  movieCardContainer.innerHTML = "";
  movieDetails.innerHTML = "";
  //fetching number of movies
  const numberOfMovies = document.querySelector('#numberOfMovies').value;
  //fetching user input
  const searchMovie = document.querySelector('#searchMovie').value;
  document.querySelector('#searchMovie').value = "";    //api key
  const requestURL = `https://www.omdbapi.com/?s=${searchMovie}&apikey=e60193cc`;
  //fetching response 
  fetch(requestURL).then(function (response) {
    //check if data is okay
    if (!response.ok) {
      throw new Error("not found");
    }
    return response.json();
    //data
  }).then(function (data) {
    const movies = data.Search.slice(0, numberOfMovies);
    movies.forEach(function (movie) {
      //movie card
      const movieCard = document.createElement("div");
      //dynamic movie card
      movieCard.addEventListener('click', function () {
        movieDetails.innerHTML = "";
        //fetching imdbID
        const detailsURL = `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=e60193cc`;
        fetch(detailsURL)
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            const detailCard = document.createElement("div");
            movieDetails.appendChild(detailCard);

            //movie poster
            const poster = document.createElement("img");
            poster.src = movie.Poster;
            detailCard.appendChild(poster);
            //movie title
            const title = document.createElement("p");
            title.textContent = movie.Title;
            detailCard.appendChild(title);
            //movie year
            const year = document.createElement("p");
            year.textContent = movie.Year;
            detailCard.appendChild(year);

            //plot
            const plot = document.createElement("p");
            plot.textContent = `Plot: ${data.Plot}`;
            detailCard.appendChild(plot);

            //rating
            const rating = document.createElement("p");
            rating.textContent = `IMDB Rating: ${data.Ratings[0].Value}`;
            detailCard.appendChild(rating);
          })
      });
      movieCardContainer.appendChild(movieCard);
      //movie poster
      const poster = document.createElement("img");
      poster.src = movie.Poster;
      movieCard.appendChild(poster);
      //movie title
      const title = document.createElement("p");
      title.textContent = movie.Title;
      movieCard.appendChild(title);
      //movie year
      const year = document.createElement("p");
      year.textContent = movie.Year;
      movieCard.appendChild(year);
    });
  }).catch(function (error) {
    console.log(error);
  });
}
const explore = document.querySelector('#explore');
explore.addEventListener('click', fetchData);

