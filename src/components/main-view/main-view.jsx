import React from 'react';
import axios from 'axios';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';

export class MainView extends React.Component {
  constructor(){
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null
    }
  }

  componentDidMount() {
    let token =  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmNkNGI4YjM3N2NmZTcwODk5YmNmNDQiLCJVc2VybmFtZSI6InNvbmlhd29sZiIsIlBhc3N3b3JkIjoiJDJiJDEwJDQ4dEhEWC9mSDlZUng1SlFtWWFVU2VoTk1GeUJhWU9mNlhFbG9ZcUk1bmVpWkk4ZWVjZjFpIiwiRW1haWwiOiJob2xsYUBtZS5jb20iLCJGYXZfTW92aWUiOltdLCJfX3YiOjAsImlhdCI6MTY1NzYyMTQwMiwiZXhwIjoxNjU4MjI2MjAyLCJzdWIiOiJzb25pYXdvbGYifQ.3OfGR3U8VpSLUEjcF0v3ouE-90RAeKO40iBxWKPNVa0"
    axios.get("https://fabiflix.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  render() {
    const { movies, selectedMovie, user } = this.state;

    // If there is no user, the LoginView is rendered. If there is a user logged in, the user details are passed as a prop to the LoginView*/
    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    if (movies.length === 0) return <div className="main-view" />;

    return (
      <div className="main-view">
        {/*If the state of `selectedMovie` is not null, that selected movie will be returned otherwise, all *movies will be returned*/}
        {selectedMovie
          ? <MovieView
              movie={selectedMovie}
              onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}
            />
          : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }}/>
          ))
        }
      </div>
    );
  }

}

