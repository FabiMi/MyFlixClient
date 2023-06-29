/** 
 *@fileoverview This component renders the movie data as a card with a link to the movie view. It also has a button that allows the user to add the movie to their list of favorites.
 */

import React from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';



export class MovieCard extends React.Component {

  /**
   * @description adds movie to favorite list
   * @function addFavorite
   * @param {string} token
   * @param {string} user 
   * @param {string} movie
   * @method: 'POST',
   */
  addFavorite() {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    axios
      .post(`https://fabiflix.herokuapp.com/users/${user}/movies/${this.props.movie._id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
        method: 'POST',
      })
        .then(response => {
          alert(`Added to Favorite List`)
        })
        .catch(function (error) {
          console.log(error);
        });
  };


  /**
   * @description removes movie from favorite list
   * @function removeFavorite
   * @param {string} token
   * @param {string} user
   * @param {string} movie
   * @method: 'DELETE',
   */
  removeFavorite () {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    axios
      .delete(`https://fabiflix.herokuapp.com/users/${user}/movies/${this.props.movie._id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
        method: 'DELETE',
      })
        .then(response => {
          alert(`Deleted out of you Favorite List`)
        })
        .catch(function (error) {
          console.log(error);
        });
  };


  render() {
    const { movie, onMovieClick } = this.props;
    return (
        <Card>
          <Card.Img variant="top" crossOrigin="anonymous" src={movie.ImagePath} />
          <Card.Body>
            <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button>
              Open
            </Button>
          </Link>
          <Button variant="outline-warning" value={movie._id} onClick={(e) => this.addFavorite(e, movie)}>Add to Favourites</Button>
          <Button variant="outline-warning" value={movie._id} onClick={(e) => this.removeFavorite(e, movie)}>Delete</Button>
          </Card.Body>
        </Card>
      );
  }
}

/**
 * @description defines the props the component expects to receive from the parent component(main-view)
 * @function propTypes
 * @param {object} movie
 * @param {function} onMovieClick
 * @returns {propTypes}
 */
MovieCard.propTypes = {
    movie: PropTypes.shape({
      Title: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
       director: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Bio: {},
        Birth: {}
        }),
        genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired
        }),
      ImagePath: PropTypes.string.isRequired,
     
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
  };
