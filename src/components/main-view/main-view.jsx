/**
 * @fileoverview the main-view component is the first one that gets mounted onto the DOM. It is the 'entry point' into the application. It Renders all the other components. If the user is not logged in, it renders the LoginView component. If the user is logged in, it renders the movies list view, which is the default view.
 * @class MainView
 * @requires react
 */


import React from "react";
import axios from "axios";
import { connect } from 'react-redux';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import {BrowserRouter as Router ,Route, Redirect, Link,
} from "react-router-dom";
import { setMovies } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view";
import { NavbarView } from "../navbar-view/navbar-view";
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";
import { ProfileView } from "../profile-view/profile-view";

/**
 * @description renders the main-view component
 * @function MainView
 */
class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null,
    };
  }


  /**
   * @description when a user successfully logs in, this function updates the `user` property in state to that particular user
   * @function componentDidMount
   * @param {string} token
   * @param {string} user
   * @returns {object} user
   */
  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user"),
      });
      this.getMovies(accessToken);
    }
  }



  /**
   * @description updates the `selectedMovie` property in state using the movie object passed as an argument
   * @function setSelectedMovie
   * @param {*} newSelectedMovie 
   * @returns {object} selectedMovie
   */
  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie,
    });
  }


/**
 * @description updates the `user` property in state meaning the user is logged in
 * @function onLoggedIn
 * @param {*} authData 
 * @param {string} token
 * @param {string} user 
 * @returns {object} user
 */
  onLoggedIn(authData) {
    this.setState({
      user: authData.user.Username,
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }


/**
 * @description updates the `registered` property in state meaning the user is registered
 * @function onRegistered
 * @param {*} registered 
 * @returns {object} registered
 */
  onRegistered(registered) {
    this.setState({
      registered,
    });
  }

  /**
   * @description gets the list of movies from the database (via the API)
   * @function getMovies
   * @param {*} token 
   * @returns {array} movies
   */
  getMovies(token) {
    axios
      .get("https://movie-api-evho.onrender.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Assign the result to the state
        this.props.setMovies(response.data);

      })
      .catch(function (error) {
        console.log(error);
      });
  }

  /**
   * @description logs the user out
   * @function onLoggedOut
   * @returns {null} null
  */
  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null,
    });
  }

  /**
   * @description renders the main-view component 
   * @function render
   * @returns {MainView}
   * @returns {LoginView}
   * @returns {MoviesList}
   * @returns {MovieView}
   * @returns {DirectorView}
   * @returns {GenreView}
   * @returns {ProfileView}
   * @returns {RegistrationView}
   * @returns {NavbarView}
   */
  render() {
    let { movies } = this.props; // movies is imported from the api
    let { user } = this.state; // user is imported from state (meaning the user is logged in)

    return (
      <Router>
        <NavbarView user={user} />
        <Row className="main-view justify-content-md-center">
          <Route
            exact
            path="/"  // the default view is the movies list view (if the user is logged in) if not, the login view is rendered
            render={() => {
              if (!user)
                return (
                  <Col>
                    <LoginView
                      onLoggedIn={(user) => this.onLoggedIn(user)}
                      onRegistered={(register) => this.onRegistered(register)}
                    />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;  // if there are no movies, the main-view will return the login view
              return <MoviesList movies={movies} />;
            }} />

          <Route
            path="/register"
            render={() => {
              if (user) return <Redirect to="/" />;
              return (
                <Col lg={8} md={8}>
                  <RegistrationView onRegistered={(register) => this.onRegistered(register)} /> {/* if the user is not registered, the registration view is rendered*/}
                </Col>
              );
            }}
          />



 {/**
  * @description renders the movie view (single movie view) when the user clicks on a movie
  * @function render
  * @returns {MovieView}
  * @param {string} movieId
  * @param {string} history
  */}
          <Route
            path="/movies/:movieId"
            render={({ match, history }) => {
              if (!user)
                return (
                  <Col>
                    <LoginView
                      onLoggedIn={(user) => this.onLoggedIn(user)}
                      onRegistered={(register) => this.onRegistered(register)}
                    />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8}>
                  <MovieView
                    movie={movies.find((m) => m._id === match.params.movieId)}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />

          {/**
           * @description renders the director view when the user clicks on a director
           * @function render
           * @returns {DirectorView}  
           * @param {string} name
           * @param {string} history
           * @param {string} director
          */}
          <Route
            path="/directors/:name"
            render={({ match, history }) => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8}>
                  <DirectorView
                    director={
                      movies.find((m) => m.Director.Name === match.params.name)
                        .Director
                    }
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />
          {/**
           * @description renders the genre view when the user clicks on a genre
           * @function render
           * @returns {GenreView}
           * @param {string} name
           * @param {string} history
           * @param {string} genre
          */}
          <Route
            path="/genres/:name"
            render={({ match, history }) => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8}>
                  <GenreView
                    genre={
                      movies.find((m) => m.Genre.Name === match.params.name)
                        .Genre
                    }
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />

          {/**
           * @description renders the profile view when the user clicks on the profile button
           * @function render 
           * @returns {ProfileView}
           * @param {string} user
           * @param {string} history
           * @param {string} movies
           /*}
          */}
          <Route
            path={`/users/${user}`}
            render={({ history }) => {
              if (!user) return <Redirect to="/" />; // if the user is not logged in, the login view is rendered
              return (
                <Col>
                  <ProfileView
                    user={user}
                    onBackClick={() => history.goBack()}
                    movies={movies}
                  />
                </Col>
              );
            }}
          />
        </Row>
      </Router>
    );
  }
}
// this function connects the MainView component to the store using the connect function from react-redux
let mapStateToProps = state => { 
  return { movies: state.movies }

}
export default connect(mapStateToProps, { setMovies })(MainView);



