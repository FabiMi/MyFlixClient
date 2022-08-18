import React from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';


export class MainView extends React.Component {
  constructor(){
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      registered: null
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
      user,
    });
  }

  

  onRegistered(registered) {
    this.setState({
      registered,
    });
  }


  getMovies(token) {
    axios.get('https://fabiflix.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      // Assign the result to the state
      this.setState({
        movies: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

  render() {
    const { movies, selectedMovie, user, registered } = this.state;
    console.log('user: ', user)
    if (registered) { return (
      <RegistrationView
        onRegistered={(register) => this.onRegistered(register)} 
      />
    );
  }

    // If there is no user, the LoginView is rendered. If there is a user logged in, the user details are passed as a prop to the LoginView*/
    if (!user){ return (
      <LoginView 
        onLoggedIn={(user) => this.onLoggedIn(user)}
      />
    );
  }

  
  if (movies.length === 0) return <div className="main-view" />;
  

    return (
      <Container className="main-view">
       <Row className="main-view-row  justify-content-md-center">
    {selectedMovie
      ? (
        <Col md={8}>
          <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
        </Col>
      )
      : movies.map(movie => (
        <Col md={3} key={movie._id}>
          <MovieCard key={movie._id} movie={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
        </Col>
      ))
    }
  </Row>
  
      </Container>
    );
  }

}

