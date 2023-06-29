/** 
* @fileoverview This component renders the movie data as a card with a link to the movie view. It also has a button that allows the user to add the movie to their list of favorites.
*/

import React from 'react';
import { Card, Col, Container, Row, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import axios from 'axios'
import { Link } from "react-router-dom";



export class MovieView extends React.Component {

  render() {
    const { movie, onBackClick, director, genre } = this.props;
    console.log('....', movie.Genre.Name)
    return (
      <Container>
        <Row>
          <Col>
          <Card className="movie-view" style={{ width: '40rem' }}>
        <Card.Body>
          <Card.Img className="movie-view__image" crossOrigin="anonymous" variant="top" src={movie.ImagePath} /> 
          <Card.Title className="title-style">{movie.Title}</Card.Title>

          <Card.Text className="text-style">Director: 
            <Link to={`/directors/${movie.Director.Name}`}>
              <Button variant="link">{movie.Director.Name}</Button>
            </Link>
          </Card.Text>

          <Card.Text className="text-style">Genre: 
            <Link to={`/genres/${movie.Genre.Name}`}>
              <Button variant="link">{movie.Genre.Name}</Button>
            </Link>
                </Card.Text>
          <Card.Text className="text-style">{movie.Description}</Card.Text>
          <Button variant="outline-warning" onClick={() => { onBackClick() }}>Back</Button>
        </Card.Body>
       </Card>
       </Col>
       </Row>
       </Container>
    );
  }
}
/**
 * @description defines the props the component expects to receive from the parent component(main-view)
 * @function propTypes
 * @param {object} movie
 * @returns {propTypes}
 * */
MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      }),
    genre: PropTypes.shape({
      Name: PropTypes.string.isRequired
    })
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};