import React from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { Routes, Link } from 'react-router-dom';

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
    let accessToken = localStorage.getItem('token');
      if (accessToken !== null) {
        this.setState({
          user: localStorage.getItem('user')
        });
        this.getMovies(accessToken);
      }
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  onLoggedIn(authData) {
    this.setState({
      user: authData.user.Username,
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
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

    // return (
    //  user && <div className="main-view justify-content-center">
    //     <Navbar fixed="top" className="mainnav py-3 py-lg-4" bg="dark" variant="dark" expand="md">
    //       <Navbar.Brand href="/"><span className="brand-name">MyFlix App</span></Navbar.Brand>
    //       <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //       <Navbar.Collapse id="basic-navbar-nav">
    //         <Nav className="ms-auto">
    //           <Nav.Link href="/">Movies</Nav.Link>
    //           <Nav.Link href="/users/:username">Profile</Nav.Link>
    //           <Nav.Link href="/" onClick={() => { this.onLoggedOut() }} >Logout</Nav.Link>
    //         </Nav>
    //       </Navbar.Collapse>
    //     </Navbar>
    //   </div>
    // );

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
        onRegistered={(register) => this.onRegistered(register)} 

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

