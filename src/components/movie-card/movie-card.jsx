import React from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export class MovieCard extends React.Component {
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
          <Button value={movie._id} onClick={(e) => this.addFavorite(e, movie)}>Add to Favourites</Button>
          <Button value={movie._id} onClick={(e) => this.removeFavorite(e, movie)}>Delete</Button>
          </Card.Body>
        </Card>
      );
  }
}

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
